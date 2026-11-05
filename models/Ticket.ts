import { ITicketModel } from "@/interfaces/ticket";
import { SeatType } from "@/types/reservation";
import { Model, Schema, model, models } from "mongoose";

const seatSchema = new Schema(
  {
    type: { type: String, enum: Object.values(SeatType), required: true },
    seat: { type: String, required: true },
  },
  { _id: false },
);

const foodSchema = new Schema(
  {
    foodId: { type: Schema.Types.ObjectId, ref: "Food", required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  },
  { _id: false },
);

// Guarda una copia de los datos de la función: las funciones antiguas se borran
// del sistema, y la boleta debe seguir mostrando lo que se compró.
const ticketSchema = new Schema<ITicketModel>({
  sessionId: { type: Schema.Types.ObjectId, ref: "Session", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reservationId: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    unique: true,
    sparse: true,
  },
  code: { type: String, unique: true, sparse: true },
  movieTitle: { type: String },
  moviePoster: { type: String },
  roomName: { type: String },
  roomFormat: { type: String },
  dateTime: { type: Date },
  seats: { type: [seatSchema], default: undefined },
  foods: { type: [foodSchema], default: undefined },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ticketSchema.index({ userId: 1, dateTime: -1 });

export default (models.Ticket as Model<ITicketModel>) ||
  model<ITicketModel>("Ticket", ticketSchema);
