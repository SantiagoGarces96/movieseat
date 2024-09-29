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

export const getAllMovies = async (): Promise<IMovie[]> => {
  await dbConnect();
  try {
    const movies: IMovie[] = await Movie.find({});
    return movies;
  } catch (error: any) {
    return [];
  }
};

export const getBillboardMovies = async (
  type: string = "billboard",
  page: string = "1",
  limit: string = "5",
): Promise<IMoviesResponse> => {
  await dbConnect();
  const pageSize = parseInt(limit);
  let movieStatus;

  if (type === "billboard") {
    movieStatus = MovieStatus.BILLBOARD;
  } else {
    throw new Error("Tipo de película no válido para billboard");
  }

  try {
    const totalResults = await Movie.countDocuments({
      status: { $in: [movieStatus] },
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
      status: { $in: [movieStatus] },
    })
      .sort({ releaseDate: -1 })
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

export const getUpcomingMovies = async (
  type: string = "upcoming",
  page: string = "1",
  limit: string = "5",
): Promise<IMoviesResponse> => {
  await dbConnect();
  const pageSize = parseInt(limit);
  let movieStatus;

  if (type === "upcoming") {
    movieStatus = [MovieStatus.PRE_SALE, MovieStatus.UPCOMING];
  } else {
    throw new Error("Tipo de película no válido para upcoming");
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
      .sort({ releaseDate: 1 })
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

export const getReleasesMovies = async (
  type: string = "releases",
  page: string = "1",
  limit: string = "12",
): Promise<IMoviesResponse> => {
  await dbConnect();
  const pageSize = parseInt(limit);
  let movieStatus;

  if (type === "releases") {
    movieStatus = MovieStatus.BILLBOARD;
  } else {
    throw new Error("Tipo de película no válido para releases");
  }

  try {
    const totalResults = await Movie.countDocuments({
      status: { $in: [movieStatus] },
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
      status: { $in: [movieStatus] },
    })
      .sort({ releaseDate: -1 })
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
    console.error("Error obteniendo películas de releases:", error);
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
