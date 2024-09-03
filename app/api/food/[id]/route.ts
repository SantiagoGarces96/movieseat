import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Food from "@/models/Food";
import { IFood } from "@/interfaces/food";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;

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
  // TODO imagine if user not send body, what happens?
  const updates = await request.json();

  try {
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
