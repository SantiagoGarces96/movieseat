import { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: "user" | "admin";
  tickets: Schema.Types.ObjectId[];
  transactions: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
