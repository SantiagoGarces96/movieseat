import { ITransaction } from "@/interfaces/transaction";
import { Schema, model, models } from "mongoose";

const transactionSchema = new Schema<ITransaction>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ticketId: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
  foodItems: [{ type: Schema.Types.ObjectId, ref: "Food" }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Transaction ||
  model<ITransaction>("Transaction", transactionSchema);
