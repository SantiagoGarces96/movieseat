import { Schema, Document } from "mongoose";

export interface ISession extends Document {
  _id: Schema.Types.ObjectId;
  movieId: Schema.Types.ObjectId;
  room: "2D" | "3D" | "IMAX";
  price: number;
  dateTime: Date;
  availableSeats: number;
  totalSeats: number;
  createdAt: Date;
  updatedAt: Date;
}
