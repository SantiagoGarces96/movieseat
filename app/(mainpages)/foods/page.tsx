import React from "react";
import CategoryCardsGrid from "@/app/ui/customers/foods/category/CategoriesPage";
import { getCategories } from "@/app/ui/customers/foods/category/Card";
import CarouselSection from "@/app/ui/customers/foods/category/Carousel";
import { getFoodsByCategory } from "@/services/food";
import { FoodCategory } from "@/types/food";

interface PageProps {
  searchParams: { categoryPage?: string };
}

export default async function CategoriesPage({}: PageProps) {
  const categories = getCategories();

  const foodsByCategory = {
    [FoodCategory.FOODS]: await getFoodsByCategory(FoodCategory.FOODS),
    [FoodCategory.DRINKS]: await getFoodsByCategory(FoodCategory.DRINKS),
    [FoodCategory.COMBOS]: await getFoodsByCategory(FoodCategory.COMBOS),
  };

  return (
    <div className="container mx-auto">
      <CarouselSection foodsByCategory={foodsByCategory} />

      <div className="mt-6 flex justify-center p-4">
        <CategoryCardsGrid categories={categories} />
      </div>
    </div>
  );
}
