import { IParsedMovie } from "@/interfaces/movie";
import { IDetailMovieListTMDB } from "@/interfaces/TMDB";
import dbConnect from "@/lib/dbConnect";
import { getNowPlayingTMDB, getUpcomingTMDB, parseMovie } from "@/lib/TMDB";

export async function POST() {
  await dbConnect();
  try {
    const nowPlaying: IDetailMovieListTMDB[] = await getNowPlayingTMDB();
    const parseNowPlaying: IParsedMovie[] = await parseMovie(nowPlaying);

    const upcoming: IDetailMovieListTMDB[] = await getUpcomingTMDB();
    const parseUpcoming: IParsedMovie[] = await parseMovie(upcoming);

    const moviesDetail: IParsedMovie[] = [...parseNowPlaying, ...parseUpcoming];

    return Response.json({ message: "Fullfilled DB", moviesDetail });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: error.message || "An error occurred" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
