import { IFood } from "@/interfaces/food";
import { Schema, model, models } from "mongoose";

const foodSchema = new Schema<IFood>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Food || model<IFood>("Food", foodSchema);
