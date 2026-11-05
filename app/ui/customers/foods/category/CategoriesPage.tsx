import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { GiPopcorn, GiSodaCan } from "react-icons/gi";
import { HiArrowRight } from "react-icons/hi2";
import { MdFastfood } from "react-icons/md";
import { FoodCategory } from "@/types/food";

interface Category {
  id: FoodCategory;
  name: string;
  description: string;
}

interface CategoryCardsGridProps {
  categories: Category[];
}

const categoryIcons: Record<FoodCategory, IconType> = {
  [FoodCategory.FOODS]: GiPopcorn,
  [FoodCategory.DRINKS]: GiSodaCan,
  [FoodCategory.COMBOS]: MdFastfood,
};

const CategoryCardsGrid: React.FC<CategoryCardsGridProps> = ({
  categories,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-6">
      {categories.map(({ id, name, description }) => {
        const Icon = categoryIcons[id];
        return (
          <Link
            key={id}
            href={`/foods/${id}`}
            className="group flex flex-col rounded-2xl border border-white/5 bg-ink-900 p-6 transition-colors duration-200 hover:border-gold/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:p-8"
          >
            <Icon className="h-12 w-12 text-gold" aria-hidden />
            <h2 className="mt-6 text-xl font-bold tracking-tight">{name}</h2>
            <p className="mt-2 flex-1 text-muted">{description}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
              Ver opciones
              <HiArrowRight
                className="transition-transform motion-safe:group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryCardsGrid;
