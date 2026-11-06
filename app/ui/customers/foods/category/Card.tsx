import { FoodCategory } from "@/types/food";

export const getCategories = () => {
  return [
    {
      id: FoodCategory.FOODS,
      name: "Alimentos",
      description: "Crispetas, perros calientes y algo dulce para la función.",
    },
    {
      id: FoodCategory.DRINKS,
      name: "Bebidas",
      description: "Gaseosas, agua y otras bebidas para acompañar tu película.",
    },
    {
      id: FoodCategory.COMBOS,
      name: "Combos",
      description: "Comida y bebida juntas, para ir solo o en compañía.",
    },
  ];
};
