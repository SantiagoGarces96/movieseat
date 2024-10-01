"use server";
import { IDailyTicketSales } from "@/interfaces/ticket";
import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";

export const getDailyTicketSales = async (): Promise<IDailyTicketSales[]> => {
  await dbConnect();
  try {
    const dailyTicketSales: IDailyTicketSales[] = await Ticket.aggregate([
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          ticketsSold: { $sum: "$quantity" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    return dailyTicketSales;
  } catch (error: any) {
    console.error(`Error in getDailyTicketSales function: ${error.message}`);
    return [];
  }
};
