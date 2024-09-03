import { userRole } from "@/types/user";
import { Document, Schema } from "mongoose";
import { ITicket } from "./ticket";
import { ITransaction } from "./transaction";

export interface IUserModel extends Document {
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: userRole;
  tickets: Schema.Types.ObjectId[];
  transactions: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: userRole;
  tickets: ITicket[];
  transactions: ITransaction[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
