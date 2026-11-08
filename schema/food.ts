import { FoodCategory, FoodSize, FoodType } from "@/types/food";
import { IMAGE_HOST_ERROR, isAllowedImageUrl } from "@/utils/imageUrl";
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
      error: "El nombre es obligatorio",
    })
    .min(1, "El nombre no puede estar vacío"),
  image: z
    .string({
      error: "La imagen es obligatoria",
    })
    .refine(isAllowedImageUrl, IMAGE_HOST_ERROR),
  description: z
    .string({
      error: "La descripción es obligatoria",
    })
    .min(3, "La descripción debe tener al menos 3 caracteres"),
  price: z
    .number({
      error: "El precio es obligatorio",
    })
    .int()
    .positive("El precio debe ser un número entero positivo"),
  size: SizeFoodEnum.default(FoodSize.SMALL).optional(),
  availableAmount: z
    .number({
      error: "La cantidad disponible es obligatoria",
    })
    .int()
    .positive("La cantidad disponible debe ser un número entero positivo"),
  category: CategoryFoodEnum.default(FoodCategory.FOODS).optional(),
  type: TypeFoodEnum.default(FoodType.POPCORN).optional(),
});
