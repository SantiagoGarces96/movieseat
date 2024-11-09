import { FoodCategory } from "@/types/food";
export const getCategories = () => {
  return [
    {
      id: FoodCategory.FOODS,
      name: "Alimentos",
      image:
        "https://archivos-cms.cinecolombia.com/images/_aliases/medium/7/8/4/7/7487-9-esl-CO/855b45168e14-cc_confiteria_ima_1.png",
      description: "Explore una variedad de deliciosos alimentos.",
    },
    {
      id: FoodCategory.DRINKS,
      name: "Bebidas",
      image:
        "https://archivos-cms.cinecolombia.com/images/_aliases/medium/8/0/5/7/7508-6-esl-CO/9fd505a56aab-trio.png",
      description: "Encuentra bebidas refrescantes para saciar tu sed.",
    },
    {
      id: FoodCategory.COMBOS,
      name: "Combos",
      image:
        "https://archivos-cms.cinecolombia.com/images/_aliases/medium/6/6/4/7/7466-9-esl-CO/6ce5ad738478-2532cine-colombia.jpg",
      description: "Grandes ofertas combinadas para que las disfrutes.",
    },
  ];
};
