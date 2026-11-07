import type { Types } from "mongoose";

export enum SeatType {
  GENERAL = "general",
  PREFERENTIAL = "preferential",
}

export enum ReservationStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  PAID = "paid",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
}

export interface ISeatSelection {
  type: SeatType;
  seat: string;
}

export interface IReservationFood {
  foodId: Types.ObjectId | string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface IReservation {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  sessionId: Types.ObjectId;
  seats: ISeatSelection[];
  seatsTotal: number;
  foods?: IReservationFood[];
  stripeSessionId?: string | null;
  status: ReservationStatus;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const seatLabel = ({ type, seat }: ISeatSelection): string =>
  type === SeatType.PREFERENTIAL ? `P-${seat}` : `G-${seat}`;
