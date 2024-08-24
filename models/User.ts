import { IUser } from "@/interfaces/user";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.User || model<IUser>("User", userSchema);
