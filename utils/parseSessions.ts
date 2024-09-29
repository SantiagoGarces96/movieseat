import { ISessionCustomTypes } from "@/interfaces/session";

export const parseBodySessions = (
  sessions: ISessionCustomTypes[],
): { [key: string]: string }[] => {
  return sessions.map(
    ({
      _id,
      movie,
      room,
      availableSeats,
      preferentialPrice,
      generalPrice,
      dateTime,
      createdAt,
      updatedAt,
    }) => ({
      _id: _id.toString(),
      movie,
      room,
      availableSeats: availableSeats.toString(),
      preferentialPrice: `$ ${preferentialPrice.toLocaleString("es-ES")}`,
      generalPrice: `$ ${generalPrice.toLocaleString("es-ES")}`,
      dateTime: `${dateTime.toISOString().split("T")[0]}`,
      createdAt: `${createdAt.toISOString().split("T")[0]}`,
      updatedAt: `${updatedAt.toISOString().split("T")[0]}`,
    }),
  );
};
