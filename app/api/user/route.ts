import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users." },
      { status: 500 },
    );
  }
}

// otra manera de hacer el post

// export async function POST(request: Request) {
//   await dbConnect();
//   try {
//     const userData = await request.json();
//     const newUser = new User(userData);
//     await newUser.save();
//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to create user."}, { status: 500 });
//   }
// }

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password, name, lastName } = await request.json();

    if (!email || !password || !name || !lastName) {
      return new Response("Fields requiered.", {
        status: 400,
      });
    }

    const userExist = await User.findOne({ email });
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
