import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import {
  cancelUserReservations,
  holdSeats,
  releaseExpiredReservations,
  releaseSeats,
  SEAT_HOLD_MINUTES,
} from "@/lib/reservations";
import Reservation from "@/models/Reservation";
import Session from "@/models/Session";
import { ReservationSchema } from "@/schema/reservation";
import { SeatType } from "@/types/reservation";
import { isShowtimeOver } from "@/utils/showtime";

const message = (text: string, status: number) =>
  NextResponse.json({ message: text }, { status });

export async function POST(request: Request) {
  const user = await getSession();
  if (!user) {
    return message("Inicia sesión para continuar.", 401);
  }

  const parsed = ReservationSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return message("La selección de sillas no es válida.", 400);
  }

  try {
    await dbConnect();
    const { sessionId, seats } = parsed.data;
    const session = await Session.findById(sessionId, {
      dateTime: 1,
      generalPrice: 1,
      preferentialPrice: 1,
    });
    if (!session) {
      return message("Esta función ya no existe.", 404);
    }
    if (isShowtimeOver(session.dateTime)) {
      return message("Esta función ya comenzó.", 410);
    }

    await releaseExpiredReservations(sessionId);
    await cancelUserReservations(user.userId);

    if (!(await holdSeats(sessionId, seats))) {
      return message(
        "Alguna de esas sillas ya no está disponible. Elige otras.",
        409,
      );
    }

    try {
      const seatsTotal = seats.reduce(
        (total, { type }) =>
          total +
          (type === SeatType.PREFERENTIAL
            ? session.preferentialPrice
            : session.generalPrice),
        0,
      );
      const reservation = await Reservation.create({
        userId: user.userId,
        sessionId,
        seats,
        seatsTotal,
        expiresAt: new Date(Date.now() + SEAT_HOLD_MINUTES * 60 * 1000),
      });
      return NextResponse.json(
        { id: reservation._id.toString() },
        { status: 201 },
      );
    } catch (error) {
      await releaseSeats(sessionId, seats);
      throw error;
    }
  } catch (error: any) {
    console.error(`Error in reservations route: ${error.message}`);
    return message("No pudimos apartar las sillas. Intenta de nuevo.", 500);
  }
}
