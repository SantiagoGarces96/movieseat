import { randomBytes } from "node:crypto";
import { Types } from "mongoose";
import type Stripe from "stripe";
import { releaseSeats, SEAT_HOLD_MINUTES } from "@/lib/reservations";
import { getStripe } from "@/lib/payments/stripe";
import Food from "@/models/Food";
import Movie from "@/models/Movie";
import Reservation from "@/models/Reservation";
import Room from "@/models/Room";
import Session from "@/models/Session";
import Ticket from "@/models/Ticket";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import {
  IReservation,
  IReservationFood,
  ReservationStatus,
  seatLabel,
} from "@/types/reservation";
import { TransactionStatus } from "@/types/transaction";

export const STRIPE_PAYMENT_METHOD = "stripe";

// Stripe exige que una sesión de pago dure al menos 30 minutos. La reserva dura
// un poco más, para que no venza mientras alguien termina de pagar.
const CHECKOUT_MINUTES = 31;
const HOLD_MARGIN_MINUTES = 5;
const minutesFromNow = (minutes: number) =>
  new Date(Date.now() + minutes * 60 * 1000);

export const checkoutHoldEnd = () =>
  minutesFromNow(CHECKOUT_MINUTES + HOLD_MARGIN_MINUTES);

// Stripe cuenta los pesos colombianos con dos decimales: $1.000 son 100000.
const toStripeAmount = (pesos: number) => pesos * 100;

export const returnStock = (foods: { foodId: unknown; quantity: number }[]) =>
  Promise.all(
    foods.map(({ foodId, quantity }) =>
      Food.updateOne({ _id: foodId }, { $inc: { availableAmount: quantity } }),
    ),
  );

export const createCheckoutSession = async (
  reservation: IReservation,
  foods: IReservationFood[],
  movieTitle: string,
  origin: string,
) => {
  const id = reservation._id.toString();
  return getStripe().checkout.sessions.create({
    mode: "payment",
    locale: "es-419",
    client_reference_id: id,
    metadata: { reservationId: id },
    expires_at: Math.floor(minutesFromNow(CHECKOUT_MINUTES).getTime() / 1000),
    success_url: `${origin}/api/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/api/reservations/${id}/resume`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "cop",
          unit_amount: toStripeAmount(reservation.seatsTotal),
          product_data: {
            name: `Boletas: ${movieTitle}`,
            description: `Sillas ${reservation.seats.map(seatLabel).join(", ")}`,
          },
        },
      },
      ...foods.map(({ name, quantity, unitPrice }) => ({
        quantity,
        price_data: {
          currency: "cop",
          unit_amount: toStripeAmount(unitPrice),
          product_data: { name },
        },
      })),
    ],
  });
};

const isDuplicate = (error: any) => error?.code === 11000;

// Stripe puede avisar varias veces, y además la persona vuelve del pago. Cada
// paso revisa si ya se hizo, así un pago nunca genera dos boletas.
export const completeCheckout = async (
  checkout: Stripe.Checkout.Session,
): Promise<string | null> => {
  if (checkout.payment_status !== "paid") return null;

  const reservation = await Reservation.findOne({
    stripeSessionId: checkout.id,
  });
  if (!reservation) return null;

  const existing = await Ticket.findOne(
    { reservationId: reservation._id },
    { _id: 1 },
  );
  if (reservation.status === ReservationStatus.PAID && existing) {
    return existing._id.toString();
  }
  if (
    reservation.status !== ReservationStatus.PROCESSING &&
    reservation.status !== ReservationStatus.PAID
  ) {
    console.error(`Pago ${checkout.id} de una reserva ya cerrada`);
    return null;
  }

  const foods = reservation.foods ?? [];
  const totalPrice =
    reservation.seatsTotal +
    foods.reduce(
      (total, { quantity, unitPrice }) => total + quantity * unitPrice,
      0,
    );

  let ticket = existing;
  if (!ticket) {
    const session = await Session.findById(reservation.sessionId, {
      movieId: 1,
      roomId: 1,
      dateTime: 1,
    });
    const [movie, room] = await Promise.all([
      Movie.findById(session?.movieId, { title: 1, poster: 1 }),
      Room.findById(session?.roomId, { name: 1, room: 1 }),
    ]);
    try {
      ticket = await Ticket.create({
        sessionId: reservation.sessionId,
        userId: reservation.userId,
        reservationId: reservation._id,
        code: `MS-${randomBytes(5).toString("hex").toUpperCase()}`,
        movieTitle: movie?.title,
        moviePoster: movie?.poster,
        roomName: room?.name,
        roomFormat: room?.room,
        dateTime: session?.dateTime,
        seats: reservation.seats,
        foods,
        quantity: reservation.seats.length,
        totalPrice,
      });
    } catch (error) {
      if (!isDuplicate(error)) throw error;
      ticket = await Ticket.findOne(
        { reservationId: reservation._id },
        { _id: 1 },
      );
    }
  }
  if (!ticket) return null;

  // Una entrada por unidad: las gráficas del panel cuentan estos elementos.
  const foodItems = foods.flatMap(({ foodId, quantity }) =>
    Array.from({ length: quantity }, () => new Types.ObjectId(String(foodId))),
  );
  let transaction;
  try {
    transaction = await Transaction.findOneAndUpdate(
      { paymentReference: checkout.id },
      {
        $setOnInsert: {
          userId: reservation.userId,
          ticketId: ticket._id,
          foodItems,
          totalAmount: totalPrice,
          paymentMethod: STRIPE_PAYMENT_METHOD,
          status: TransactionStatus.COMPLETED,
        },
      },
      { upsert: true, new: true },
    );
  } catch (error) {
    if (!isDuplicate(error)) throw error;
    transaction = await Transaction.findOne({ paymentReference: checkout.id });
  }

  await Promise.all([
    User.updateOne(
      { _id: reservation.userId },
      { $addToSet: { tickets: ticket._id, transactions: transaction?._id } },
    ),
    Reservation.updateOne(
      { _id: reservation._id },
      { status: ReservationStatus.PAID, updatedAt: new Date() },
    ),
  ]);
  return ticket._id.toString();
};

