import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Room from "@/models/Room";
import { IRoom } from "@/interfaces/room";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid room ID format" },
      { status: 400 },
    );
  }

  try {
    const room: IRoom | null = await Room.findById(id);
    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }
    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve room." },
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
      { message: "Invalid room ID format" },
      { status: 400 },
    );
  }

  try {
    const result: IRoom | null = await Room.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Room deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete room." },
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
      { message: "Invalid room ID format" },
      { status: 400 },
    );
  }

  try {
    const updates = await request.json();
    const room: IRoom | null = await Room.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }
    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update room." },
      { status: 500 },
    );
  }
}
