import { Schema, Document } from "mongoose";
import { IRoom } from "./room";

export interface ISeats {
  [key: string]: boolean;
}

export interface ISessionModel extends Document {
  movieId: Schema.Types.ObjectId;
  roomId: Schema.Types.ObjectId;
  dateTime: Date;
  seatsPreferential: ISeats;
  availableSeatsPreferential: number;
  preferentialPrice: number;
  seatsGeneral: ISeats;
  availableSeatsGeneral: number;
  generalPrice: number;
  availableSeats: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISession {
  _id: Schema.Types.ObjectId;
  movieId: Schema.Types.ObjectId;
  roomId: IRoom;
  dateTime: Date;
  seatsPreferential: ISeats;
  availableSeatsPreferential: number;
  preferentialPrice: number;
  seatsGeneral: ISeats;
  availableSeatsGeneral: number;
  generalPrice: number;
  availableSeats: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IAvailableSeatsByRoom {
  _id: string;
  availableSeats: number;
}
