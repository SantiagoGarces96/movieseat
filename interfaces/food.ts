import { FoodCategory, FoodSize, FoodType } from "@/types/food";
import { Document } from "mongoose";

export interface IFoodModel extends Document {
  name: string;
  image: string;
  description: string;
  price: number;
  size: FoodSize;
  availableAmount: number;
  category: FoodCategory;
  type: FoodType;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFood {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  size: FoodSize;
  availableAmount: number;
  category: FoodCategory;
  type: FoodType;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
