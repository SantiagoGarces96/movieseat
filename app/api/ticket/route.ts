import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";
import { ITicket } from "@/interfaces/ticket";

export async function GET() {
  await dbConnect();
  try {
    const tickets: ITicket[] = await Ticket.find({});
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch tickets." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const ticketData = await request.json();
    const newTicket: ITicket | null = await Ticket.create(ticketData);
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create ticket." },
      { status: 500 },
    );
  }
}
