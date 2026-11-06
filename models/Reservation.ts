import { IReservation, ReservationStatus, SeatType } from "@/types/reservation";
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

const reservationSchema = new Schema<IReservation>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sessionId: { type: Schema.Types.ObjectId, ref: "Session", required: true },
  seats: { type: [seatSchema], required: true },
  seatsTotal: { type: Number, required: true },
  foods: { type: [foodSchema], default: undefined },
  stripeSessionId: { type: String },
  status: {
    type: String,
    enum: Object.values(ReservationStatus),
    default: ReservationStatus.PENDING,
  },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

reservationSchema.index({ status: 1, expiresAt: 1 });
reservationSchema.index({ userId: 1, status: 1 });
reservationSchema.index({ stripeSessionId: 1 }, { sparse: true });

export default (models.Reservation as Model<IReservation>) ||
  model<IReservation>("Reservation", reservationSchema);
