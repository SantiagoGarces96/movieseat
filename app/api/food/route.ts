import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Food from "@/models/Food";

export async function GET() {
  await dbConnect();

  try {
    const foods = await Food.find({});
    return NextResponse.json(foods, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve foods." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const data = await request.json();
    const food = await Food.create(data);
    return NextResponse.json(food, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create food." },
      { status: 400 },
    );
  }
}
