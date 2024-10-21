"use server";
import { IResultDataDashboard } from "@/interfaces/dasboard";
import dbConnect from "../lib/dbConnect";
import { IFood } from "@/interfaces/food";
import Food from "@/models/Food";
import { FoodCategory } from "@/types/food";

export const getFoodByQuery = async (
  query: string,
): Promise<IResultDataDashboard[]> => {
  if (!query) {
    return [];
  }
  await dbConnect();
  try {
    const food: IFood[] = await Food.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });
    const parsedFood: IResultDataDashboard[] = food.map(
      ({ _id, image, name }) => {
        return {
          src: image,
          label: name,
          href: `/food/${_id}`,
        };
      },
    );
    return parsedFood;
  } catch (error: any) {
    console.error(`Error in getFoodByQuery function: ${error.message}`);
    return [];
  }
};

export const getFoodsByCategory = async (
  category: FoodCategory,
): Promise<IFood[]> => {
  if (!category) {
    return [];
  }
  await dbConnect();
  try {
    const foods: IFood[] = await Food.find({
      category: category,
    });

    return foods;
  } catch (error: any) {
    console.error(`Error in getFoodsByCategory function: ${error.message}`);
    return [];
  }
};
