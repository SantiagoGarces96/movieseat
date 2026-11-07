import { ITransactionModel } from "@/interfaces/transaction";
import { TransactionStatus } from "@/types/transaction";
import { Schema, model, models } from "mongoose";

const transactionSchema = new Schema<ITransactionModel>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ticketId: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
  foodItems: [{ type: Schema.Types.ObjectId, ref: "Food" }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String },
  paymentReference: { type: String },
  status: {
    type: String,
    enum: Object.values(TransactionStatus),
    default: TransactionStatus.PENDING,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Un mismo pago de Stripe no puede registrarse dos veces.
transactionSchema.index(
  { paymentReference: 1 },
  { unique: true, sparse: true },
);

export default models.Transaction ||
  model<ITransactionModel>("Transaction", transactionSchema);
