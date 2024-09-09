import { ITicketModel } from "@/interfaces/ticket";
import { Schema, model, models } from "mongoose";

const ticketSchema = new Schema<ITicketModel>({
  sessionId: { type: Schema.Types.ObjectId, ref: "Session", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Ticket || model<ITicketModel>("Ticket", ticketSchema);
