import React from "react";
import CategoryCardsGrid from "@/app/ui/customers/foods/category/CategoriesPage";
import { getCategories } from "@/app/ui/customers/foods/category/Card";
import PageHeader from "@/app/ui/customers/PageHeader";

export default function CategoriesPage() {
  return (
    <div className="ms-container py-10 md:py-14">
      <PageHeader
        title="Comidas"
        description="Esta sección es informativa. Podrás agregar tu comida en el proceso de compra de boletas."
      />
      <CategoryCardsGrid categories={getCategories()} />
    </div>
  );
}
