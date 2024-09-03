import { FoodCategory, FoodSize, FoodType } from "@/types/food";
import { Document, Schema } from "mongoose";

export interface IFood extends Document {
  _id: Schema.Types.ObjectId;
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
