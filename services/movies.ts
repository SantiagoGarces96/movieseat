import { IResultDataDashboard } from "@/interfaces/dasboard";
import dbConnect from "../lib/dbConnect";
import { IMovie } from "@/interfaces/movie";
import Movie from "@/models/Movie";

export const getMoviesByQuery = async (
  query: string,
): Promise<IResultDataDashboard[]> => {
  if (!query) {
    return [];
  }
  await dbConnect();
  try {
    const movies: IMovie[] = await Movie.find({
      $or: [{ title: { $regex: query, $options: "i" } }],
    });
    const parsedMovies: IResultDataDashboard[] = movies.map(
      ({ poster, title }) => {
        return {
          src:
            poster === "N/A"
              ? "https://archivos-cms.cinecolombia.com/images/_aliases/medium/3/4/2/8/8243-6-esl-CO/clasificaci%C3%B3n-de-peliculas.jpg"
              : poster,
          label: title,
        };
      },
    );
    return parsedMovies;
  } catch (error: any) {
    return [];
  }
};
