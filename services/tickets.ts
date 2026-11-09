"use server";
import { requireAdmin } from "@/lib/auth";
import { IDailyTicketSales } from "@/interfaces/ticket";
import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";
import { CHART_TIMEZONE, daysAgo, lastDays } from "@/utils/chartDates";
import { IDashboardResponse } from "@/interfaces/dasboard";
import User from "@/models/User";
import { seatLabel } from "@/types/reservation";
import {
  formatDashboardDate,
  pageInfo,
  readTableParams,
} from "@/utils/dashboardQuery";
import { escapeRegex } from "@/utils/escapeRegex";
import { formatPrice } from "@/utils/format";
import { formatShowDate, formatShowTime } from "@/utils/showtime";

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

const buyerFilter = async (search: string) => {
  if (!search) return {};
  const buyers = await User.find(
    { email: { $regex: search, $options: "i" } },
    { _id: 1 },
  ).limit(50);
  return { userId: { $in: buyers.map(({ _id }) => _id) } };
};

export const getTickets = async (
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
    ["code", "movieTitle", "dateTime", "totalPrice", "createdAt"],
  );
  const search = escapeRegex(query.trim());
  try {
    const filter = search
      ? {
          $or: [
            { code: { $regex: search, $options: "i" } },
            { movieTitle: { $regex: search, $options: "i" } },
            await buyerFilter(search),
          ],
        }
      : {};
    const totalResults = await Ticket.countDocuments(filter);
    const info = pageInfo(requestedPage, pageSize, totalResults);
    const tickets = await Ticket.find(filter)
      .sort({ [sortField]: sortOrder, _id: 1 })
      .skip(info.skip)
      .limit(pageSize)
      .populate<{ userId: { email: string } | null }>("userId", "email")
      .lean();
    return {
      results: tickets.map((ticket) => ({
        _id: String(ticket._id),
        code: ticket.code ?? "",
        movieTitle: ticket.movieTitle ?? "",
        room: [ticket.roomName, ticket.roomFormat].filter(Boolean).join(" · "),
        dateTime: ticket.dateTime
          ? `${formatShowDate(ticket.dateTime)}, ${formatShowTime(ticket.dateTime)}`
          : "",
        seats: (ticket.seats ?? []).map(seatLabel).join(", "),
        totalPrice: formatPrice(ticket.totalPrice),
        buyer: ticket.userId?.email ?? "",
        createdAt: formatDashboardDate(ticket.createdAt),
      })),
      page: info.page,
      totalPages: info.totalPages,
      totalResults,
    };
  } catch (error: any) {
    console.error(`Error in getTickets function: ${error.message}`);
    return { results: [], page: 1, totalPages: 0, totalResults: 0 };
  }
};
