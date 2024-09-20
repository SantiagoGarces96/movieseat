"use server";
import { IAvailableSeatsByRoom } from "@/interfaces/session";
import dbConnect from "@/lib/dbConnect";
import Session from "@/models/Session";

export const getAvailableSeatsByRoom = async (): Promise<
  IAvailableSeatsByRoom[]
> => {
  await dbConnect();
  try {
    const availableSeats: IAvailableSeatsByRoom[] = await Session.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "roomId",
          foreignField: "_id",
          as: "room",
        },
      },
      { $unwind: "$room" },
      {
        $group: {
          _id: "$room.name",
          availableSeats: { $sum: "$availableSeats" },
        },
      },
      { $sort: { availableSeats: -1 } },
    ]);
    return availableSeats;
  } catch (error: any) {
    return [];
  }
};
