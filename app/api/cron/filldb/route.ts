import { isCronRequest } from "@/lib/cron";
import dbConnect from "@/lib/dbConnect";
import { getNowPlayingTMDB, getUpcomingTMDB } from "@/lib/TMDB";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isCronRequest(request)) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  try {
    await dbConnect();
    await getNowPlayingTMDB();
    await getUpcomingTMDB();
    console.log("Movies updated from TMDB.");
    return new Response("Movies updated from TMDB.", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error.message || "An error occurred", {
      status: 500,
    });
  }
}
