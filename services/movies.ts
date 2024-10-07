"use server";
import { IResultDataDashboard } from "@/interfaces/dasboard";
import dbConnect from "../lib/dbConnect";
import {
  IMovie,
  IMovieByGenre,
  IMovieByStatus,
  IMoviesResponse,
} from "@/interfaces/movie";
import Movie from "@/models/Movie";
import { MovieStatus } from "@/types/movie";

export const getMovies = async (
  type?: MovieStatus,
  page: string = "1",
  limit: string = "5",
): Promise<IMoviesResponse> => {
  await dbConnect();
  const pageSize = parseInt(limit);
  let query: {
    status?: { $in?: MovieStatus[]; $exists?: boolean };
  };
  switch (type) {
    case MovieStatus.BILLBOARD:
      query = { status: { $in: [MovieStatus.BILLBOARD] } };
      break;
    case MovieStatus.UPCOMING:
      query = {
        status: { $in: [MovieStatus.PRE_SALE, MovieStatus.UPCOMING] },
      };
      break;
    default:
      query = {};
      break;
  }

  try {
    const totalResults = await Movie.countDocuments(query);
    const totalPages = Math.ceil(totalResults / pageSize);

    const pageNumber =
      parseInt(page) < 1
        ? 1
        : parseInt(page) > totalPages
          ? totalPages
          : parseInt(page);
    const skip = (pageNumber - 1) * pageSize;

    const results: IMovie[] = await Movie.find(query)
      .sort({ releaseDate: type === MovieStatus.BILLBOARD ? -1 : 1 })
      .skip(skip < 0 ? 0 : skip)
      .limit(pageSize);

    return {
      results,
      page: pageNumber,
      totalPages,
      totalResults,
    };
  } catch (error: any) {
    console.error(`Error in getMovies function: ${error.message}`);
    return {
      results: [],
      page: 1,
      totalPages: 0,
      totalResults: 0,
    };
  }
};

export const getAllMovies = async (): Promise<IMovie[]> => {
  await dbConnect();
  try {
    const movie: IMovie[] = await Movie.find().sort({ title: 1 });
    return movie;
  } catch (error: any) {
    console.error(`Error in getAllMovies function: ${error.message}`);
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
    console.error(`Error in getMovieById function: ${error.message}`);
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
    console.error(`Error in getMoviesByQuery function: ${error.message}`);
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
    console.error(`Error in getMoviesByGenre function: ${error.message}`);
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
    console.error(`Error in getMoviesByStatus function: ${error.message}`);
    return [];
  }
};
