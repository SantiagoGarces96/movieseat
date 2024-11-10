"use server";
import {
  IDashboardResponse,
  IResultDataDashboard,
} from "@/interfaces/dasboard";
import dbConnect from "../lib/dbConnect";
import { IRoom } from "@/interfaces/room";
import Room from "@/models/Room";
import { CountResultOpt } from "@/constants/dashboard/table";
import { MongooseError, Schema, SortOrder } from "mongoose";
import { FormState, FormStatus } from "@/types/form";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RoomFormSchema } from "@/schema/room";

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

export const getRoomById = async (_id: string): Promise<IRoom | null> => {
  await dbConnect();
  try {
    if (!_id) {
      return null;
    }
    const room: IRoom | null = await Room.findById(_id);
    return JSON.parse(JSON.stringify(room));
  } catch (error: any) {
    console.error(`Error in getRoomById function: ${error.message}`);
    return null;
  }
};

export const createRooom = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const name = formData.get("name")?.toString() || "";
    const roomType = formData.get("room")?.toString() || "";
    const totalSeatsPreferential = parseInt(
      formData.get("totalSeatsPreferential")?.toString() || "0",
    );
    const totalSeatsGeneral = parseInt(
      formData.get("totalSeatsGeneral")?.toString() || "0",
    );

    const fields = {
      name,
      room: roomType,
      totalSeatsPreferential,
      totalSeatsGeneral,
    };

    RoomFormSchema.parse(fields);

    const totalSeats = totalSeatsPreferential + totalSeatsGeneral;
    const room: IRoom | null = await Room.findOne({ name });

    if (room) {
      return {
        status: FormStatus.COMPLETE,
        success: false,
        message: "La sala ya existe",
      };
    }

    await Room.create({ ...fields, totalSeats });
  } catch (error: any) {
    console.error(`Error in createRooom function: ${error.message}`);
    let errorMessage = "Algo salió mal, por favor intentalo nuevamente.";
    if (error instanceof z.ZodError) {
      const { errors } = error;
      errorMessage = errors[0].message;
    }
    return {
      status: FormStatus.COMPLETE,
      success: false,
      message: errorMessage,
    };
  }

  revalidatePath("/dashboard/rooms");
  redirect("/dashboard/rooms");
};

export const updateRoom = async (
  roomId: Schema.Types.ObjectId,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const name = formData.get("name")?.toString() || "";
    const roomType = formData.get("room")?.toString() || "";
    const totalSeatsPreferential = parseInt(
      formData.get("totalSeatsPreferential")?.toString() || "0",
    );
    const totalSeatsGeneral = parseInt(
      formData.get("totalSeatsGeneral")?.toString() || "0",
    );

    const fields = {
      name,
      room: roomType,
      totalSeatsPreferential,
      totalSeatsGeneral,
    };

    RoomFormSchema.parse(fields);

    const totalSeats = totalSeatsPreferential + totalSeatsGeneral;
    const room: IRoom | null = await Room.findById(roomId);
    const isRoomName: IRoom | null = await Room.findOne({ name });

    if (!room) {
      throw new Error("La sala no existe");
    }

    if (isRoomName) {
      throw new Error("El nombre de la sala ya existe");
    }

    await Room.findByIdAndUpdate(room._id, { ...fields, totalSeats });
  } catch (error: any) {
    console.error(`Error in updateRoom function: ${error.message}`);
    let errorMessage =
      error instanceof MongooseError
        ? "Algo salió mal, por favor intentalo nuevamente"
        : error.message;
    if (error instanceof z.ZodError) {
      const { errors } = error;
      errorMessage = errors[0].message;
    }
    return {
      status: FormStatus.COMPLETE,
      success: false,
      message: errorMessage,
    };
  }

  revalidatePath("/dashboard/rooms");
  redirect("/dashboard/rooms");
};

// export const deleteSession = async (
//   _id: string,
//   prevState: FormState,
//   formData: FormData,
// ): Promise<FormState> => {
//   try {
//     await Session.findByIdAndDelete(_id);
//     revalidatePath("/dashboard/invoices");
//     return {
//       status: FormStatus.COMPLETE,
//       success: false,
//       message: "Sessión eliminada con exito.",
//     };
//   } catch (error: any) {
//     console.error(`Error in deleteSession function: ${error.message}`);
//     return {
//       status: FormStatus.COMPLETE,
//       success: false,
//       message: "Algo salió mal, por favor intentalo nuevamente.",
//     };
//   }
// };
