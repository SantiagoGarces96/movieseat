import { SessionRoom } from "@/types/session";
import { z } from "zod";

const SessionRoomEnum = z.enum([
  SessionRoom["2D"],
  SessionRoom["3D"],
  SessionRoom.IMAX,
]);

export const RoomFormSchema = z.object({
  name: z
    .string({
      error: "El nombre de la sala es obligatorio",
    })
    .min(1, "El nombre de la sala no puede estar vacío"),
  room: SessionRoomEnum.default(SessionRoom["2D"]),
  totalSeatsPreferential: z
    .number({
      error: "El total de asientos preferenciales es obligatorio",
    })
    .int()
    .positive(
      "El total de asientos preferenciales debe ser un número entero positivo",
    )
    .multipleOf(
      10,
      "Los asientos preferenciales van en filas de 10: usa 10, 20, 30...",
    )
    .max(260, "Una sala puede tener hasta 26 filas de asientos preferenciales"),
  totalSeatsGeneral: z
    .number({
      error: "El total de asientos generales es obligatorio",
    })
    .int()
    .positive(
      "El total de asientos generales debe ser un número entero positivo",
    )
    .multipleOf(
      10,
      "Los asientos generales van en filas de 10: usa 10, 20, 30...",
    )
    .max(260, "Una sala puede tener hasta 26 filas de asientos generales"),
});
