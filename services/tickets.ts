"use server";
import { requireAdmin } from "@/lib/auth";
import { IDailyTicketSales } from "@/interfaces/ticket";
import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";
import { CHART_TIMEZONE, daysAgo, lastDays } from "@/utils/chartDates";

const CHART_DAYS = 30;

// Boletas vendidas en cada uno de los últimos 30 días, según la hora de Colombia.
export const getDailyTicketSales = async (): Promise<IDailyTicketSales[]> => {
  await requireAdmin();
  await dbConnect();
  try {
    const sales: { _id: string; ticketsSold: number }[] =
      await Ticket.aggregate([
        { $match: { createdAt: { $gte: daysAgo(CHART_DAYS) } } },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: CHART_TIMEZONE,
              },
            },
            ticketsSold: { $sum: "$quantity" },
          },
        },
      ]);
    const byDay = new Map(
      sales.map(({ _id, ticketsSold }) => [_id, ticketsSold]),
    );
    return lastDays(CHART_DAYS).map(({ key, label }) => ({
      _id: label,
      ticketsSold: byDay.get(key) ?? 0,
    }));
  } catch (error: any) {
    console.error(`Error in getDailyTicketSales function: ${error.message}`);
    return [];
  }
};
