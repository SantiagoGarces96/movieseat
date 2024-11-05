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
    <div className="h-full w-full hd:w-9/12">
      <div className="w-full">
        <h2 className="text-3xl font-bold">Comidas</h2>
        <br />
        <p>
          <strong>
            Esta sección es informativa. <br /> Podrás agregar tu comida en el
            proceso de compra de boletas.
          </strong>
        </p>
      </div>
      <br />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 hd:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/foods/${category.id}`}>
            <div className="max-w-sm cursor-pointer overflow-hidden rounded border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="relative">
                <span
                  className={`absolute left-2 top-2 rounded px-2 py-1 text-lg font-semibold text-black ${category.name}`}
                  style={{ zIndex: 10 }}
                >
                  {category.name}
                </span>

                {/* Imagen representativa */}
                <Image
                  className="w-full object-cover"
                  src={category.image}
                  alt={category.name}
                  width={500}
                  height={400}
                />
              </div>

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
