"use server";
import { IRoom } from "@/interfaces/room";
import {
  IAvailableSeatsByRoom,
  ISession,
  ISessionResponse,
} from "@/interfaces/session";
import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import Room from "@/models/Room";
import Session from "@/models/Session";
import { getSeatsNumber } from "@/utils/getSeatsNumber";
import { SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { FormState } from "@/types/form";

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
          _id: { $toString: "$_id" },
          movie: { $toString: "$movie.title" },
          room: { $toString: "$room.name" },
          availableSeats: { $toString: "$availableSeats" },
          preferentialPrice: { $toString: "$preferentialPrice" },
          generalPrice: { $toString: "$generalPrice" },
          dateTime: {
            $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$dateTime" },
          },
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          updatedAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" },
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
    console.error(`Error in getSessions function: ${error.message}`);
    return {
      results: [],
      page: 1,
      totalPages: 0,
      totalResults: 0,
    };
  }
};

export const getSessionById = async (_id: string): Promise<ISession | null> => {
  await dbConnect();
  try {
    if (!_id) {
      return null;
    }
    const session: ISession | null = await Session.findById(_id);
    return session;
  } catch (error: any) {
    console.error(`Error in getSessionById function: ${error.message}`);
    return null;
  }
};

export const getSessionByIdMovie = async (movieId: string): Promise<any> => {
  await dbConnect();
  try {
    const now = new Date();
    const todayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );

    const sessions = await Session.aggregate([
      {
        $match: {
          movieId: new mongoose.Types.ObjectId(movieId),
          dateTime: { $gte: todayUTC },
        },
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
        $sort: { dateTime: 1 },
      },
      {
        $project: {
          _id: { $toString: "$_id" },
          room: { $toString: "$room.name" },
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$dateTime" },
          },
          time: {
            $dateToString: { format: "%H:%M:%S", date: "$dateTime" },
          },
        },
      },
    ]);
    return sessions;
  } catch (error: any) {
    console.error(`Error in getSessionByIdMovie function: ${error.message}`);
    return [];
  }
};

export const createSession = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const movieId = formData.get("movieId");
    const roomId = formData.get("roomId");
    const dateTime = formData.get("dateTime");
    const preferentialPrice = formData.get("preferentialPrice");
    const generalPrice = formData.get("generalPrice");

    if (
      !movieId ||
      !roomId ||
      !dateTime ||
      !preferentialPrice ||
      !generalPrice
    ) {
      throw new Error("Fields are required.");
    }

    const room: IRoom | null = await Room.findById(roomId);

    if (!room) {
      throw new Error("Room not found.");
    }

    const seatsPreferential = room.totalSeatsPreferential;
    const seatsGeneral = room.totalSeatsGeneral;
    const availableSeats = room.totalSeats;

    const fields = {
      movieId,
      roomId,
      dateTime: new Date(dateTime.toString() + ":00"),
      seatsPreferential: getSeatsNumber(seatsPreferential),
      availableSeatsPreferential: seatsPreferential,
      preferentialPrice,
      seatsGeneral: getSeatsNumber(seatsGeneral),
      availableSeatsGeneral: seatsGeneral,
      generalPrice,
      availableSeats,
    };
    await Session.create(fields);
    revalidatePath("/dashboard/sessions");
    return { status: "completed", success: true };
  } catch (error: any) {
    console.error(`Error in createSession function: ${error.message}`);
    return { status: "completed", success: false };
  }
};

export const updateSession = async (
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const movieId = formData.get("movieId");
    const roomId = formData.get("roomId");
    const dateTime = formData.get("dateTime");
    const preferentialPrice = formData.get("preferentialPrice");
    const generalPrice = formData.get("generalPrice");

    console.log({ movieId, roomId, dateTime, preferentialPrice, generalPrice });

    if (
      !movieId ||
      !roomId ||
      !dateTime ||
      !preferentialPrice ||
      !generalPrice
    ) {
      throw new Error("Fields are required.");
    }

    const room: IRoom | null = await Room.findById(roomId);

    if (!room) {
      throw new Error("Room not found.");
    }

    const seatsPreferential = room.totalSeatsPreferential;
    const seatsGeneral = room.totalSeatsGeneral;
    const availableSeats = room.totalSeats;

    const fields = {
      movieId,
      roomId,
      dateTime: new Date(dateTime.toString() + ":00"),
      seatsPreferential: getSeatsNumber(seatsPreferential),
      availableSeatsPreferential: seatsPreferential,
      preferentialPrice,
      seatsGeneral: getSeatsNumber(seatsGeneral),
      availableSeatsGeneral: seatsGeneral,
      generalPrice,
      availableSeats,
    };
    await Session.findByIdAndUpdate(id, fields);
    revalidatePath("/dashboard/sessions");
    return { status: "completed", success: true };
  } catch (error: any) {
    console.error(`Error in updateSession function: ${error.message}`);
    return { status: "completed", success: false };
  }
};

export const deleteSession = async (_id: string): Promise<FormState> => {
  try {
    await Session.findByIdAndDelete(_id);
    revalidatePath("/dashboard/invoices");
    return { status: "completed", success: true };
  } catch (error: any) {
    console.error(`Error in deleteSession function: ${error.message}`);
    return { status: "completed", success: false };
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
    console.error(
      `Error in getAvailableSeatsByRoom function: ${error.message}`,
    );
    return [];
  }
};
