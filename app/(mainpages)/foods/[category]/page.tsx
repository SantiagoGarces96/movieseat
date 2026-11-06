import React from "react";
import FoodCard from "@/app/ui/customers/card/foods/Card";
import FoodsHero from "@/app/ui/customers/foods/FoodsHero";
import { getFoodsByCategory } from "@/services/food";
import { FoodCategory } from "@/types/food";
import { IFood } from "@/interfaces/food";

interface PageProps {
  params: Promise<{
    category: FoodCategory;
  }>;
}

const categoryDetails: Record<FoodCategory, { title: string; image: string }> = {
  [FoodCategory.FOODS]: {
    title: "Alimentos",
    image: "/images/foods/portada-alimentos.webp",
  },
  [FoodCategory.DRINKS]: {
    title: "Bebidas",
    image: "/images/foods/portada-bebidas.webp",
  },
  [FoodCategory.COMBOS]: {
    title: "Combos",
    image: "/images/foods/portada-combos.webp",
  },
};

export default async function FoodsByCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const { title, image } = categoryDetails[category] ?? {
    title: "Comidas",
    image: "/images/foods/portada.webp",
  };

  const foods: IFood[] = await getFoodsByCategory(category);

  return (
    <FoodsHero title={title} image={image} showBackLink>
      {foods.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {foods.map((food) => (
            <FoodCard key={String(food._id)} food={food} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-white/5 bg-ink-900 px-6 py-12 text-center text-muted">
          Por ahora no hay opciones disponibles en esta categoría.
        </p>
      )}
    </FoodsHero>
  );
}
