import { FoodCategory, FoodSize, FoodType } from "@/types/food";
import { z } from "zod";

const SizeFoodEnum = z.enum([
  FoodSize.SMALL,
  FoodSize.LARGE,
  FoodSize.EXTRALARGE,
]);

const CategoryFoodEnum = z.enum([
  FoodCategory.FOODS,
  FoodCategory.DRINKS,
  FoodCategory.COMBOS,
]);

const TypeFoodEnum = z.enum([
  FoodType.BAKERY,
  FoodType.COMBO,
  FoodType.DRINK,
  FoodType.FAST_FOOD,
  FoodType.POPCORN,
]);

export const FoodFormSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es obligatorio",
    })
    .min(1, "El nombre no puede estar vacío"),
  image: z
    .string({
      required_error: "La url de la imagen es obligatoria",
    })
    .url("El enlace de la imagen debe ser una URL válida"),
  description: z
    .string({
      required_error: "La descripcion es obligatoria",
    })
    .min(3, "La descripcion no puede estar vacía"),
  price: z
    .number({
      required_error: "El precio es obligatorio",
    })
    .int()
    .positive("El precio debe ser un número entero positivo"),
  size: SizeFoodEnum.default(FoodSize.SMALL).optional(),
  availableAmount: z
    .number({
      required_error: "La cantidad disponible es obligatoria",
    })
    .int()
    .positive("La cantidad disponible debe ser un número entero positivo"),
  category: CategoryFoodEnum.default(FoodCategory.FOODS).optional(),
  type: TypeFoodEnum.default(FoodType.POPCORN).optional(),
});
