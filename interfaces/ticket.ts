import { Schema, Document } from "mongoose";

export interface ITicket extends Document {
  _id: Schema.Types.ObjectId;
  sessionId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
