import { IUserModel } from "@/interfaces/user";
import { userRole } from "@/types/user";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema<IUserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(userRole),
    default: userRole.CLIENT,
  },
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.User || model<IUserModel>("User", userSchema);
