import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";
import mongoose from "mongoose";
import { ITicket } from "@/interfaces/ticket";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid ticket ID format" },
      { status: 400 },
    );
  }

  try {
    const ticket: ITicket | null = await Ticket.findById(id);
    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve ticket." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid ticket ID format" },
      { status: 400 },
    );
  }

  try {
    const result: ITicket | null = await Ticket.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Ticket deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete ticket." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid ticket ID format" },
      { status: 400 },
    );
  }

  try {
    const updates = await request.json();
    const ticket: ITicket | null = await Ticket.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update ticket." },
      { status: 500 },
    );
  }
}
