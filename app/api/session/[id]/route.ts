import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Session from "@/models/Session";
import { ISession } from "@/interfaces/session";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid session ID format" },
      { status: 400 },
    );
  }

  try {
    const session: ISession | null = await Session.findById(id);
    if (!session) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve session." },
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
      { message: "Invalid session ID format" },
      { status: 400 },
    );
  }

  try {
    const result: ISession | null = await Session.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Session deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete session." },
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
      { message: "Invalid session ID format" },
      { status: 400 },
    );
  }

  try {
    const updates = await request.json();
    const session: ISession | null = await Session.findByIdAndUpdate(
      id,
      updates,
      { new: true },
    );
    if (!session) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update session." },
      { status: 500 },
    );
  }
}
