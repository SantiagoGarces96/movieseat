"use server";
import {
  IDashboardResponse,
  IResultDataDashboard,
} from "@/interfaces/dasboard";
import dbConnect from "../lib/dbConnect";
import {
  IMovie,
  IMovieByGenre,
  IMovieByStatus,
  IMoviesResponse,
} from "@/interfaces/movie";
import Movie from "@/models/Movie";
import { MovieStatus } from "@/types/movie";
import { CountResultOpt } from "@/constants/dashboard/table";
import { SortOrder } from "mongoose";

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
      .skip(skip < 0 ? 0 : skip + 1)
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

export const getMoviesInDashboard = async (
  page: string = "1",
  limit: string = CountResultOpt[1].toString(),
  query: string = "",
  sortBy: string = "createdAt",
  order: string = "",
): Promise<IDashboardResponse> => {
  await dbConnect();
  const pageSize = CountResultOpt.reduce((prev, curr) =>
    Math.abs(curr - parseInt(limit)) < Math.abs(prev - parseInt(limit))
      ? curr
      : prev,
  );
  const orderType: SortOrder = order === "desc" ? -1 : 1;
  const clearQuery = query.trim();

  try {
    const totalResults = await Movie.countDocuments({
      $or: [
        { title: { $regex: clearQuery, $options: "i" } },
        { genre: { $regex: clearQuery, $options: "i" } },
        { director: { $regex: clearQuery, $options: "i" } },
        { status: { $regex: clearQuery, $options: "i" } },
      ],
    });

    const totalPages = Math.ceil(totalResults / pageSize);

    const pageNumber =
      parseInt(page) < 1
        ? 1
        : parseInt(page) > totalPages
          ? totalPages
          : parseInt(page);
    const skip = (pageNumber - 1) * pageSize;

    const results = await Movie.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: clearQuery, $options: "i" } },
            { genre: { $regex: clearQuery, $options: "i" } },
            { director: { $regex: clearQuery, $options: "i" } },
            { status: { $regex: clearQuery, $options: "i" } },
          ],
        },
      },
      {
        $sort: {
          [sortBy]: orderType,
        },
      },
      {
        $skip: skip < 0 ? 0 : skip,
      },
      {
        $limit: pageSize,
      },
      {
        $project: {
          _id: { $toString: "$_id" },
          titleAndPoster: {
            $concat: [
              { $toString: "$title" },
              "|",
              { $toString: "$poster" },
              "|",
              {
                $reduce: {
                  input: "$genre",
                  initialValue: "",
                  in: {
                    $cond: {
                      if: { $eq: ["$$value", ""] },
                      then: "$$this",
                      else: { $concat: ["$$value", " - ", "$$this"] },
                    },
                  },
                },
              },
            ],
          },
          description: { $toString: "$description" },
          status: {
            $switch: {
              branches: [
                { case: { $eq: ["$status", "billboard"] }, then: "Cartelera" },
                { case: { $eq: ["$status", "pre-sale"] }, then: "Preventa" },
                {
                  case: { $eq: ["$status", "upcoming"] },
                  then: "Próximamente",
                },
              ],
              default: "Archivada",
            },
          },
          director: { $toString: "$director" },
          duration: {
            $cond: {
              if: { $eq: ["$duration", 0] },
              then: "-",
              else: { $concat: [{ $toString: "$duration" }, " Min."] },
            },
          },
          releaseDate: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M:%S",
              date: "$releaseDate",
            },
          },
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          updatedAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" },
          },
        },
      },
    ]);

    return {
      results,
      page: pageNumber,
      totalPages,
      totalResults,
    };
  } catch (error: any) {
    console.error(`Error in getMoviesInDashboard function: ${error.message}`);
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
