import { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: "client" | "admin";
  tickets: Schema.Types.ObjectId[];
  transactions: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
