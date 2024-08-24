import { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  userId: Schema.Types.ObjectId;
  ticketId: Schema.Types.ObjectId;
  foodItems: Schema.Types.ObjectId[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
