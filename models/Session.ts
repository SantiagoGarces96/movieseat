import { ISessionModel } from "@/interfaces/session";
import { Schema, model, models } from "mongoose";

const sessionSchema = new Schema<ISessionModel>({
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  dateTime: { type: Date, required: true },
  seatsPreferential: {
    type: Map,
    of: Boolean,
    required: true,
  },
  availableSeatsPreferential: { type: Number, required: true },
  preferentialPrice: { type: Number, required: true },
  seatsGeneral: {
    type: Map,
    of: Boolean,
    required: true,
  },
  availableSeatsGeneral: { type: Number, required: true },
  generalPrice: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Session || model<ISessionModel>("Session", sessionSchema);
