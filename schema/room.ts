import { SessionRoom } from "@/types/session";
import { z } from "zod";

const SessionRoomEnum = z.enum([
  SessionRoom["2D"],
  SessionRoom["3D"],
  SessionRoom.IMAX,
]);

export const roomSchema = z.object({
  name: z
    .string({
      required_error: "El título es obligatorio",
    })
    .min(1, "El título no puede estar vacío"),
  roomType: SessionRoomEnum.default(SessionRoom["2D"]),
  totalSeatsPreferential: z
    .number({
      required_error: "El Total asientos preferenciales es obligatorio",
    })
    .int()
    .positive(
      "El Total asientos preferenciales debe ser un número entero positivo",
    ),
  totalSeatsGeneral: z
    .number({
      required_error: "El Total asientos generales es obligatorio",
    })
    .int()
    .positive("El Total asientos generales debe ser un número entero positivo"),
});
