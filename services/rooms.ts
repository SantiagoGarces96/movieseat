"use server";
import {
  IDashboardResponse,
  IResultDataDashboard,
} from "@/interfaces/dasboard";
import dbConnect from "../lib/dbConnect";
import { IRoom } from "@/interfaces/room";
import Room from "@/models/Room";
import { CountResultOpt } from "@/constants/dashboard/table";
import { SortOrder } from "mongoose";

export const getAllRooms = async (): Promise<IRoom[]> => {
  await dbConnect();
  try {
    const movies: IRoom[] = await Room.find({}).sort({ name: 1 });
    return movies;
  } catch (error: any) {
    console.error(`Error in getAllRooms function: ${error.message}`);
    return [];
  }
};

export const getRooms = async (
  page: string = "1",
  limit: string = CountResultOpt[1].toString(),
  query: string = "",
  sortBy: string = "createdAt",
  order: string = "",
): Promise<IDashboardResponse> => {
  await dbConnect();
  const pageSize = CountResultOpt.reduce((prev, curr) =>
    Math.abs(curr - parseInt(limit)) < Math.abs(prev - parseInt(limit))
      ? curr
      : prev,
  );
  const orderType: SortOrder = order === "desc" ? -1 : 1;
  const clearQuery = query.trim();

  try {
    const totalResults = await Room.countDocuments({
      $or: [
        { name: { $regex: clearQuery, $options: "i" } },
        { room: { $regex: clearQuery, $options: "i" } },
      ],
    });

    const totalPages = Math.ceil(totalResults / pageSize);
    console.log(totalPages);

    const pageNumber =
      parseInt(page) < 1
        ? 1
        : parseInt(page) > totalPages
          ? totalPages
          : parseInt(page);
    const skip = (pageNumber - 1) * pageSize;

    const results = await Room.find({
      $or: [
        { name: { $regex: clearQuery, $options: "i" } },
        { room: { $regex: clearQuery, $options: "i" } },
      ],
    })
      .sort({ [sortBy]: orderType })
      .skip(skip < 0 ? 0 : skip)
      .limit(pageSize);

    const formattedResults = results.map((result: IRoom) => ({
      _id: result._id.toString(),
      name: result.name,
      room: result.room,
      totalSeatsPreferential: result.totalSeatsPreferential.toString(),
      totalSeatsGeneral: result.totalSeatsGeneral.toString(),
      totalSeats: result.totalSeats.toString(),
      createdAt: result.createdAt.toISOString().slice(0, 10),
      updatedAt: result.updatedAt.toISOString().slice(0, 10),
    }));

    return {
      results: formattedResults,
      page: pageNumber,
      totalPages,
      totalResults,
    };
  } catch (error: any) {
    console.error(`Error in getRooms function: ${error.message}`);
    return {
      results: [],
      page: 1,
      totalPages: 0,
      totalResults: 0,
    };
  }
};

export const getRoomsByQuery = async (
  query: string,
): Promise<IResultDataDashboard[]> => {
  if (!query) {
    return [];
  }
  await dbConnect();
  try {
    const sooms: IRoom[] = await Room.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });
    const parsedRooms: IResultDataDashboard[] = sooms.map(({ _id, name }) => {
      return {
        src: "https://archivos-cms.cinecolombia.com/images/_aliases/medium/0/8/0/8/18080-3-esl-CO/17.png",
        label: name,
        href: `/dashboard/rooms/${_id}`,
      };
    });
    return parsedRooms;
  } catch (error: any) {
    console.error(`Error in getRoomsByQuery function: ${error.message}`);
    return [];
  }
};
