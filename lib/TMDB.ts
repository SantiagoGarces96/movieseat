import { TMDB_API_URL } from "@/constants";
import { IParsedMovie } from "@/interfaces/movie";
import { IDetailMovieListTMDB, IMovieDetailTMDB } from "@/interfaces/TMDB";
import axios from "axios";
import { sleep } from "@/utils/sleep";
import { MovieStatus } from "@/types/movie";
import {
  SessionPrice,
  SessionPriceAfternoon,
  SessionRoom,
} from "@/types/session";
import { SeatType } from "@/types/room";
import Movie from "@/models/Movie";

const getColombianList = async (
  list: "now_playing" | "upcoming",
): Promise<IDetailMovieListTMDB[]> => {
  const { data } = await axios.get(
    `${TMDB_API_URL}/${list}?language=es-MX&region=CO&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    },
  );
  return data.results;
};

export const getNowPlayingTMDB = async (): Promise<void> => {
  try {
    await parseMovie(await getColombianList("now_playing"), true);
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const getUpcomingTMDB = async (): Promise<void> => {
  try {
    await parseMovie(await getColombianList("upcoming"), false);
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

const isNonLatin = (text: string) => /[^\u0000-\u00ff]/.test(text);

export const getMovieDetailTMDB = async (
  movie_id: number,
): Promise<IMovieDetailTMDB> => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    };

    let response = await axios.get(
      `${TMDB_API_URL}/${movie_id}?append_to_response=credits,videos&language=es-MX`,
      options,
    );
    let data = response.data as IMovieDetailTMDB;

    let Video = data.videos.results.find(
      (video) => video.type === "Trailer" || video.type === "Teaser",
    );

    // Si no hay trailer en español, buscar en inglés
    if (!Video || !data.overview || isNonLatin(data.title)) {
      response = await axios.get(
        `${TMDB_API_URL}/${movie_id}?append_to_response=videos&language=en-US`,
        options,
      );
      const dataEN = response.data as IMovieDetailTMDB;

      Video =
        Video ||
        dataEN.videos.results.find(
          (video) => video.type === "Trailer" || video.type === "Teaser",
        );

      if (!data.overview) {
        data.overview = dataEN.overview;
      }
      if (isNonLatin(data.title)) {
        data.title = dataEN.title;
      }
    }

    if (!Video || !data.overview) {
      const language = data.spoken_languages
        .map(({ iso_639_1 }) => iso_639_1)
        .join(",");
      response = await axios.get(
        `${TMDB_API_URL}/${movie_id}?append_to_response=credits,videos&language=${language}`,
        options,
      );
      const dataDefault = response.data as IMovieDetailTMDB;

      Video =
        Video ||
        dataDefault.videos.results.find(
          (video) => video.type === "Trailer" || video.type === "Teaser",
        );

      if (!data.overview) {
        data.overview = dataDefault.overview;
      }
    }

    data.videos.results = Video ? [Video] : [];

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const getMovieStatus = (releaseDate: string): MovieStatus => {
  const today = new Date();
  const release = new Date(releaseDate + "T00:00:00");
  const todayPlus8 = new Date(today);
  todayPlus8.setDate(today.getDate() + 8);

  if (release > todayPlus8) {
    return MovieStatus.UPCOMING;
  } else if (release > today && release <= todayPlus8) {
    return MovieStatus.PRE_SALE;
  } else if (today.getTime() - release.getTime() <= 120 * 24 * 60 * 60 * 1000) {
    return MovieStatus.BILLBOARD;
  } else {
    return MovieStatus.ARCHIVED;
  }
};

const calculateSessionPrice = (
  roomType: SessionRoom,
  seatType: SeatType,
  multiplier: number = 1,
): number => {
  switch (roomType) {
    case SessionRoom["2D"]:
      return seatType === SeatType.GENERAL
        ? SessionPrice.G_2D * multiplier
        : SessionPrice.P_2D * multiplier;
    case SessionRoom["3D"]:
      return seatType === SeatType.GENERAL
        ? SessionPrice.G_3D * multiplier
        : SessionPrice.P_3D * multiplier;
    default:
      return seatType === SeatType.GENERAL
        ? SessionPrice.G_IMAX * multiplier
        : SessionPrice.P_IMAX * multiplier;
  }
};

export const calculatePrice = (
  seatType: SeatType,
  roomType: SessionRoom,
  sessionDateTime: Date,
  movieStatus: MovieStatus,
): number => {
  const START_AFTERNOON = new Date("1970-01-01T13:00:00Z").getTime();
  if (movieStatus === MovieStatus.PRE_SALE) {
    if (sessionDateTime.getTime() <= START_AFTERNOON) {
      return calculateSessionPrice(roomType, seatType, 2);
    }
    return calculateSessionPrice(
      roomType,
      seatType,
      SessionPriceAfternoon.PRE_SALE,
    );
  }
  if (sessionDateTime.getTime() <= START_AFTERNOON) {
    return calculateSessionPrice(roomType, seatType);
  }
  return calculateSessionPrice(
    roomType,
    seatType,
    SessionPriceAfternoon.BILLBOARD,
  );
};

// La fecha de la lista ya es la de Colombia cuando se consulta con region=CO.
export const parseMovie = async (
  moviesData: IDetailMovieListTMDB[],
  playingInColombia: boolean,
): Promise<void> => {
  for (const movie of moviesData) {
    try {
      const status = getMovieStatus(movie.release_date);
      if (status === MovieStatus.ARCHIVED || !movie.poster_path) {
        continue;
      }

      const releaseDate = new Date(movie.release_date + "T00:00:00");
      const syncFields = {
        popularity: movie.popularity,
        releaseDate,
        ...(playingInColombia ? { lastSeenInColombia: new Date() } : {}),
      };

      const updated = await Movie.updateOne({ imdb_id: movie.id }, syncFields);
      if (updated.matchedCount > 0) {
        continue;
      }

      const dataTMDB: IMovieDetailTMDB = await getMovieDetailTMDB(movie.id);
      const director =
        dataTMDB.credits.crew.find(
          (crewMember) => crewMember.job === "Director",
        )?.original_name || "";
      const youtubeId =
        dataTMDB.videos.results.find(
          (video) => video.type === "Trailer" || video.type === "Teaser",
        )?.key || "";

      const parsedMovie: IParsedMovie = {
        imdb_id: dataTMDB.id,
        title: dataTMDB.title,
        backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`,
        description: dataTMDB.overview || "",
        releaseDate,
        duration: dataTMDB.runtime,
        genre: dataTMDB.genres.map(({ name }) => name),
        director,
        cast: dataTMDB.credits.cast.map(({ original_name }) => original_name),
        language: dataTMDB.spoken_languages.map(
          ({ english_name }) => english_name,
        ),
        trailer: youtubeId
          ? `https://www.youtube.com/watch?v=${youtubeId}`
          : "",
        poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        status,
        popularity: movie.popularity,
        ...(playingInColombia ? { lastSeenInColombia: new Date() } : {}),
      };
      await Movie.create(parsedMovie);
      await sleep(100);
    } catch (error: any) {
      // Una película con datos incompletos no debe detener a las demás.
      console.error(`Error syncing movie ${movie.id}: ${error.message}`);
    }
  }
};
