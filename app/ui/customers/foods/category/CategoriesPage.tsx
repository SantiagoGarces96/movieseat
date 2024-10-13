import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface CategoryCardsGridProps {
  categories: Category[];
}

const CategoryCardsGrid: React.FC<CategoryCardsGridProps> = ({
  categories,
}) => {
  return (
    <div className="w-full lg:w-9/12">
      <h2 className="text-2xl font-bold">Comidas</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/foods/${category.id}`}>
            <div className="max-w-sm cursor-pointer overflow-hidden rounded border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="bg-white px-6 py-4 text-black">
                <h2 className="text-xl font-bold">{category.name}</h2>
              </div>

              {/* Imagen representativa */}
              <Image
                className="h-48 w-full object-cover"
                src={category.image}
                alt={category.name}
                width={500}
                height={400}
              />

              {/* Descripción */}
              <div className="px-6 py-4">
                <p className="text-base text-gray-700">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCardsGrid;
