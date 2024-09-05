import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { IRoom } from "@/interfaces/room";
import Room from "@/models/Room";

export async function GET() {
  await dbConnect();
  try {
    const rooms: IRoom[] = await Room.find({});
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch room." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const roomData = await request.json();
    const newRoom: IRoom | null = await Room.create(roomData);
    return NextResponse.json(newRoom, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create room." },
      { status: 500 },
    );
  }
}
