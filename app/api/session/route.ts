import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Session from "@/models/Session";

export async function GET() {
  await dbConnect();
  try {
    const sessions = await Session.find({});
    return NextResponse.json(sessions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch sessions." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const sessionData = await request.json();
    const newSession = new Session(sessionData);
    await newSession.save();
    return NextResponse.json(newSession, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create session." },
      { status: 500 },
    );
  }
}
