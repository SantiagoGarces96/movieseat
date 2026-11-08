"use server";
import { requireAdmin } from "@/lib/auth";
import { IFoodSells, IMonthlyRevenue } from "@/interfaces/transaction";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import { FoodCategory } from "@/types/food";
import { TransactionStatus } from "@/types/transaction";
import { CHART_TIMEZONE, daysAgo, lastMonths } from "@/utils/chartDates";

const CHART_MONTHS = 12;

const categoryLabel: Record<string, string> = {
  [FoodCategory.FOODS]: "Comidas",
  [FoodCategory.DRINKS]: "Bebidas",
  [FoodCategory.COMBOS]: "Combos",
};

// Unidades vendidas por categoría. Solo cuentan los pagos completados.
export const getFoodSells = async (): Promise<IFoodSells[]> => {
  await requireAdmin();
  await dbConnect();
  try {
    const sells: IFoodSells[] = await Transaction.aggregate([
      { $match: { status: TransactionStatus.COMPLETED } },
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
      { $sort: { total: -1 } },
    ]);
    return sells.map(({ _id, total }) => ({
      _id: categoryLabel[_id] ?? _id,
      total,
    }));
  } catch (error: any) {
    console.error(`Error in getFoodSells function: ${error.message}`);
    return [];
  }
};

// Ingresos de cada uno de los últimos 12 meses, según la hora de Colombia.
export const getMonthlyRevenue = async (): Promise<IMonthlyRevenue[]> => {
  await requireAdmin();
  await dbConnect();
  try {
    const revenue: { _id: string; totalAmount: number }[] =
      await Transaction.aggregate([
        {
          $match: {
            status: TransactionStatus.COMPLETED,
            createdAt: { $gte: daysAgo(31 * CHART_MONTHS) },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m",
                date: "$createdAt",
                timezone: CHART_TIMEZONE,
              },
            },
            totalAmount: { $sum: "$totalAmount" },
          },
        },
      ]);
    const byMonth = new Map(
      revenue.map(({ _id, totalAmount }) => [_id, totalAmount]),
    );
    return lastMonths(CHART_MONTHS).map(({ key, label }) => ({
      _id: label,
      totalAmount: byMonth.get(key) ?? 0,
    }));
  } catch (error: any) {
    console.error(`Error in getMonthlyRevenue function: ${error.message}`);
    return [];
  }
};
