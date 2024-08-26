import { Document, Schema } from "mongoose";

export interface IFood extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  image: string;
  description: string;
  price: number;
  size: "small" | "large" | "extralarge";
  availableAmount: number;
  category: "foods" | "drinks" | "combos";
  type: "popcorn" | "fast-food" | "bakery" | "drink" | "combo";
  createdAt: Date;
  updatedAt: Date;
}
