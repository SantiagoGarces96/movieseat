import { TMDB_API_URL, TMDB_API_URL_2 } from "@/constants";
import { IParsedMovie } from "@/interfaces/movie";
import { IMovieDetailOMDB } from "@/interfaces/OMDB";
import { IDetailMovieListTMDB, IMovieDetailTMDB } from "@/interfaces/TMDB";
import axios from "axios";
import { getMovieDetailOMDB } from "./OMDB";
import { sleep } from "@/utils/sleep";
import { MovieStatus } from "@/types/movie";
import { progressBar } from "@/utils/progressBar";
import { calculateDates } from "@/utils/calculateDays";

export const getNowPlayingTMDB = async (): Promise<IDetailMovieListTMDB[]> => {
  try {
    const options = {
      url: `${TMDB_API_URL}/now_playing?language=es-MX`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    };
    const { data } = await axios.request(options);

    return data.results as IDetailMovieListTMDB[];
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const getUpcomingTMDB = async (): Promise<IDetailMovieListTMDB[]> => {
  const { startDate, endDate } = calculateDates();
  try {
    const options = {
      url: `${TMDB_API_URL_2}/movie?page=1&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&region=co&sort_by=popularity.desc&with_original_language=en&language=es-MX`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    };
    const { data } = await axios.request(options);

    return data.results as IDetailMovieListTMDB[];
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

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

    if (!data.videos.results[0] || !data.overview) {
      response = await axios.get(
        `${TMDB_API_URL}/${movie_id}?append_to_response=videos&language=en-US`,
        options,
      );
      const dataEN = response.data as IMovieDetailTMDB;

      if (!data.videos.results[0]) {
        data.videos = dataEN.videos;
      }
      if (!data.overview) {
        data.overview = dataEN.overview;
      }
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

const getMovieStatus = (releaseDate: string): MovieStatus => {
  const today = new Date();
  const release = new Date(releaseDate);
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

export const parseMovie = async (
  moviesData: IDetailMovieListTMDB[],
): Promise<IParsedMovie[]> => {
  const response: IParsedMovie[] = [];
  const totalMovies = moviesData.length;

  for (let i = 0; i < totalMovies; i++) {
    const movie = moviesData[i];
    const dataTMDB: IMovieDetailTMDB = await getMovieDetailTMDB(movie.id);
    const dataOMDB: IMovieDetailOMDB = await getMovieDetailOMDB(
      dataTMDB.imdb_id,
    );
    const trailerVideo = dataTMDB.videos.results.find(
      (video) => video.type === "Trailer" || video.type === "Teaser",
    );

    const parsedMovie: IParsedMovie = {
      title: dataTMDB.original_title,
      backdrop: `https://image.tmdb.org/t/p/original${dataTMDB.backdrop_path}`,
      description: dataTMDB.overview,
      releaseDate: new Date(dataTMDB.release_date),
      duration: dataTMDB.runtime,
      genre: dataTMDB.genres.map(({ name }) => name),
      director: dataOMDB.Director,
      cast: dataTMDB.credits.cast.map(({ original_name }) => original_name),
      language: dataTMDB.spoken_languages.map(
        ({ english_name }) => english_name,
      ),
      trailer: `https://www.youtube.com/watch?v=${trailerVideo?.key || dataTMDB.videos.results[0].key}`,
      poster: dataOMDB.Poster,
      status: getMovieStatus(dataTMDB.release_date),
    };

    response.push(parsedMovie);

    // Update progress bar
    progressBar(i + 1, totalMovies);

    await sleep(1000); // Simulate delay or throttle requests
  }

  return response;
};
