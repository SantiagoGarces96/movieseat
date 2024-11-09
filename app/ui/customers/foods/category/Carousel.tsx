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
    <section className="carousel-section relative hidden overflow-hidden hd:block">
      <div className="glide w-full">
        <ul className="flex animate-carousel">
          {displayedFoods.map((food, index) => (
            <li
              key={index}
              className="w-[90%] hd:w-[20%] fhd:w-[16.66%] 2k:w-[14.28%]"
            >
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
