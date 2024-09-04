import { ISessionModel } from "@/interfaces/session";
import { SessionRoom } from "@/types/session";
import { Schema, model, models } from "mongoose";

const sessionSchema = new Schema<ISessionModel>({
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  room: {
    type: String,
    enum: Object.values(SessionRoom),
    default: SessionRoom["2D"],
  },
  price: { type: Number, required: true },
  dateTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Session || model<ISessionModel>("Session", sessionSchema);
