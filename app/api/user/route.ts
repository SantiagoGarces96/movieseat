import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

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
