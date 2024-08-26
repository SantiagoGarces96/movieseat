import { TMDB_API_URL } from "@/constants";
import dbConnect from "@/lib/dbConnect";
import { getNowPlaying, getUpcoming } from "@/lib/TMDB";
import User from "@/models/User";
import axios from "axios";

export async function POST() {
  try {
    const nowPlaying = await getNowPlaying();
    const upcoming = await getUpcoming();
    return Response.json({ nowPlaying, upcoming });
  } catch (error) {
    return new Response(`message: ${error}`, {
      status: 500,
    });
  }
  // try {
  //   await dbConnect();
  //   const { email, password, name, lastName } = await request.json();

  //   if (!email || !password || !name || !lastName) {
  //     return new Response("Fields requiered.", {
  //       status: 400,
  //     });
  //   }

  //   const userExist = await User.findOne({ email });
  //   if (userExist) {
  //     return new Response("User already exist.", {
  //       status: 400,
  //     });
  //   }

  //   await User.create({ email, password, name, lastName });
  //   return new Response("User created successfully", {
  //     status: 200,
  //   });
  // } catch (error) {
  //   return new Response(`message: ${error}`, {
  //     status: 500,
  //   });
  // }
}
