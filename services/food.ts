"use server";
import {
  IDashboardResponse,
  IResultDataDashboard,
} from "@/interfaces/dasboard";
import dbConnect from "../lib/dbConnect";
import { IFood } from "@/interfaces/food";
import Food from "@/models/Food";
import { FoodCategory } from "@/types/food";
import { CountResultOpt } from "@/constants/dashboard/table";
import { SortOrder } from "mongoose";

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
          href: `/dashboard/food/${_id}`,
        };
      },
    );
    return parsedFood;
  } catch (error: any) {
    console.error(`Error in getFoodByQuery function: ${error.message}`);
    return [];
  }
};

export const getFood = async (
  page: string = "1",
  limit: string = CountResultOpt[1].toString(),
  query: string = "",
  sortBy: string = "createdAt",
  order: string = "",
): Promise<IDashboardResponse> => {
  await dbConnect();
  const pageSize = CountResultOpt.reduce((prev, curr) =>
    Math.abs(curr - parseInt(limit)) < Math.abs(prev - parseInt(limit))
      ? curr
      : prev,
  );
  const orderType: SortOrder = order === "desc" ? -1 : 1;
  const clearQuery = query.trim();

  try {
    const totalResults = await Food.countDocuments({
      $or: [
        { name: { $regex: clearQuery, $options: "i" } },
        { category: { $regex: clearQuery, $options: "i" } },
        { type: { $regex: clearQuery, $options: "i" } },
      ],
    });

    const totalPages = Math.ceil(totalResults / pageSize);

    const pageNumber =
      parseInt(page) < 1
        ? 1
        : parseInt(page) > totalPages
          ? totalPages
          : parseInt(page);
    const skip = (pageNumber - 1) * pageSize;

    const results = await Food.find({
      $or: [
        { name: { $regex: clearQuery, $options: "i" } },
        { category: { $regex: clearQuery, $options: "i" } },
        { type: { $regex: clearQuery, $options: "i" } },
      ],
    })
      .sort({ [sortBy]: orderType })
      .skip(skip < 0 ? 0 : skip)
      .limit(pageSize);

    const formattedResults = results.map((result: IFood) => ({
      _id: result._id.toString(),
      nameAndImage:
        result.name +
        "|" +
        result.image +
        "|" +
        result.category +
        "|" +
        result.type,
      description: result.description,
      price: result.price.toString(),
      size: result.size.toString(),
      availableAmount: result.availableAmount.toString(),
      createdAt: result.createdAt.toISOString().slice(0, 10),
      updatedAt: result.updatedAt.toISOString().slice(0, 10),
    }));

    return {
      results: formattedResults,
      page: pageNumber,
      totalPages,
      totalResults,
    };
  } catch (error: any) {
    console.error(`Error in getRooms function: ${error.message}`);
    return {
      results: [],
      page: 1,
      totalPages: 0,
      totalResults: 0,
    };
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
