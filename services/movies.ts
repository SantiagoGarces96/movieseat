"use server";
import { IResultDataDashboard } from "@/interfaces/dasboard";
import dbConnect from "../lib/dbConnect";
import { IMovie, IMovieByGenre, IMovieByStatus } from "@/interfaces/movie";
import Movie from "@/models/Movie";

export const getAllMovies = async (): Promise<IMovie[]> => {
  await dbConnect();
  try {
    const movies: IMovie[] = await Movie.find({});
    return movies;
  } catch (error: any) {
    return [];
  }
};

export const getMovieById = async (id: string): Promise<IMovie | null> => {
  if (!id) {
    return null;
  }
  await dbConnect();
  try {
    const movie: IMovie | null = await Movie.findById(id);
    return movie;
  } catch (error: any) {
    console.error("Error fetching movie by ID:", error);
    return null;
  }
};

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
      ({ _id, poster, title }) => {
        return {
          src:
            poster === "N/A"
              ? "https://archivos-cms.cinecolombia.com/images/_aliases/medium/3/4/2/8/8243-6-esl-CO/clasificaci%C3%B3n-de-peliculas.jpg"
              : poster,
          label: title,
          href: `/movies/${_id}`,
        };
      },
    );
    return parsedMovies;
  } catch (error: any) {
    return [];
  }
};

export const getMoviesByGenre = async (): Promise<IMovieByGenre[]> => {
  await dbConnect();
  try {
    const movies: IMovieByGenre[] = await Movie.aggregate([
      { $unwind: "$genre" },
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    return movies;
  } catch (error: any) {
    return [];
  }
};

export const getMoviesByStatus = async (): Promise<IMovieByStatus[]> => {
  await dbConnect();
  try {
    const movies: IMovieByStatus[] = await Movie.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    return movies;
  } catch (error: any) {
    return [];
  }
};
