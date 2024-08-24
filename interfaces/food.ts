import { Document } from "mongoose";

export interface IFood extends Document {
  name: string;
  description: string;
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}
