import { randomBytes } from "node:crypto";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { chargeOrder, TEST_PAYMENT_METHOD } from "@/lib/payments/testGateway";
import Food from "@/models/Food";
import Movie from "@/models/Movie";
import Reservation from "@/models/Reservation";
import Room from "@/models/Room";
import Session from "@/models/Session";
import Ticket from "@/models/Ticket";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { CheckoutSchema } from "@/schema/checkout";
import { ReservationStatus } from "@/types/reservation";
import { TransactionStatus } from "@/types/transaction";
import { isShowtimeOver } from "@/utils/showtime";

const message = (text: string, status: number) =>
  NextResponse.json({ message: text }, { status });

const returnStock = (items: { id: string; quantity: number }[]) =>
  Promise.all(
    items.map(({ id, quantity }) =>
      Food.updateOne({ _id: id }, { $inc: { availableAmount: quantity } }),
    ),
  );

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

  await dbConnect();

  // Este cambio de estado es atómico: dos clics en "Pagar" no generan dos cobros,
  // y la reserva no puede vencer mientras se procesa.
  const reservation = await Reservation.findOneAndUpdate(
    {
      _id: id,
      userId: user.userId,
      status: ReservationStatus.PENDING,
      expiresAt: { $gt: new Date() },
    },
    { status: ReservationStatus.PROCESSING, updatedAt: new Date() },
    { new: true },
  );
  if (!reservation) {
    return message("Esta reserva ya no está activa.", 410);
  }

  const reopenReservation = () =>
    Reservation.updateOne(
      { _id: id, status: ReservationStatus.PROCESSING },
      { status: ReservationStatus.PENDING, updatedAt: new Date() },
    );
  const reserved: { id: string; quantity: number }[] = [];

  try {
    const session = await Session.findById(reservation.sessionId, {
      movieId: 1,
      roomId: 1,
      dateTime: 1,
    });
    const [movie, room] = await Promise.all([
      Movie.findById(session?.movieId, { title: 1, poster: 1 }),
      Room.findById(session?.roomId, { name: 1, room: 1 }),
    ]);
    if (!session || !movie || !room || isShowtimeOver(session.dateTime)) {
      await reopenReservation();
      return message("Esta función ya no está disponible.", 410);
    }

    const { foods: requested, testCard } = parsed.data;
    const foodDocs = await Food.find(
      { _id: { $in: requested.map((food) => food.id) } },
      { name: 1, price: 1 },
    );
    if (foodDocs.length !== requested.length) {
      await reopenReservation();
      return message("Una de las comidas ya no está disponible.", 409);
    }

    const foods = requested.map(({ id: foodId, quantity }) => {
      const doc = foodDocs.find(({ _id }) => String(_id) === foodId);
      return { foodId, name: doc.name, quantity, unitPrice: doc.price };
    });

    for (const { foodId, name, quantity } of foods) {
      const taken = await Food.updateOne(
        { _id: foodId, availableAmount: { $gte: quantity } },
        { $inc: { availableAmount: -quantity } },
      );
      if (taken.modifiedCount !== 1) {
        await returnStock(reserved);
        await reopenReservation();
        return message(`No hay suficientes unidades de ${name}.`, 409);
      }
      reserved.push({ id: foodId, quantity });
    }

    const foodTotal = foods.reduce(
      (total, { quantity, unitPrice }) => total + quantity * unitPrice,
      0,
    );
    const totalPrice = reservation.seatsTotal + foodTotal;

    const charge = await chargeOrder(testCard);
    if (!charge.approved) {
      await returnStock(reserved);
      await reopenReservation();
      return message(charge.reason, 402);
    }

    const ticket = await Ticket.create({
      sessionId: session._id,
      userId: user.userId,
      reservationId: reservation._id,
      code: `MS-${randomBytes(5).toString("hex").toUpperCase()}`,
      movieTitle: movie.title,
      moviePoster: movie.poster,
      roomName: room.name,
      roomFormat: room.room,
      dateTime: session.dateTime,
      seats: reservation.seats,
      foods,
      quantity: reservation.seats.length,
      totalPrice,
    });
    // Una entrada por unidad: las gráficas del panel cuentan estos elementos.
    const foodItems = foods.flatMap(({ foodId, quantity }) =>
      Array.from({ length: quantity }, () => new Types.ObjectId(foodId)),
    );
    const transaction = await Transaction.create({
      userId: user.userId,
      ticketId: ticket._id,
      foodItems,
      totalAmount: totalPrice,
      paymentMethod: TEST_PAYMENT_METHOD,
      paymentReference: charge.reference,
      status: TransactionStatus.COMPLETED,
    });
    await Promise.all([
      User.updateOne(
        { _id: user.userId },
        { $push: { tickets: ticket._id, transactions: transaction._id } },
      ),
      Reservation.updateOne(
        { _id: id },
        { status: ReservationStatus.PAID, updatedAt: new Date() },
      ),
    ]);

    return NextResponse.json(
      { ticketId: ticket._id.toString() },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(`Error in pay route: ${error.message}`);
    await returnStock(reserved).catch(() => null);
    await reopenReservation().catch(() => null);
    return message("No pudimos completar la compra. Intenta de nuevo.", 500);
  }
}
