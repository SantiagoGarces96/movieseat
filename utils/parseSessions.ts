import { ISessionCustomTypes } from "@/interfaces/session";

export const parseBodySessions = (
  session: ISessionCustomTypes[],
): { [key: string]: string }[] => {
  return session.map(
    ({
      _id,
      movieId,
      roomId,
      availableSeats,
      preferentialPrice,
      generalPrice,
      dateTime,
      createdAt,
      updatedAt,
    }) => ({
      _id: _id.toString(),
      movie: movieId.title,
      room: roomId.name,
      availableSeats: availableSeats.toString(),
      preferentialPrice: `$ ${preferentialPrice.toLocaleString("es-ES")}`,
      generalPrice: `$ ${generalPrice.toLocaleString("es-ES")}`,
      dateTime: `${dateTime.toISOString().split("T")[0]}`,
      createdAt: `${createdAt.toISOString().split("T")[0]}`,
      updatedAt: `${updatedAt.toISOString().split("T")[0]}`,
    }),
  );
};
