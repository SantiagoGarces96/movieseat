import dbConnect from "@/lib/dbConnect";
import {
  getNowPlayingTMDB,
  getUpcomingTMDB,
  updateMoviesStatus,
} from "@/lib/TMDB";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  try {
    await dbConnect();
    await getNowPlayingTMDB();
    await getUpcomingTMDB();
    await updateMoviesStatus();
    return new Response("Fullfilled DB with new data.", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error.message || "An error occurred", {
      status: 500,
    });
  }
}
