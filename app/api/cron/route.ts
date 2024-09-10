import dbConnect from "@/lib/dbConnect";
import { getNowPlayingTMDB, getUpcomingTMDB } from "@/lib/TMDB";
import Movie from "@/models/Movie";
import Session from "@/models/Session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("Execute cron at: ", new Date());
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await dbConnect();
    await Movie.deleteMany({});
    await Session.deleteMany({});
    await getNowPlayingTMDB();
    await getUpcomingTMDB();

    return new NextResponse("Fullfilled DB with new data.", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message || "An error occurred", {
      status: 500,
    });
  }
}
