import React from "react";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import FoodCard from "@/app/ui/customers/card/foods/Card";
import PageHeader from "@/app/ui/customers/PageHeader";
import { getFoodsByCategory } from "@/services/food";
import { FoodCategory } from "@/types/food";
import { IFood } from "@/interfaces/food";

interface PageProps {
  params: Promise<{
    category: FoodCategory;
  }>;
}

const categoryTitles: Record<FoodCategory, string> = {
  [FoodCategory.FOODS]: "Alimentos",
  [FoodCategory.DRINKS]: "Bebidas",
  [FoodCategory.COMBOS]: "Combos",
};

export default async function FoodsByCategoryPage({ params }: PageProps) {
  const { category } = await params;

  const foods: IFood[] = await getFoodsByCategory(category);

  return (
    <div className="ms-container py-10 md:py-14">
      <Link
        href="/foods"
        className="ms-link mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted"
      >
        <HiArrowLeft aria-hidden />
        Comidas
      </Link>
      <PageHeader title={categoryTitles[category] ?? "Comidas"} />

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
    </div>
  );
}
