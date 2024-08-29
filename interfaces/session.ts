import { SessionRoom } from "@/types/session";
import { Schema, Document } from "mongoose";

export interface ISession extends Document {
  _id: Schema.Types.ObjectId;
  movieId: Schema.Types.ObjectId;
  room: SessionRoom;
  price: number;
  dateTime: Date;
  availableSeats: number;
  totalSeats: number;
  createdAt: Date;
  updatedAt: Date;
}
