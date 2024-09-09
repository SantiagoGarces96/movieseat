import { TransactionStatus } from "@/types/transaction";
import { Schema, Document } from "mongoose";
import { IUser } from "./user";
import { ITicket } from "./ticket";
import { IFood } from "./food";

export interface ITransactionModel extends Document {
  userId: Schema.Types.ObjectId;
  ticketId: Schema.Types.ObjectId;
  foodItems: Schema.Types.ObjectId[];
  totalAmount: number;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransaction {
  _id: Schema.Types.ObjectId;
  userId: IUser;
  ticketId: ITicket;
  foodItems: IFood[];
  totalAmount: number;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
