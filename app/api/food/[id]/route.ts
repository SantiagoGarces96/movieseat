import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Food from "@/models/Food";
import { IFood } from "@/interfaces/food";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid movie ID format" },
      { status: 400 },
    );
  }

  try {
    const food: IFood | null = await Food.findById(id);
    if (!food) {
      return NextResponse.json({ message: "Food not found" }, { status: 404 });
    }
    return NextResponse.json(food, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve food." },
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
      { message: "Invalid movie ID format" },
      { status: 400 },
    );
  }

  try {
    const result: IFood | null = await Food.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: "Food not found" }, { status: 404 });
    }
    return NextResponse.json(
      { result, message: "Food deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete food." },
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
      { message: "Invalid movie ID format" },
      { status: 400 },
    );
  }

  try {
    const updates = await request.json();
    const food: IFood | null = await Food.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!food) {
      return NextResponse.json({ message: "Food not found" }, { status: 404 });
    }
    return NextResponse.json(food, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update food." },
      { status: 500 },
    );
  }
}
