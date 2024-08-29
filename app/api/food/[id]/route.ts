import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Food from "@/models/Food";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;

  try {
    const food = await Food.findById(id);
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

  try {
    const result = await Food.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: "Food not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Food deleted successfully" },
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
  const updates = await request.json();

  try {
    const food = await Food.findByIdAndUpdate(id, updates, { new: true });
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
