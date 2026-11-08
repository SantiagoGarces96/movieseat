import Reservation from "@/models/Reservation";
import Session from "@/models/Session";
import { ReservationStatus } from "@/types/reservation";
import { getLocalNow } from "@/utils/showtime";

// Una función está "en uso" si alguien tiene sillas apartadas, en pago o
// compradas en ella. Esas funciones no se pueden borrar desde el panel.
const ACTIVE_STATUSES = [
  ReservationStatus.PENDING,
  ReservationStatus.PROCESSING,
  ReservationStatus.PAID,
];

const usedSessionIds = async (sessionIds: unknown[]): Promise<Set<string>> => {
  const used = await Reservation.distinct("sessionId", {
    sessionId: { $in: sessionIds },
    status: { $in: ACTIVE_STATUSES },
  });
  return new Set(used.map(String));
};

export const isSessionInUse = async (sessionId: string): Promise<boolean> =>
  (await usedSessionIds([sessionId])).size > 0;

// Prepara el borrado de una sala o una película: si alguna de sus funciones
// futuras ya tiene ventas, no se borra nada. Si no, se borran las funciones
// sin ventas, y las pasadas con ventas quedan para el historial.
export const removeUnusedSessions = async (
  filter: Record<string, unknown>,
): Promise<boolean> => {
  const sessions = await Session.find(filter, { _id: 1, dateTime: 1 }).lean<
    { _id: unknown; dateTime: Date }[]
  >();
  const used = await usedSessionIds(sessions.map(({ _id }) => _id));
  const now = getLocalNow();
  const hasFutureSales = sessions.some(
    ({ _id, dateTime }) => used.has(String(_id)) && dateTime > now,
  );
  if (hasFutureSales) return false;
  await Session.deleteMany({
    _id: {
      $in: sessions
        .filter(({ _id }) => !used.has(String(_id)))
        .map(({ _id }) => _id),
    },
  });
  return true;
};
