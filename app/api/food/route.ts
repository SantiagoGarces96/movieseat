import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Food from "@/models/Food";
import { IFood } from "@/interfaces/food";

export async function GET() {
  await dbConnect();
  try {
    const foods: IFood[] = await Food.find({});
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
    const foodData = await request.json();
    const food: IFood = await Food.create(foodData);
    return NextResponse.json(food, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create food." },
      { status: 400 },
    );
  }
}
