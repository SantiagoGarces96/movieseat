"use server";
import { IFoodSells, IMonthlyRevenue } from "@/interfaces/transaction";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";

export const getFoodSells = async (): Promise<IFoodSells[]> => {
  await dbConnect();
  try {
    const sells: IFoodSells[] = await Transaction.aggregate([
      { $unwind: "$foodItems" },
      {
        $lookup: {
          from: "foods",
          localField: "foodItems",
          foreignField: "_id",
          as: "food",
        },
      },
      { $unwind: "$food" },
      { $group: { _id: "$food.category", total: { $sum: 1 } } },
    ]);
    return sells;
  } catch (error: any) {
    console.error(`Error in getFoodSells function: ${error.message}`);
    return [];
  }
};

export const getMonthlyRevenue = async (): Promise<IMonthlyRevenue[]> => {
  await dbConnect();
  try {
    const monthlyRevenue: IMonthlyRevenue[] = await Transaction.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    return monthlyRevenue;
  } catch (error: any) {
    console.error(`Error in getMonthlyRevenue function: ${error.message}`);
    return [];
  }
};
