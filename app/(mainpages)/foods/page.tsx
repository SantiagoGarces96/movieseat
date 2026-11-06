import React from "react";
import CategoryCardsGrid from "@/app/ui/customers/foods/category/CategoriesPage";
import { getCategories } from "@/app/ui/customers/foods/category/Card";
import FoodsHero from "@/app/ui/customers/foods/FoodsHero";

export default function CategoriesPage() {
  return (
    <FoodsHero
      title="Comidas"
      image="/images/foods/portada.webp"
      description="Esta sección es informativa. Podrás agregar tu comida en el proceso de compra de boletas."
    >
      <CategoryCardsGrid categories={getCategories()} />
    </FoodsHero>
  );
}
