import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import {
  checkoutHoldEnd,
  createCheckoutSession,
  reopenCheckout,
  returnStock,
} from "@/lib/payments/checkout";
import { isStripeConfigured } from "@/lib/payments/stripe";
import { SEAT_HOLD_MINUTES } from "@/lib/reservations";
import Food from "@/models/Food";
import Movie from "@/models/Movie";
import Reservation from "@/models/Reservation";
import Session from "@/models/Session";
import { CheckoutSchema } from "@/schema/checkout";
import { IReservationFood, ReservationStatus } from "@/types/reservation";
import { isShowtimeOver } from "@/utils/showtime";

const message = (text: string, status: number) =>
  NextResponse.json({ message: text }, { status });

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getSession();
  if (!user) {
    return message("Inicia sesión para continuar.", 401);
  }

  const { id } = await params;
  const parsed = CheckoutSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!/^[a-f0-9]{24}$/.test(id) || !parsed.success) {
    return message("La compra no es válida.", 400);
  }
  if (!isStripeConfigured()) {
    return message("Los pagos aún no están disponibles.", 503);
  }

  await dbConnect();

  // Si volvió atrás desde Stripe e intenta de nuevo, se cierra el pago anterior.
  const open = await Reservation.findOne({
    _id: id,
    userId: user.userId,
    status: ReservationStatus.PROCESSING,
  });
  if (open) {
    const ticketId = await reopenCheckout(open).catch(() => null);
    if (ticketId) return NextResponse.json({ ticketId }, { status: 200 });
  }

  // Este cambio de estado es atómico: dos clics en "Pagar" no abren dos pagos, y
  // la reserva no puede vencer mientras la persona está en Stripe.
  const reservation = await Reservation.findOneAndUpdate(
    {
      _id: id,
      userId: user.userId,
      status: ReservationStatus.PENDING,
      expiresAt: { $gt: new Date() },
    },
    {
      status: ReservationStatus.PROCESSING,
      expiresAt: checkoutHoldEnd(),
      updatedAt: new Date(),
    },
    { new: true },
  );
  if (!reservation) {
    return message("Esta reserva ya no está activa.", 410);
  }

  const reopenReservation = () =>
    Reservation.updateOne(
      { _id: id, status: ReservationStatus.PROCESSING },
      {
        status: ReservationStatus.PENDING,
        expiresAt: new Date(Date.now() + SEAT_HOLD_MINUTES * 60 * 1000),
        updatedAt: new Date(),
      },
    );
  const reserved: IReservationFood[] = [];

  try {
    const session = await Session.findById(reservation.sessionId, {
      movieId: 1,
      dateTime: 1,
    });
    const movie = await Movie.findById(session?.movieId, { title: 1 });
    if (!session || !movie || isShowtimeOver(session.dateTime)) {
      await reopenReservation();
      return message("Esta función ya no está disponible.", 410);
    }

    const requested = parsed.data.foods;
    const foodDocs = await Food.find(
      { _id: { $in: requested.map((food) => food.id) } },
      { name: 1, price: 1 },
    );
    if (foodDocs.length !== requested.length) {
      await reopenReservation();
      return message("Una de las comidas ya no está disponible.", 409);
    }

    const foods: IReservationFood[] = requested.map(
      ({ id: foodId, quantity }) => {
        const doc = foodDocs.find(({ _id }) => String(_id) === foodId);
        return { foodId, name: doc.name, quantity, unitPrice: doc.price };
      },
    );

    for (const food of foods) {
      const taken = await Food.updateOne(
        { _id: food.foodId, availableAmount: { $gte: food.quantity } },
        { $inc: { availableAmount: -food.quantity } },
      );
      if (taken.modifiedCount !== 1) {
        await returnStock(reserved);
        await reopenReservation();
        return message(`No hay suficientes unidades de ${food.name}.`, 409);
      }
      reserved.push(food);
    }

    // El total sale de los precios guardados aquí, nunca de lo que envía el navegador.
    const checkout = await createCheckoutSession(
      reservation,
      foods,
      movie.title,
      new URL(request.url).origin,
    );
    await Reservation.updateOne(
      { _id: id },
      { foods, stripeSessionId: checkout.id, updatedAt: new Date() },
    );

    return NextResponse.json({ url: checkout.url }, { status: 201 });
  } catch (error: any) {
    console.error(`Error in pay route: ${error.message}`);
    await returnStock(reserved).catch(() => null);
    await reopenReservation().catch(() => null);
    return message("No pudimos abrir el pago. Intenta de nuevo.", 500);
  }
}
