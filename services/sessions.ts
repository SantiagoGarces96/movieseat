"use server";
import { IAvailableSeatsByRoom, ISessionResponse } from "@/interfaces/session";
import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import Session from "@/models/Session";
import { SortOrder } from "mongoose";

const options = [5, 10, 15, 20];

export const getSessions = async (
  page: string = "1",
  limit: string = "5",
  query: string = "",
  sortBy: string = "createdAt",
  order: string = "",
): Promise<ISessionResponse> => {
  await dbConnect();
  const pageSize = options.reduce((prev, curr) =>
    Math.abs(curr - parseInt(limit)) < Math.abs(prev - parseInt(limit))
      ? curr
      : prev,
  );
  const orderType: SortOrder = order === "desc" ? -1 : 1;

  try {
    const totalResults = await Session.countDocuments({
      movieId: {
        $in: await Movie.find({
          title: { $regex: query, $options: "i" },
        }).select("_id"),
      },
    });

    const totalPages = Math.ceil(totalResults / pageSize);

    const pageNumber =
      parseInt(page) < 1
        ? 1
        : parseInt(page) > totalPages
          ? totalPages
          : parseInt(page);
    const skip = (pageNumber - 1) * pageSize;

    // const results: ISessionCustomTypes[] = await Session.find({
    //   movieId: {
    //     $in: await Movie.find({
    //       title: { $regex: query, $options: "i" },
    //     }).select("_id"),
    //   },
    // })
    //   .populate("movieId", "title")
    //   .populate("roomId", "name")
    //   .sort({ [sortBy]: orderType })
    //   .skip(skip < 0 ? 0 : skip)
    //   .limit(pageSize)
    //   .lean();

    const results = await Session.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "movie",
        },
      },
      {
        $unwind: "$movie",
      },
      {
        $lookup: {
          from: "rooms",
          localField: "roomId",
          foreignField: "_id",
          as: "room",
        },
      },
      {
        $unwind: "$room",
      },
      {
        $match: {
          "movie.title": { $regex: query, $options: "i" },
        },
      },
      {
        $sort: {
          [sortBy]: orderType,
        },
      },
      {
        $skip: skip < 0 ? 0 : skip,
      },
      {
        $limit: pageSize,
      },
      {
        $project: {
          movie: { $toString: "$movie.title" },
          room: { $toString: "$room.name" },
          availableSeats: { $toString: "$availableSeats" },
          preferentialPrice: { $toString: "$preferentialPrice" },
          generalPrice: { $toString: "$generalPrice" },
          dateTime: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          updatedAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
      },
    ]);

    return {
      results,
      page: pageNumber,
      totalPages,
      totalResults,
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      results: [],
      page: 1,
      totalPages: 0,
      totalResults: 0,
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