// Primero se cierra el pago en Stripe, para que nadie pueda pagar unas sillas ya
// liberadas. Si el pago alcanzó a completarse, devuelve la boleta.
const stopCheckout = async (stripeSessionId?: string | null) => {
  if (!stripeSessionId) return null;
  const stripe = getStripe();
  await stripe.checkout.sessions.expire(stripeSessionId).catch(() => null);
  const checkout = await stripe.checkout.sessions.retrieve(stripeSessionId);
  if (checkout.status === "open") {
    throw new Error(`No se pudo cerrar el pago ${stripeSessionId}`);
  }
  return completeCheckout(checkout);
};

// Vuelve a dejar la reserva lista para pagar, y devuelve la comida al inventario.
export const reopenCheckout = async (
  reservation: IReservation,
): Promise<string | null> => {
  const ticketId = await stopCheckout(reservation.stripeSessionId);
  if (ticketId) return ticketId;

  const previous = await Reservation.findOneAndUpdate(
    { _id: reservation._id, status: ReservationStatus.PROCESSING },
    {
      status: ReservationStatus.PENDING,
      expiresAt: minutesFromNow(SEAT_HOLD_MINUTES),
      updatedAt: new Date(),
      $unset: { foods: 1, stripeSessionId: 1 },
    },
  );
  if (previous) await returnStock(previous.foods ?? []);
  return null;
};

const closeCheckout = async (
  reservation: IReservation,
  status: ReservationStatus,
) => {
  const ticketId = await stopCheckout(reservation.stripeSessionId);
  if (ticketId) return;

  const previous = await Reservation.findOneAndUpdate(
    { _id: reservation._id, status: ReservationStatus.PROCESSING },
    { status, updatedAt: new Date() },
  );
  if (previous) {
    await Promise.all([
      releaseSeats(previous.sessionId, previous.seats),
      returnStock(previous.foods ?? []),
    ]);
  }
};

export const expireCheckoutBySession = async (stripeSessionId: string) => {
  const reservation = await Reservation.findOne({ stripeSessionId });
  if (reservation?.status === ReservationStatus.PROCESSING) {
    await closeCheckout(reservation, ReservationStatus.EXPIRED);
  }
};

// Vercel no mantiene procesos corriendo: los pagos abandonados se cierran cuando
// alguien consulta las sillas, igual que las reservas vencidas.
export const releaseExpiredCheckouts = async (
  sessionId?: Types.ObjectId | string,
) => {
  const expired = await Reservation.find({
    status: ReservationStatus.PROCESSING,
    expiresAt: { $lte: new Date() },
    ...(sessionId ? { sessionId } : {}),
  }).limit(20);
  await Promise.all(
    expired.map((reservation) =>
      closeCheckout(reservation, ReservationStatus.EXPIRED).catch((error) =>
        console.error(`Error closing checkout: ${error.message}`),
      ),
    ),
  );
};

// Quien elige otras sillas abandona el pago anterior.
export const cancelUserCheckouts = async (userId: string) => {
  const open = await Reservation.find({
    userId,
    status: ReservationStatus.PROCESSING,
  });
  await Promise.all(
    open.map((reservation) =>
      closeCheckout(reservation, ReservationStatus.CANCELLED),
    ),
  );
};
