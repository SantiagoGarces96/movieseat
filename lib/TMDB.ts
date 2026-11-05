import { TMDB_API_URL, TMDB_API_URL_2 } from "@/constants";
import { IMovie, IParsedMovie } from "@/interfaces/movie";
import { IDetailMovieListTMDB, IMovieDetailTMDB } from "@/interfaces/TMDB";
import axios from "axios";
import { sleep } from "@/utils/sleep";
import { MovieStatus } from "@/types/movie";
import { calculateDates } from "@/utils/calculateDays";
import { calculateDatesBillboard } from "@/utils/calculateDaysBillboard";
import {
  SessionPrice,
  SessionPriceAfternoon,
  SessionRoom,
} from "@/types/session";
import { SeatType } from "@/types/room";
import Movie from "@/models/Movie";

export const getNowPlayingTMDB = async (): Promise<void> => {
  const { startDate, endDate } = calculateDatesBillboard();
  try {
    const options = {
      url: `${TMDB_API_URL_2}/movie?include_adult=false&include_video=true&language=es-MX&page=1&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&region=MX&sort_by=popularity.desc&without_companies=4022%2C376%2C1302%2C235327%2C91505%2C3491%2C115960%2C30148%2C221665%2C14714%2C233618%2C21546%2C234649%2C90733%2C160071%2C22842%2C52270%2C210099%2C149142%2C2073%2C1976%2C4%2C127541%2C7764%2C202798%2C167711%2C235330%2C112425%2C10039%2C`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    };

    const { data } = await axios.request(options);
    await parseMovie(data.results);
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const getUpcomingTMDB = async (): Promise<void> => {
  const { startDate, endDate } = calculateDates();
  try {
    const options = {
      url: `${TMDB_API_URL_2}/movie?include_adult=false&include_video=true&language=es-MX&page=1&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&region=MX&sort_by=popularity.desc&without_companies=4022%2C376%2C1302%2C235327%2C91505%2C3491%2C115960%2C30148%2C221665%2C14714%2C233618%2C21546%2C234649%2C90733%2C160071%2C22842%2C52270%2C210099%2C149142%2C2073%2C1976%2C4%2C127541%2C7764%2C202798%2C167711%2C235330%2C112425%2C10039%2C`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    };
    const { data } = await axios.request(options);
    await parseMovie(data.results);
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

export const parseMovie = async (
  moviesData: IDetailMovieListTMDB[],
): Promise<void> => {
  const totalMovies = moviesData.length;

  for (let i = 0; i < totalMovies; i++) {
    const movie = moviesData[i];
    const dataTMDB: IMovieDetailTMDB = await getMovieDetailTMDB(movie.id);

    const status = getMovieStatus(dataTMDB.release_date);

    if (status === MovieStatus.ARCHIVED) {
      continue;
    }

    const currentMovie: IMovie | null = await Movie.findOne({
      imdb_id: dataTMDB.id,
    });

    if (!currentMovie) {
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
        backdrop: `https://image.tmdb.org/t/p/original${moviesData[i].backdrop_path || moviesData[i].poster_path}`,
        description: dataTMDB.overview || "",
        releaseDate: new Date(moviesData[i].release_date + "T00:00:00"),
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
        poster: `https://image.tmdb.org/t/p/original${moviesData[i].poster_path}`,
        status,
      };
      await Movie.create(parsedMovie);
      await sleep(100);
    }
  }
};
