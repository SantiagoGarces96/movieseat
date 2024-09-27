"use server";
import {
  IAvailableSeatsByRoom,
  ISessionCustomTypes,
  ISessionResponse,
} from "@/interfaces/session";
import dbConnect from "@/lib/dbConnect";
import Session from "@/models/Session";

const options = [5, 10, 15, 20];

export const getSessions = async (
  page: string = "1",
  limit: string = "5",
  query: string = "",
): Promise<ISessionResponse> => {
  await dbConnect();
  const pageNumber = parseInt(page) < 1 ? 1 : parseInt(page);
  const pageSize = options.reduce((prev, curr) =>
    Math.abs(curr - parseInt(limit)) < Math.abs(prev - parseInt(limit))
      ? curr
      : prev,
  );
  const skip = (pageNumber - 1) * pageSize;
  try {
    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const totalResults = await Session.countDocuments().populate({
      path: "movieId",
      match: { title: { $regex: query, $options: "i" } },
      select: "title",
    });

    const results: ISessionCustomTypes[] = await Session.find()
      .populate({
        path: "movieId",
        match: { title: { $regex: query, $options: "i" } },
        select: "title",
      })
      .skip(skip)
      .limit(pageSize)
      // .populate("roomId", "name")
      .lean();

    const totalPages = Math.ceil(totalResults / pageSize);

    return {
      results,
      page:
        pageNumber > totalPages ? totalPages : pageNumber < 1 ? 1 : pageNumber,
      total_pages: totalPages,
      total_results: totalResults,
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      results: [],
      page: pageNumber,
      total_pages: 0,
      total_results: 0,
    };
  }
};

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
    console.error(error.message);
    return [];
  }
};
