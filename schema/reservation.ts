import { SeatType } from "@/types/reservation";
import { z } from "zod";

export const MAX_SEATS_PER_RESERVATION = 8;

export const ReservationSchema = z.object({
  sessionId: z.string().regex(/^[a-f0-9]{24}$/),
  seats: z
    .array(
      z.object({
        type: z.enum(SeatType),
        // El nombre de la silla se usa como parte de la ruta en la consulta,
        // así que solo se aceptan valores como A1 o C10.
        seat: z.string().regex(/^[A-Z][0-9]{1,2}$/),
      }),
    )
    .min(1)
    .max(MAX_SEATS_PER_RESERVATION)
    .refine(
      (seats) =>
        new Set(seats.map(({ type, seat }) => `${type}:${seat}`)).size ===
        seats.length,
    ),
});
