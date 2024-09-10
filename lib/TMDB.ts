import { TMDB_API_URL, TMDB_API_URL_2 } from "@/constants";
import { IMovie, IParsedMovie } from "@/interfaces/movie";
import { IMovieDetailOMDB } from "@/interfaces/OMDB";
import { IDetailMovieListTMDB, IMovieDetailTMDB } from "@/interfaces/TMDB";
import axios from "axios";
import { getMovieDetailOMDB } from "./OMDB";
import { sleep } from "@/utils/sleep";
import { MovieStatus } from "@/types/movie";
import { progressBar } from "@/utils/progressBar";
import { calculateDates } from "@/utils/calculateDays";
import mongoose from "mongoose";
import {
  SessionPrice,
  SessionPriceAfternoon,
  SessionRoom,
} from "@/types/session";
import Session from "@/models/Session";
import Room from "@/models/Room";
import { IRoom } from "@/interfaces/room";
import { ISeats, ISession } from "@/interfaces/session";
import { SeatType } from "@/types/room";
import Movie from "@/models/Movie";

export const getNowPlayingTMDB = async (): Promise<void> => {
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
    await parseMovie(data.results);
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const getUpcomingTMDB = async (): Promise<void> => {
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
    await parseMovie(data.results);
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

const calculatePrice = (
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

const getLetterByPosition = (position: number): string | null => {
  if (position < 1 || position > 26) {
    return null;
  }

  return String.fromCharCode(96 + position).toUpperCase();
};

const getSeatsNumber = (availableSeats: number): ISeats => {
  const response: ISeats = {};
  const rows = availableSeats / 10;
  for (let index = 1; index <= rows; index++) {
    const row = getLetterByPosition(index) || "A";
    for (let index = 1; index <= 10; index++) {
      response[row + index] = true;
    }
  }
  return response;
};

const createSession = (
  rooms: IRoom[],
  sessionTime: Date,
  existingSessions: ISession[],
  movieId: mongoose.Types.ObjectId,
  status: MovieStatus,
  sessions: ISession[],
  usedRoomTimes: Set<string | unknown>,
) => {
  const availableRooms = rooms.slice();

  while (availableRooms.length > 0) {
    const roomIndex = Math.floor(Math.random() * availableRooms.length);
    const room = availableRooms[roomIndex];

    const roomTimeKey = `${room._id}-${sessionTime.getTime()}`;

    if (!usedRoomTimes.has(roomTimeKey)) {
      const conflict = existingSessions?.some((session) => {
        const sessionDateTime = new Date(session.dateTime).getTime();
        return (
          session.roomId._id === room._id &&
          Math.abs(sessionDateTime - sessionTime.getTime()) < 0
        );
      });

      if (!conflict) {
        const session = new Session({
          movieId: movieId._id,
          roomId: room._id,
          dateTime: sessionTime,
          seatsPreferential: getSeatsNumber(room.totalSeatsPreferential),
          availableSeatsPreferential: room.totalSeatsPreferential,
          preferentialPrice: calculatePrice(
            SeatType.PREFERENTIAL,
            room.room,
            sessionTime,
            status,
          ),
          seatsGeneral: getSeatsNumber(room.totalSeatsGeneral),
          availableSeatsGeneral: room.totalSeatsGeneral,
          generalPrice: calculatePrice(
            SeatType.GENERAL,
            room.room,
            sessionTime,
            status,
          ),
          availableSeats: room.totalSeatsPreferential + room.totalSeatsGeneral,
        });

        sessions.push(session);
        usedRoomTimes.add(roomTimeKey);
        break;
      }
    }

    availableRooms.splice(roomIndex, 1);
  }
};

const createMovieSessions = async (
  releaseDate: string,
  status: MovieStatus,
  movieId: mongoose.Types.ObjectId,
): Promise<ISession[]> => {
  const release: Date = new Date(releaseDate);
  const today: Date = new Date();
  const rooms: IRoom[] = await Room.find({});

  if (status === MovieStatus.ARCHIVED || status === MovieStatus.UPCOMING)
    return [];

  const sessionTimes = [
    "10:00:00",
    "13:00:00",
    "16:00:00",
    "19:00:00",
    "22:00:00",
  ];

  const existingSessions: ISession[] = await Session.find({
    dateTime: { $gte: today },
  }).lean();

  const sessions: ISession[] = [];
  const usedRoomTimes = new Set();
  const sessionDays = 120;

  if (status === MovieStatus.PRE_SALE) {
    for (let day = 2; day > 0; day--) {
      const sessionDay = new Date(today.getTime() - day * 24 * 60 * 60 * 1000);

      const sessionsPerDay = 2;

      const shuffledSessionTimes = sessionTimes
        .slice(0, sessionsPerDay)
        .sort(() => Math.random() - 0.5);

      for (let sessionNumber = 0; sessionNumber < 2; sessionNumber++) {
        const sessionTime = new Date(
          `${sessionDay.toISOString().split("T")[0]}T${shuffledSessionTimes[sessionNumber]}Z`,
        );
        createSession(
          rooms,
          sessionTime,
          existingSessions,
          movieId,
          status,
          sessions,
          usedRoomTimes,
        );
      }
    }

    await Session.insertMany(sessions);
    return sessions;
  }

  for (let day = 0; day < sessionDays; day++) {
    const sessionDay = new Date(today.getTime() + day * 24 * 60 * 60 * 1000);
    const daysSinceRelease = Math.floor(
      (sessionDay.getTime() - release.getTime()) / (1000 * 60 * 60 * 24),
    );

    let sessionsPerDay = 3;
    if (daysSinceRelease > 30 && daysSinceRelease <= 60) {
      sessionsPerDay = 2;
    } else if (daysSinceRelease > 60 && daysSinceRelease <= 120) {
      sessionsPerDay = 1;
    } else if (daysSinceRelease > 120) {
      break;
    }

    const shuffledSessionTimes = sessionTimes
      .slice(0, sessionsPerDay)
      .sort(() => Math.random() - 0.5);

    for (let i = 0; i < sessionsPerDay; i++) {
      const sessionTime = new Date(
        `${sessionDay.toISOString().split("T")[0]}T${shuffledSessionTimes[i]}Z`,
      );
      createSession(
        rooms,
        sessionTime,
        existingSessions,
        movieId,
        status,
        sessions,
        usedRoomTimes,
      );
    }
  }

  await Session.insertMany(sessions);
  return sessions;
};

export const parseMovie = async (
  moviesData: IDetailMovieListTMDB[],
): Promise<void> => {
  const totalMovies = moviesData.length;

  for (let i = 0; i < totalMovies; i++) {
    progressBar(i + 1, totalMovies);
    const movie = moviesData[i];
    const dataTMDB: IMovieDetailTMDB = await getMovieDetailTMDB(movie.id);
    const dataOMDB: IMovieDetailOMDB = await getMovieDetailOMDB(
      dataTMDB.imdb_id,
    );

    const status = getMovieStatus(dataTMDB.release_date);
    const currentMovie: IMovie | null = await Movie.findOne({
      imdb_id: dataTMDB.imdb_id,
    });

    if (status === MovieStatus.ARCHIVED) {
      await Movie.findOneAndDelete({ _id: currentMovie?._id });
      await Session.deleteMany({ movieId: currentMovie?._id });
      continue;
    }

    if (currentMovie?.status !== status) {
      if (currentMovie) {
        await Session.deleteMany({ movieId: currentMovie._id });
        const sessions = await createMovieSessions(
          dataTMDB.release_date,
          status,
          new mongoose.Types.ObjectId(currentMovie._id),
        );
        await Movie.findOneAndUpdate(
          { _id: currentMovie._id },
          { status, sessions: sessions.map((session) => session._id) },
        );
      } else {
        const trailerVideo = dataTMDB.videos.results.find(
          (video) => video.type === "Trailer" || video.type === "Teaser",
        );
        const movieId = new mongoose.Types.ObjectId();
        const sessions = await createMovieSessions(
          dataTMDB.release_date,
          status,
          movieId,
        );
        const youtubeId =
          trailerVideo?.key || dataTMDB.videos.results[0]?.key || null;
        const parsedMovie: IParsedMovie = {
          _id: movieId,
          imdb_id: dataTMDB.imdb_id,
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
          trailer: youtubeId
            ? `https://www.youtube.com/watch?v=${youtubeId}`
            : "",
          poster: dataOMDB.Poster,
          status,
          sessions: sessions.map((session) => session._id),
        };
        await Movie.create(parsedMovie);
        await sleep(1000);
      }
    }
  }
};
