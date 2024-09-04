import { SessionRoom } from "@/types/session";
import { Schema, Document } from "mongoose";

export interface IRoomModel extends Document {
  name: string;
  room: SessionRoom;
  totalSeatsPreferential: number;
  totalSeatsGeneral: number;
  totalSeats: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoom {
  _id: Schema.Types.ObjectId;
  name: string;
  room: SessionRoom;
  totalSeatsPreferential: number;
  totalSeatsGeneral: number;
  totalSeats: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
