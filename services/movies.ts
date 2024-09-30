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
  type: string,
  page: string = "1",
  limit: string = "5",
): Promise<IMoviesResponse> => {
  await dbConnect();
  const pageSize = parseInt(limit);
  let movieStatus;
  let sortOption: { [key: string]: 1 | -1 };
  switch (type) {
    case "billboard":
      movieStatus = [MovieStatus.BILLBOARD];
      sortOption = { releaseDate: -1 };
      break;
    case "upcoming":
      movieStatus = [MovieStatus.PRE_SALE, MovieStatus.UPCOMING];
      sortOption = { releaseDate: 1 };
      break;
    default:
      return {
        results: [],
        type,
        page: 1,
        totalPages: 0,
        totalResults: 0,
      };
  }

  try {
    const totalResults = await Movie.countDocuments({
      status: { $in: movieStatus },
    });
    const totalPages = Math.ceil(totalResults / pageSize);

    const pageNumber =
      parseInt(page) < 1
        ? 1
        : parseInt(page) > totalPages
          ? totalPages
          : parseInt(page);
    const skip = (pageNumber - 1) * pageSize;

    const results: IMovie[] = await Movie.find({
      status: { $in: movieStatus },
    })
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    return {
      results,
      type,
      page: pageNumber,
      totalPages,
      totalResults,
    };
  } catch (error: any) {
    return {
      results: [],
      type,
      page: 1,
      totalPages: 0,
      totalResults: 0,
    };
  }
};

export const getAllMovies = async (
  type: string,
  page: string = "1",
  limit: string = "12",
): Promise<IMoviesResponse> => {
  await dbConnect();
  const pageSize = parseInt(limit);
  let movieStatus;
  let sortOption: { [key: string]: 1 | -1 };
  switch (type) {
    case "billboard":
      movieStatus = [MovieStatus.BILLBOARD];
      sortOption = { releaseDate: -1 };
      break;
    case "upcoming":
      movieStatus = [MovieStatus.PRE_SALE, MovieStatus.UPCOMING];
      sortOption = { releaseDate: 1 };
      break;
    default:
      return {
        results: [],
        type,
        page: 1,
        totalPages: 0,
        totalResults: 0,
      };
  }
  try {
    const totalResults = await Movie.countDocuments({
      status: { $in: movieStatus },
    });
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageNumber =
      parseInt(page) < 1
        ? 1
        : parseInt(page) > totalPages
          ? totalPages
          : parseInt(page);
    const skip = (pageNumber - 1) * pageSize;
    const results: IMovie[] = await Movie.find({
      status: { $in: movieStatus },
    })
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);
    return {
      results,
      type,
      page: pageNumber,
      totalPages,
      totalResults,
    };
  } catch (error: any) {
    console.error("Error obteniendo películas:", error);
    return {
      results: [],
      type,
      page: 1,
      totalPages: 0,
      totalResults: 0,
    };
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
