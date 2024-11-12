"use server";
import {
  IDashboardResponse,
  IResultDataDashboard,
} from "@/interfaces/dasboard";
import dbConnect from "../lib/dbConnect";
import { IFood } from "@/interfaces/food";
import Food from "@/models/Food";
import { FoodCategory, FoodSize, FoodType } from "@/types/food";
import { CountResultOpt } from "@/constants/dashboard/table";
import { SortOrder } from "mongoose";
import { FormState, FormStatus } from "@/types/form";
import { FoodFormSchema } from "@/schema/food";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const getFoodByQuery = async (
  query: string,
): Promise<IResultDataDashboard[]> => {
  if (!query) {
    return [];
  }
  await dbConnect();
  try {
    const food: IFood[] = await Food.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });
    const parsedFood: IResultDataDashboard[] = food.map(
      ({ _id, image, name }) => {
        return {
          src: image,
          label: name,
          href: `/dashboard/food/${_id}`,
        };
      },
    );
    return parsedFood;
  } catch (error: any) {
    console.error(`Error in getFoodByQuery function: ${error.message}`);
    return [];
  }
};

export const getFoodById = async (id: string): Promise<IFood | null> => {
  if (!id) {
    return null;
  }
  await dbConnect();
  try {
    const movie: IFood | null = await Food.findById(id);
    return JSON.parse(JSON.stringify(movie));
  } catch (error: any) {
    console.error(`Error in getMovieById function: ${error.message}`);
    return null;
  }
};

export const getFood = async (
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
    const totalResults = await Food.countDocuments({
      $or: [
        { name: { $regex: clearQuery, $options: "i" } },
        { category: { $regex: clearQuery, $options: "i" } },
        { type: { $regex: clearQuery, $options: "i" } },
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

    const results = await Food.find({
      $or: [
        { name: { $regex: clearQuery, $options: "i" } },
        { category: { $regex: clearQuery, $options: "i" } },
        { type: { $regex: clearQuery, $options: "i" } },
      ],
    })
      .sort({ [sortBy]: orderType })
      .skip(skip < 0 ? 0 : skip)
      .limit(pageSize);

    const formattedResults = results.map((result: IFood) => ({
      _id: result._id.toString(),
      nameAndImage:
        result.name +
        "|" +
        result.image +
        "|" +
        result.category +
        "|" +
        result.type,
      description: result.description,
      price: result.price.toString(),
      size: result.size.toString(),
      availableAmount: result.availableAmount.toString(),
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

export const getFoodsByCategory = async (
  category: FoodCategory,
): Promise<IFood[]> => {
  if (!category) {
    return [];
  }
  await dbConnect();
  try {
    const foods: IFood[] = await Food.find({
      category: category,
    });

    return foods;
  } catch (error: any) {
    console.error(`Error in getFoodsByCategory function: ${error.message}`);
    return [];
  }
};

export const createFood = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const name = formData.get("name")?.toString().trim() || "";
    const image = formData.get("image")?.toString().trim() || "";
    const description = formData.get("description")?.toString().trim() || "";
    const size = formData.get("size")?.toString().trim() || FoodSize.SMALL;
    const category =
      formData.get("category")?.toString().trim() || FoodCategory.FOODS;
    const type = formData.get("type")?.toString().trim() || FoodType.POPCORN;
    const price = parseInt(formData.get("price")?.toString().trim() || "0");
    const availableAmount = parseInt(
      formData.get("availableAmount")?.toString().trim() || "0",
    );

    console.log(image);

    const fields = {
      name,
      image,
      description,
      size,
      price,
      category,
      type,
      availableAmount,
    };

    FoodFormSchema.parse(fields);

    const food: IFood | null = await Food.findOne({ name });

    if (food) {
      return {
        status: FormStatus.COMPLETE,
        success: false,
        message: "La comida ya existe",
      };
    }

    await Food.create(fields);
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

  revalidatePath("/dashboard/food");
  redirect("/dashboard/food");
};

// export const updateRoom = async (
//   roomId: Schema.Types.ObjectId,
//   prevState: FormState,
//   formData: FormData,
// ): Promise<FormState> => {
//   try {
//     const name = formData.get("name")?.toString().trim() || "";
//     const roomType = formData.get("room")?.toString().trim() || "";
//     const totalSeatsPreferential = parseInt(
//       formData.get("totalSeatsPreferential")?.toString().trim() || "0",
//     );
//     const totalSeatsGeneral = parseInt(
//       formData.get("totalSeatsGeneral")?.toString().trim() || "0",
//     );

//     const fields = {
//       name,
//       room: roomType,
//       totalSeatsPreferential,
//       totalSeatsGeneral,
//     };

//     RoomFormSchema.parse(fields);

//     const totalSeats = totalSeatsPreferential + totalSeatsGeneral;
//     const room: IRoom | null = await Room.findById(roomId);
//     const isRoomName: IRoom | null = await Room.findOne({ name });

//     if (!room) {
//       return {
//         status: FormStatus.COMPLETE,
//         success: false,
//         message: "La sala no existe",
//       };
//     }

//     if (isRoomName) {
//       return {
//         status: FormStatus.COMPLETE,
//         success: false,
//         message: "El nombre de la sala ya existe",
//       };
//     }

//     await Room.findByIdAndUpdate(room._id, { ...fields, totalSeats });
//   } catch (error: any) {
//     console.error(`Error in updateRoom function: ${error.message}`);
//     let errorMessage = "Algo salió mal, por favor intentalo nuevamente";
//     if (error instanceof z.ZodError) {
//       const { errors } = error;
//       errorMessage = errors[0].message;
//     }
//     return {
//       status: FormStatus.COMPLETE,
//       success: false,
//       message: errorMessage,
//     };
//   }

//   revalidatePath("/dashboard/rooms");
//   redirect("/dashboard/rooms");
// };

// export const deleteRoom = async (
//   _id: string,
//   prevState: FormState,
//   formData: FormData,
// ): Promise<FormState> => {
//   try {
//     await Room.findByIdAndDelete(_id);
//     revalidatePath("/dashboard/rooms");
//     return {
//       status: FormStatus.COMPLETE,
//       success: false,
//       message: "Room eliminada con exito.",
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
