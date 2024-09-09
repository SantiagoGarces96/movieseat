import { IUser } from "@/interfaces/user";
import dbConnect from "@/lib/dbConnect";
import { checkAdminAuthorization } from "@/middleware/checkAdminAuthorization";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authCheck = await checkAdminAuthorization(request);
  if (!authCheck.authorized) return authCheck.response;

  await dbConnect();
  try {
    const users: IUser[] = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password, name, lastName } = await request.json();

    if (!email || !password || !name || !lastName) {
      return new Response("Fields requiered.", {
        status: 400,
      });
    }

    const userExist: IUser | null = await User.findOne({ email });
    if (userExist) {
      return new Response("User already exist.", {
        status: 400,
      });
    }

    await User.create({ email, password, name, lastName });
    return new Response("User created successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response(`message: ${error}`, {
      status: 500,
    });
  }
}
