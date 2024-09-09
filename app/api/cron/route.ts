import type { NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { getNowPlayingTMDB, getUpcomingTMDB } from "@/lib/TMDB";
import Movie from "@/models/Movie";
import Session from "@/models/Session";
import { NextRequest, NextResponse } from "next/server";

// export default async function handler(req: Request, res: NextApiResponse) {
//   // Verify if the request comes with the correct authorization.
//   if (
//     req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
//   ) {
//     return res.status(401).end("Unauthorized");
//   }

//   await dbConnect();

//   try {
//     await Movie.deleteMany({});
//     await Session.deleteMany({});
//     await getNowPlayingTMDB();
//     await getUpcomingTMDB();

//     console.log("Cron Job Executed !!!");
//     return res.status(200).end("Fullfilled DB with new data.");
//   } catch (error: any) {
//     return res.status(500).end(error.message || "An error occurred");
//   }
// }

export async function GET(req: NextRequest) {
  console.log("Execute cron at: " + new Date());
  return new NextResponse("Cron ran.", { status: 200 });
}
