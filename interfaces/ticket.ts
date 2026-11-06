import { Schema, Document } from "mongoose";
import { ISeatSelection } from "@/types/reservation";

export interface ITicketFood {
  foodId: Schema.Types.ObjectId | string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface ITicketModel extends Document {
  sessionId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  reservationId: Schema.Types.ObjectId;
  code: string;
  movieTitle: string;
  moviePoster: string;
  roomName: string;
  roomFormat: string;
  dateTime: Date;
  seats: ISeatSelection[];
  foods: ITicketFood[];
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicket {
  _id: Schema.Types.ObjectId;
  sessionId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IDailyTicketSales {
  _id: string;
  ticketsSold: number;
}
