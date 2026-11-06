import React from "react";
import Image from "next/image";
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

const categoryStyles: Record<FoodCategory, { icon: IconType; image: string }> =
  {
    [FoodCategory.FOODS]: {
      icon: GiPopcorn,
      image: "/images/foods/nachos.webp",
    },
    [FoodCategory.DRINKS]: {
      icon: GiSodaCan,
      image: "/images/foods/gaseosa.webp",
    },
    [FoodCategory.COMBOS]: {
      icon: MdFastfood,
      image: "/images/foods/combo.webp",
    },
  };

const CategoryCardsGrid: React.FC<CategoryCardsGridProps> = ({
  categories,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-6">
      {categories.map(({ id, name, description }) => {
        const { icon: Icon, image } = categoryStyles[id];
        return (
          <Link
            key={id}
            href={`/foods/${id}`}
            className="group relative isolate flex min-h-80 flex-col overflow-hidden rounded-2xl border border-white/10 p-6 transition-colors duration-200 hover:border-gold/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:p-8"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 830px) 33vw, 100vw"
              className="-z-20 object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/30" />
            <Icon className="h-12 w-12 text-gold" aria-hidden />
            <h2 className="mt-auto pt-6 text-xl font-bold tracking-tight">
              {name}
            </h2>
            <p className="mt-2 text-paper/85">{description}</p>
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
