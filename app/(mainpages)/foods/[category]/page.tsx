import React from "react";
import FoodCard from "@/app/ui/customers/card/foods/Card";
import MobileFoodCard from "@/app/ui/customers/card/foods/MobileCard";
import { getFoodsByCategory } from "@/services/food";
import { FoodCategory } from "@/types/food";
import { IFood } from "@/interfaces/food";

interface PageProps {
  params: {
    category: FoodCategory;
  };
}

export default async function FoodsByCategoryPage({ params }: PageProps) {
  const { category } = params;

  const foods: IFood[] = await getFoodsByCategory(category);

  return (
    <div className="flex w-full flex-col overflow-hidden p-4">
      <h1 className="mb-6 flex justify-center text-4xl font-bold capitalize">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      {/* Versión para pantallas grandes (HD, FHD, 2K) */}
      <div className="hidden flex-wrap justify-center gap-6 p-8 md:flex">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div
              key={food._id}
              className="w-[400px] transform transition-transform hover:scale-105"
            >
              <FoodCard food={food} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay alimentos disponibles</p>
        )}
      </div>

      {/* Versión para pantallas pequeñas (SM y XS) */}
      <div className="block w-full md:hidden">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div key={food._id} className="mb-4">
              <MobileFoodCard food={food} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay alimentos disponibles</p>
        )}
      </div>
    </div>
  );
}
