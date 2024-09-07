import type { NextApiResponse } from "next";
import { IParsedMovie } from "@/interfaces/movie";
import { IDetailMovieListTMDB } from "@/interfaces/TMDB";
import dbConnect from "@/lib/dbConnect";
import { getNowPlayingTMDB, getUpcomingTMDB, parseMovie } from "@/lib/TMDB";
import Movie from "@/models/Movie";

export default async function handler(req: Request, res: NextApiResponse) {
  // Verify if the request comes with the correct authorization.
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).end("Unauthorized");
  }

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
      return res.status(200).json({ message: "Fullfilled DB with new data." });
    }
    console.log("Cron Job Executed !!!");
    return res.status(400).json({ message: "Not found any new movies!" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "An error occurred" });
  }
}
