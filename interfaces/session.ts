import { Schema, Document } from "mongoose";

export interface ISession extends Document {
  movieId: Schema.Types.ObjectId;
  room: "2D" | "3D" | "IMAX" | string;
  price: number;
  dateTime: Date;
  availableSeats: number;
  totalSeats: number;
  createdAt: Date;
  updatedAt: Date;
}
