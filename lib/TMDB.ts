import { TMDB_API_URL } from "@/constants";
import { IParsedMovie } from "@/interfaces/movie";
import { IMovieDetailOMDB } from "@/interfaces/OMDB";
import { IDetailMovieListTMDB, IMovieDetailTMDB } from "@/interfaces/TMDB";
import axios from "axios";
import { getMovieDetailOMDB } from "./OMDB";
import { sleep } from "@/utils/sleep";
import { MovieStatus } from "@/types/movie";

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
  try {
    const options = {
      url: `${TMDB_API_URL}/upcoming?language=es-MX`,
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
      url: `${TMDB_API_URL}/${movie_id}?append_to_response=credits%2Cvideos&language=es-MX`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    };
    const { data } = await axios.request(options);

    return data as IMovieDetailTMDB;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

const getMovieStatus = (release_date: string): MovieStatus => {
  const today = new Date();
  const release = new Date(release_date);
  const todayPlus8 = new Date(today);
  todayPlus8.setDate(today.getDate() + 8);

  if (release > today) {
    if (release.getTime() === todayPlus8.getTime()) {
      return MovieStatus.PRE_SALE;
    }
    return MovieStatus.UPCOMING;
  }
  return MovieStatus.BILLBOARD;
};

export const parseMovie = async (
  moviesData: IDetailMovieListTMDB[],
): Promise<IParsedMovie[]> => {
  const response = [];
  for (const movie of moviesData) {
    const dataTMDB: IMovieDetailTMDB = await getMovieDetailTMDB(movie.id);
    const dataOMDB: IMovieDetailOMDB = await getMovieDetailOMDB(
      dataTMDB.imdb_id,
    );
    console.log(dataTMDB.videos.results[0] || dataTMDB.videos);
    const parsedMovie: IParsedMovie = {
      title: dataTMDB.original_title,
      description: dataTMDB.overview,
      releaseDate: new Date(dataTMDB.release_date),
      duration: dataTMDB.runtime,
      genre: dataTMDB.genres.map(({ name }) => name),
      director: dataOMDB.Director,
      cast: dataTMDB.credits.cast.map(({ original_name }) => original_name),
      language: dataTMDB.spoken_languages.map(
        ({ english_name }) => english_name,
      ),
      trailer: dataTMDB.videos.results[0]
        ? `https://www.youtube.com/watch?v=${dataTMDB.videos.results[0].key}`
        : null,
      poster: dataOMDB.Poster,
      status: getMovieStatus(dataTMDB.release_date),
    };

    response.push(parsedMovie);
    await sleep(2000);
  }
  return response;
};
