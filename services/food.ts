"use server";
import { IResultDataDashboard } from "@/interfaces/dasboard";
import dbConnect from "../lib/dbConnect";
import { IFood } from "@/interfaces/food";
import Food from "@/models/Food";

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
    return [];
  }
};
