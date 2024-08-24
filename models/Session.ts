import { ISession } from "@/interfaces/session";
import { Schema, model, models } from "mongoose";

const sessionSchema = new Schema<ISession>({
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  room: { type: String, enum: ["2D", "3D", "IMAX"], required: true },
  price: { type: Number, required: true },
  dateTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Session || model<ISession>("Session", sessionSchema);
