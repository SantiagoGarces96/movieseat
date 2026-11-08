"use server";
import { requireAdmin } from "@/lib/auth";
import { IFoodSells, IMonthlyRevenue } from "@/interfaces/transaction";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import { FoodCategory } from "@/types/food";
import { TransactionStatus } from "@/types/transaction";
import { CHART_TIMEZONE, daysAgo, lastMonths } from "@/utils/chartDates";
import { IDashboardResponse } from "@/interfaces/dasboard";
import User from "@/models/User";
import {
  formatDashboardDate,
  pageInfo,
  readTableParams,
} from "@/utils/dashboardQuery";
import { escapeRegex } from "@/utils/escapeRegex";
import { formatPrice } from "@/utils/format";

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

interface TransactionRow {
  _id: unknown;
  paymentReference?: string;
  userId: { email: string } | null;
  ticketId: { code?: string } | null;
  totalAmount: number;
  paymentMethod?: string;
  status: TransactionStatus;
  createdAt: Date;
}

const statusLabel: Record<TransactionStatus, string> = {
  [TransactionStatus.COMPLETED]: "Completada",
  [TransactionStatus.PENDING]: "Pendiente",
  [TransactionStatus.CANCELLED]: "Cancelada",
};

export const getTransactions = async (
  page: string,
  limit: string,
  query: string,
  sortBy: string,
  order: string,
): Promise<IDashboardResponse> => {
  await requireAdmin();
  await dbConnect();
  const { pageSize, requestedPage, sortField, sortOrder } = readTableParams(
    { page, limit, sortBy, order },
    ["paymentReference", "totalAmount", "status", "createdAt"],
  );
  const search = escapeRegex(query.trim());
  try {
    const buyers = search
      ? await User.find(
          { email: { $regex: search, $options: "i" } },
          { _id: 1 },
        ).limit(50)
      : [];
    const filter = search
      ? {
          $or: [
            { paymentReference: { $regex: search, $options: "i" } },
            { userId: { $in: buyers.map(({ _id }) => _id) } },
          ],
        }
      : {};
    const totalResults = await Transaction.countDocuments(filter);
    const info = pageInfo(requestedPage, pageSize, totalResults);
    const transactions = await Transaction.find(filter)
      .sort({ [sortField]: sortOrder, _id: 1 })
      .skip(info.skip)
      .limit(pageSize)
      .populate("userId", "email")
      .populate("ticketId", "code")
      .lean<TransactionRow[]>();
    return {
      results: transactions.map((transaction) => ({
        _id: String(transaction._id),
        paymentReference: transaction.paymentReference ?? "",
        buyer: transaction.userId?.email ?? "",
        ticket: transaction.ticketId?.code ?? "",
        totalAmount: formatPrice(transaction.totalAmount),
        paymentMethod:
          transaction.paymentMethod === "stripe"
            ? "Stripe (prueba)"
            : (transaction.paymentMethod ?? ""),
        status: statusLabel[transaction.status] ?? transaction.status,
        createdAt: formatDashboardDate(transaction.createdAt),
      })),
      page: info.page,
      totalPages: info.totalPages,
      totalResults,
    };
  } catch (error: any) {
    console.error(`Error in getTransactions function: ${error.message}`);
    return { results: [], page: 1, totalPages: 0, totalResults: 0 };
  }
};
