import { MovieStatus } from "@/types/movie";
import { z } from "zod";

export const MovieFormSchema = z.object({
  imdb_id: z
    .number({
      required_error: "El ID de IMDb es obligatorio",
    })
    .int()
    .positive("El ID de IMDb debe ser un número entero positivo"),

  title: z
    .string({
      required_error: "El título es obligatorio",
    })
    .min(1, "El título no puede estar vacío"),

  director: z.string({
    required_error: "El director es obligatorio",
  }),

  releaseDate: z.date({
    required_error: "La fecha de lanzamiento es obligatoria",
  }),

  description: z
    .string({
      required_error: "La descripción es obligatoria",
    })
    .min(10, "La descripción debe tener al menos 10 caracteres"),

  cast: z
    .array(z.string(), {
      required_error: "El elenco es obligatorio",
    })
    .nonempty("Debe especificarse al menos un miembro del elenco"),

  genre: z
    .array(z.string(), {
      required_error: "El género es obligatorio",
    })
    .nonempty("Debe especificarse al menos un género"),

  trailer: z
    .string()
    .url("El enlace del tráiler debe ser una URL válida")
    .optional(),

  poster: z
    .string({
      required_error: "La portada es obligatoria",
    })
    .url("La portada debe ser una URL válida"),

  backdrop: z
    .string({
      required_error: "La contraportada es obligatoria",
    })
    .url("La contraportada debe ser una URL válida"),

  status: z
    .enum([MovieStatus.UPCOMING, MovieStatus.PRE_SALE, MovieStatus.BILLBOARD])
    .default(MovieStatus.UPCOMING),

  language: z
    .array(z.string(), {
      required_error: "El idioma es obligatorio",
    })
    .nonempty("Debe especificarse al menos un idioma"),

  duration: z
    .number({
      required_error: "La duración es obligatoria",
    })
    .min(1, "La duración debe ser al menos 1 minuto"),

  subtitles: z.boolean().optional(),
});
