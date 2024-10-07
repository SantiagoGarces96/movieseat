import { Schema, Document } from "mongoose";
import { IRoom } from "./room";
import { HTMLInputTypeAttribute } from "react";

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

export interface ISessionCustomTypes
  extends Omit<ISession, "movieId" | "roomId"> {
  movie: string;
  room: string;
}

export interface ISessionResponse {
  results: { [key: string]: string }[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface ISessionFormInput {
  label: string;
  name?: string;
  type?: HTMLInputTypeAttribute | "select";
  options?: ReadonlyArray<{ opt: string; value: string }>;
  disabled?: boolean;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  autofocus?: boolean;
  currentValue?: number | string;
  required?: boolean;
}
