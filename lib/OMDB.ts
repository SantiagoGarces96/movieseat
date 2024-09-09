import { OMDB_API_URL } from "@/constants";
import { IMovieDetailOMDB } from "@/interfaces/OMDB";
import axios from "axios";

const API_KEYS = process.env.OMDB_API_KEY?.split(",") || ["55bbfea8"];

export const getMovieDetailOMDB = async (
  imdbID: string,
): Promise<IMovieDetailOMDB> => {
  try {
    const options = {
      url: `${OMDB_API_URL}/?i=${imdbID}&apikey=${API_KEYS[0]}`,
      method: "GET",
    };
    const { data } = await axios.request(options);

    return data as IMovieDetailOMDB;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const parseMovieDetailOMDB = async (
  imdbID: string,
): Promise<IMovieDetailOMDB> => {
  try {
    const options = {
      url: `${OMDB_API_URL}/?i=${imdbID}&apikey=${API_KEYS[0]}`,
      method: "GET",
    };
    const { data } = await axios.request(options);

    return data as IMovieDetailOMDB;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};
