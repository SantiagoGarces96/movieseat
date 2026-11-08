import { isCronRequest } from "@/lib/cron";
import dbConnect from "@/lib/dbConnect";
import { updateMoviesStatus } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isCronRequest(request)) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  try {
    await dbConnect();
    await updateMoviesStatus();
    console.log("Billboard and showtimes updated.");
    return new Response("Billboard and showtimes updated.", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error.message || "An error occurred", {
      status: 500,
    });
  }
}
