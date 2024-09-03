import { TransactionStatus } from "@/types/transaction";
import { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  ticketId: Schema.Types.ObjectId;
  foodItems: Schema.Types.ObjectId[];
  totalAmount: number;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}
