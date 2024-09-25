import dbConnect from "@/lib/dbConnect";
import { updateMoviesStatus } from "@/lib/TMDB";

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
    await updateMoviesStatus();
    console.log("Fullfilled DB with new sessions.");
    return new Response("Fullfilled DB with new sessions.", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error.message || "An error occurred", {
      status: 500,
    });
  }
}
