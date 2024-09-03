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

  // TODO please try to keep strecture, in others endpoinds you used other structure.
  /**
    const sessionData = await request.json();
    const newSession = new Session(sessionData);
    await newSession.save();
   */
  try {
    // constants with same structure: foodData
    const data = await request.json();
    // This is other way to insert a data.
    // Is important to create a new interface to return this data.
    const food: IFood = await Food.create(data);
    return NextResponse.json(food, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create food." },
      { status: 400 },
    );
  }
}
