import React from "react";
import FoodCard from "@/app/ui/customers/card/foods/Card";
import { IFood } from "@/interfaces/food";

interface CarouselSectionProps {
  foodsByCategory: {
    [category: string]: IFood[];
  };
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  foodsByCategory,
}) => {
  const displayedFoods = Object.values(foodsByCategory).flat().slice(0, 3);

  return (
    <section className="section carousel-section relative overflow-hidden">
      <div className="glide w-full">
        {/* Contenedor animado */}
        <ul className="animate-carousel flex">
          {displayedFoods.map((food, index) => (
            <li key={index} className="w-[20%] flex-none">
              <article className="carousel-item">
                <FoodCard food={food} />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CarouselSection;
