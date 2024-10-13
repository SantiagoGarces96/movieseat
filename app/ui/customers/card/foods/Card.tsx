import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IFood } from "@/interfaces/food";
import { FoodCategory } from "@/types/food";

// Propiedades que recibirá la tarjeta
interface FoodCardProps {
  food: IFood;
}

// Colores para las categorías
const categoryColors: Record<FoodCategory, string> = {
  [FoodCategory.FOODS]: "bg-green-500",
  [FoodCategory.DRINKS]: "bg-blue-500",
  [FoodCategory.COMBOS]: "bg-yellow-500",
};

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const categoryLabel =
    food.category.charAt(0).toUpperCase() + food.category.slice(1);

  return (
    <div className="mb-4">
      <Link
        href={`/food/${food._id}`}
        className="block overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
      >
        <div className="relative">
          <span
            className={`absolute left-2 top-2 rounded px-2 py-1 text-xs font-semibold text-white ${categoryColors[food.category]}`}
            style={{ zIndex: 10 }}
          >
            {categoryLabel}
          </span>
          <figure className="relative w-full md:h-[15rem] hd:h-[20rem] fhd:h-[25rem]">
            <Image
              src={food.image}
              alt={food.name}
              fill
              style={{ objectFit: "fill" }}
              className="rounded-t-lg"
            />
          </figure>
        </div>
        <div className="p-4">
          <h2 className="mb-1 overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
            {food.name}
          </h2>
          <p className="mb-2 overflow-hidden truncate text-sm text-gray-700">
            {food.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${food.price}
            </span>
            <span className="inline-block rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
              {food.size}
            </span>
          </div>
          <div className="mt-2 flex gap-2">
            <span className="inline-block rounded bg-green-200 px-2 py-1 text-xs font-medium text-green-800">
              {food.type}
            </span>
            <span className="inline-block rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
              {food.availableAmount} Available
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FoodCard;
