import { z } from "zod";

export const SessionFormSchema = z.object({
  movieId: z
    .string({
      error: "El nombre de la película es obligatorio",
    })
    .min(1, "El nombre de la película no puede estar vacío"),
  roomId: z
    .string({
      error: "El nombre de la sala es obligatorio",
    })
    .min(1, "El nombre de la sala no puede estar vacío"),
  date: z
    .string({
      error: "La fecha de la función es obligatoria",
    })
    .min(10, "La fecha de la función no puede estar vacío"),
  currentTime: z
    .string({
      error: "La hora de la función es obligatoria",
    })
    .min(8, "La hora de la función no puede estar vacío"),
  preferentialPrice: z
    .number({
      error: "El precio asientos preferenciales es obligatorio",
    })
    .int()
    .positive(
      "El precio asientos preferenciales debe ser un número entero positivo",
    ),
  generalPrice: z
    .number({
      error: "El precio asientos generales es obligatorio",
    })
    .int()
    .positive(
      "El precio asientos generales debe ser un número entero positivo",
    ),
});
