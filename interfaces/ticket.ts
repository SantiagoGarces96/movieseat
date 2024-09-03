import { Schema, Document } from "mongoose";

export interface ITicketModel extends Document {
  sessionId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicket {
  _id: Schema.Types.ObjectId;
  sessionId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
