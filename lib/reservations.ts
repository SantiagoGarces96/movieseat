import { Types } from "mongoose";
import Reservation from "@/models/Reservation";
import Session from "@/models/Session";
import {
  ISeatSelection,
  ReservationStatus,
  SeatType,
} from "@/types/reservation";

export const SEAT_HOLD_MINUTES = 10;

const seatPath = ({ type, seat }: ISeatSelection): string =>
  `${type === SeatType.PREFERENTIAL ? "seatsPreferential" : "seatsGeneral"}.${seat}`;

const seatCounts = (seats: ISeatSelection[], sign: 1 | -1) => {
  const preferential = seats.filter(
    ({ type }) => type === SeatType.PREFERENTIAL,
  ).length;
  const general = seats.length - preferential;
  return {
    availableSeatsGeneral: sign * general,
    availableSeatsPreferential: sign * preferential,
    availableSeats: sign * seats.length,
  };
};

// Una sola operación atómica: si otra persona tomó alguna de las sillas, el
// filtro no coincide y no se aparta ninguna.
export const holdSeats = async (
  sessionId: Types.ObjectId | string,
  seats: ISeatSelection[],
): Promise<boolean> => {
  const filter: Record<string, unknown> = { _id: sessionId };
  const taken: Record<string, unknown> = { updatedAt: new Date() };
  for (const seat of seats) {
    filter[seatPath(seat)] = true;
    taken[seatPath(seat)] = false;
  }
  const result = await Session.updateOne(filter, {
    $set: taken,
    $inc: seatCounts(seats, -1),
  });
  return result.modifiedCount === 1;
};

export const releaseSeats = async (
  sessionId: Types.ObjectId | string,
  seats: ISeatSelection[],
): Promise<void> => {
  const free: Record<string, unknown> = { updatedAt: new Date() };
  for (const seat of seats) {
    free[seatPath(seat)] = true;
  }
  await Session.updateOne(
    { _id: sessionId },
    { $set: free, $inc: seatCounts(seats, 1) },
  );
};

// Cambiar el estado primero garantiza que las sillas se devuelvan una sola vez.
const closeReservation = async (
  filter: Record<string, unknown>,
  status: ReservationStatus,
): Promise<boolean> => {
  const reservation = await Reservation.findOneAndUpdate(
    { ...filter, status: ReservationStatus.PENDING },
    { status, updatedAt: new Date() },
  );
  if (!reservation) return false;
  await releaseSeats(reservation.sessionId, reservation.seats);
  return true;
};

export const cancelReservation = (
  reservationId: string,
  userId: string,
): Promise<boolean> =>
  closeReservation({ _id: reservationId, userId }, ReservationStatus.CANCELLED);

export const cancelUserReservations = async (userId: string): Promise<void> => {
  const pending = await Reservation.find(
    { userId, status: ReservationStatus.PENDING },
    { _id: 1 },
  );
  await Promise.all(
    pending.map(({ _id }) =>
      closeReservation({ _id }, ReservationStatus.CANCELLED),
    ),
  );
};

// Vercel no mantiene procesos corriendo, así que las reservas vencidas se
// liberan cuando alguien consulta las sillas o intenta apartarlas.
export const releaseExpiredReservations = async (
  sessionId?: Types.ObjectId | string,
): Promise<void> => {
  const now = new Date();
  const expired = await Reservation.find(
    {
      status: ReservationStatus.PENDING,
      expiresAt: { $lte: now },
      ...(sessionId ? { sessionId } : {}),
    },
    { _id: 1 },
  ).limit(100);
  await Promise.all(
    expired.map(({ _id }) =>
      closeReservation(
        { _id, expiresAt: { $lte: now } },
        ReservationStatus.EXPIRED,
      ),
    ),
  );
};
