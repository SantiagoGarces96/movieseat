import React from "react";
import Image from "next/image";
import { IFood } from "@/interfaces/food";
import { FoodSize } from "@/types/food";
import { formatPrice } from "@/utils/format";

interface FoodCardProps {
  food: IFood;
}

const sizeLabels: Record<FoodSize, string> = {
  [FoodSize.SMALL]: "Pequeño",
  [FoodSize.LARGE]: "Mediano",
  [FoodSize.EXTRALARGE]: "Grande",
};

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-ink-900">
      <div className="relative aspect-[4/3] bg-ink-800">
        <Image
          src={food.image}
          alt={food.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 460px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-semibold">{food.name}</h2>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted">
          {food.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-bold">{formatPrice(food.price)}</span>
          <span className="text-sm text-muted">
            {food.availableAmount > 0 ? sizeLabels[food.size] : "Agotado"}
          </span>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;
