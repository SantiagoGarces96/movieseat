import React from "react";
import CategoryCardsGrid from "@/app/ui/customers/foods/category/CategoriesPage";
import { getCategories } from "@/app/ui/customers/foods/category/Card";

interface PageProps {
  searchParams: { categoryPage?: string };
}

export default async function CategoriesPage({}: PageProps) {
  const categories = getCategories();

  return (
    <div className="container mx-auto">
      <div className="mt-6 flex justify-center">
        <CategoryCardsGrid categories={categories} />
      </div>
    </div>
  );
}
