import { IFood } from "@/interfaces/food";
import { FoodCategory, FoodSize, FoodType } from "@/types/food";
import { Schema, model, models } from "mongoose";

const foodSchema = new Schema<IFood>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: {
    type: String,
    enum: Object.values(FoodSize),
    default: FoodSize.SMALL,
  },
  availableAmount: { type: Number, required: true },
  category: {
    type: String,
    enum: Object.values(FoodCategory),
    default: FoodCategory.FOODS,
  },
  type: {
    type: String,
    enum: Object.values(FoodType),
    default: FoodType.POPCORN,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Food || model<IFood>("Food", foodSchema);
