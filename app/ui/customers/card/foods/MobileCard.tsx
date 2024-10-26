import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IFood } from "@/interfaces/food";

interface MobileFoodCardProps {
  food: IFood;
}

const MobileFoodCard: React.FC<MobileFoodCardProps> = ({ food }) => {
  return (
    <div className="col-span-1">
      <Link href={`/food/${food._id}`}>
        <div className="flex w-full items-start overflow-hidden rounded-lg bg-white shadow-lg">
          {/* Imagen del alimento usando Next Image */}
          <div className="relative h-[300px] w-full min-w-[100px]">
            <Image
              src={food.image}
              alt={food.name}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Información del alimento */}
          <div className="flex w-2/3 flex-col justify-between p-4">
            <div>
              <h3 className="mb-1 text-sm font-bold leading-snug">
                {food.name}
              </h3>
              <p className="mb-1 text-sm text-gray-600">{food.description}</p>
              <p className="mb-1 text-sm text-gray-600">{`Precio: $${food.price}`}</p>
              <p className="mb-1 text-sm text-gray-600">{`Tamaño: ${food.size}`}</p>
            </div>

            {/* Tipo de alimento */}
            <div className="mt-2">
              <span className="inline-block rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                {food.type.charAt(0).toUpperCase() + food.type.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MobileFoodCard;
