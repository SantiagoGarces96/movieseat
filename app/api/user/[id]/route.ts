import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { hashPassword } from "@/utils/bcrypt";
import { IUser } from "@/interfaces/user";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid user ID format" },
      { status: 400 },
    );
  }

  try {
    const user: IUser | null = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve user." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid user ID format" },
      { status: 400 },
    );
  }

  try {
    const result: IUser | null = await User.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete user." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid user ID format" },
      { status: 400 },
    );
  }

  try {
    const updates = await request.json();
    if (updates.password) {
      updates.password = await hashPassword(updates.password);
    }

    const user: IUser | null = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user." },
      { status: 500 },
    );
  }
}
