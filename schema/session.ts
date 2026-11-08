import { z } from "zod";

export const SessionFormSchema = z.object({
  movieId: z
    .string({
      error: "La película es obligatoria",
    })
    .min(1, "Elige una película"),
  roomId: z
    .string({
      error: "La sala es obligatoria",
    })
    .min(1, "Elige una sala"),
  date: z
    .string({
      error: "La fecha de la función es obligatoria",
    })
    .min(10, "Elige la fecha de la función"),
  currentTime: z
    .string({
      error: "La hora de la función es obligatoria",
    })
    .min(8, "Elige la hora de la función"),
  preferentialPrice: z
    .number({
      error: "El precio de los asientos preferenciales es obligatorio",
    })
    .int()
    .positive(
      "El precio de los asientos preferenciales debe ser un número entero positivo",
    ),
  generalPrice: z
    .number({
      error: "El precio de los asientos generales es obligatorio",
    })
    .int()
    .positive(
      "El precio de los asientos generales debe ser un número entero positivo",
    ),
});
