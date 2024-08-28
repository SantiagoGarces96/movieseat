import { IParsedMovie } from "@/interfaces/movie";
import { IDetailMovieListTMDB } from "@/interfaces/TMDB";
import dbConnect from "@/lib/dbConnect";
import { getNowPlayingTMDB, getUpcomingTMDB, parseMovie } from "@/lib/TMDB";
import Movie from "@/models/Movie";

export async function POST() {
  await dbConnect();
  try {
    const nowPlaying: IDetailMovieListTMDB[] = await getNowPlayingTMDB();
    const parseNowPlaying: IParsedMovie[] = await parseMovie(nowPlaying);

    const upcoming: IDetailMovieListTMDB[] = await getUpcomingTMDB();
    const parseUpcoming: IParsedMovie[] = await parseMovie(upcoming);

    const moviesDetail: IParsedMovie[] = [...parseNowPlaying, ...parseUpcoming];

    if (moviesDetail.length) {
      await Movie.deleteMany({});
      await Movie.insertMany(moviesDetail);
      return Response.json({ message: "Fullfilled DB with new data." });
    }

    return new Response(
      JSON.stringify({ message: "Not found any new movies!" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
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
