import { IRoomModel } from "@/interfaces/room";
import { SessionRoom } from "@/types/session";
import { Schema, model, models } from "mongoose";

const roomSchema = new Schema<IRoomModel>({
  name: { type: String, required: true },
  room: {
    type: String,
    enum: Object.values(SessionRoom),
    default: SessionRoom["2D"],
  },
  totalSeatsPreferential: { type: Number, required: true },
  totalSeatsGeneral: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Room || model<IRoomModel>("Room", roomSchema);
