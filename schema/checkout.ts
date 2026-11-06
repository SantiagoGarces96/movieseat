import { z } from "zod";

export const MAX_UNITS_PER_FOOD = 10;

export const CheckoutSchema = z.object({
  foods: z
    .array(
      z.object({
        id: z.string().regex(/^[a-f0-9]{24}$/),
        quantity: z.number().int().min(1).max(MAX_UNITS_PER_FOOD),
      }),
    )
    .max(20)
    .refine(
      (foods) => new Set(foods.map(({ id }) => id)).size === foods.length,
    ),
});
