import { TMDB_API_URL } from "@/constants";
import axios from "axios";

export const getNowPlaying = async () => {
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

    return data.results;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const getUpcoming = async () => {
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

    return data.results;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};
