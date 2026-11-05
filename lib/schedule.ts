import { sessionTimes } from "@/constants/sessions";
import { calculatePrice, getMovieStatus } from "@/lib/TMDB";
import Movie from "@/models/Movie";
import Room from "@/models/Room";
import Session from "@/models/Session";
import { MovieStatus } from "@/types/movie";
import { SeatType } from "@/types/room";
import { getSeatsNumber } from "@/utils/getSeatsNumber";

// Con 10 salas y 5 horarios caben 50 funciones al día: unas 4 por película.
export const MAX_BILLBOARD_MOVIES = 12;
export const SCHEDULE_DAYS = 14;
// La sincronización corre a diario. Tres días toleran que falle alguna vez.
const SEEN_IN_COLOMBIA_MS = 3 * 24 * 60 * 60 * 1000;

const DAY_MS = 24 * 60 * 60 * 1000;
const COLOMBIA_OFFSET_MS = 5 * 60 * 60 * 1000;

interface ScheduleMovie {
  id: string;
  status: MovieStatus;
  firstDay: number;
}

interface ScheduleRoom {
  id: string;
}

export interface ExistingSession {
  id: string;
  movieId: string;
  roomId: string;
  dateTime: number;
  hasSoldSeats: boolean;
}

export interface PlannedSession {
  movieId: string;
  roomId: string;
  dateTime: Date;
}

// Recorre cada día, horario y sala, y da cada espacio libre a la película con
// menos funciones ese día. Una sala solo puede tener una función por horario.
export const planSchedule = (
  movies: ScheduleMovie[],
  rooms: ScheduleRoom[],
  existing: ExistingSession[],
  localNow: number,
) => {
  const activeIds = new Set(movies.map(({ id }) => id));
  const windowEnd =
    Date.UTC(
      new Date(localNow).getUTCFullYear(),
      new Date(localNow).getUTCMonth(),
      new Date(localNow).getUTCDate(),
    ) +
    SCHEDULE_DAYS * DAY_MS;

  const occupied = new Set<string>();
  const toDelete: string[] = [];
  const kept: ExistingSession[] = [];

  // Primero las que tienen sillas vendidas: esas nunca se tocan.
  const ordered = [...existing].sort(
    (a, b) => Number(b.hasSoldSeats) - Number(a.hasSoldSeats),
  );
  for (const session of ordered) {
    const key = `${session.roomId}|${session.dateTime}`;
    const isValid =
      activeIds.has(session.movieId) &&
      session.dateTime < windowEnd &&
      !occupied.has(key);
    if (session.hasSoldSeats || isValid) {
      occupied.add(key);
      kept.push(session);
    } else {
      toDelete.push(session.id);
    }
  }

  const today = new Date(localNow);
  const toCreate: PlannedSession[] = [];

  for (let day = 0; day < SCHEDULE_DAYS; day++) {
    const showsToday = new Map<string, number>();
    const dayStart =
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate(),
      ) +
      day * DAY_MS;
    for (const session of kept) {
      if (
        session.dateTime >= dayStart &&
        session.dateTime < dayStart + DAY_MS
      ) {
        showsToday.set(
          session.movieId,
          (showsToday.get(session.movieId) ?? 0) + 1,
        );
      }
    }
    const eligible = movies.filter((movie) => movie.firstDay <= dayStart);
    if (!eligible.length) continue;

    for (const time of sessionTimes) {
      const dateTime = new Date(
        `${new Date(dayStart).toISOString().split("T")[0]}T${time}Z`,
      );
      if (dateTime.getTime() <= localNow) continue;
      const inThisSlot = new Set(
        [...kept, ...toCreate]
          .filter((session) => {
            const value =
              session.dateTime instanceof Date
                ? session.dateTime.getTime()
                : session.dateTime;
            return value === dateTime.getTime();
          })
          .map(({ movieId }) => movieId),
      );

      for (const room of rooms) {
        if (occupied.has(`${room.id}|${dateTime.getTime()}`)) continue;
        // Evita repetir película en el mismo horario, si hay otras disponibles.
        const candidates = eligible.filter(({ id }) => !inThisSlot.has(id));
        const pool = candidates.length ? candidates : eligible;
        const movie = pool.reduce((best, current) =>
          (showsToday.get(current.id) ?? 0) < (showsToday.get(best.id) ?? 0)
            ? current
            : best,
        );
        toCreate.push({ movieId: movie.id, roomId: room.id, dateTime });
        occupied.add(`${room.id}|${dateTime.getTime()}`);
        inThisSlot.add(movie.id);
        showsToday.set(movie.id, (showsToday.get(movie.id) ?? 0) + 1);
      }
    }
  }

  return { toCreate, toDelete };
};

export const updateMoviesStatus = async () => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  await Session.deleteMany({ dateTime: { $lt: oneMonthAgo } });

  const movies = await Movie.find(
    {},
    {
      releaseDate: 1,
      status: 1,
      popularity: 1,
      lastSeenInColombia: 1,
      isManual: 1,
    },
  ).lean<
    {
      _id: unknown;
      releaseDate: Date;
      status: MovieStatus;
      popularity?: number;
      lastSeenInColombia?: Date;
      isManual?: boolean;
    }[]
  >();

  const withDateStatus = movies.map((movie) => ({
    ...movie,
    id: String(movie._id),
    dateStatus: getMovieStatus(movie.releaseDate.toISOString().split("T")[0]),
  }));

  // Vencidas por fecha: se eliminan, igual que antes.
  const expiredIds = withDateStatus
    .filter(({ dateStatus }) => dateStatus === MovieStatus.ARCHIVED)
    .map(({ id }) => id);
  if (expiredIds.length) {
    await Movie.deleteMany({ _id: { $in: expiredIds } });
    await Session.deleteMany({ movieId: { $in: expiredIds } });
  }

  // Ocupan salas las películas en cartelera en Colombia según TMDB, más las
  // creadas a mano en el panel, de la más popular a la menos popular. Si TMDB
  // no ha reportado ninguna, se usan las estrenadas más recientemente. Las demás
  // quedan archivadas, y no se borran.
  const seenSince = Date.now() - SEEN_IN_COLOMBIA_MS;
  const billboard = withDateStatus
    .filter(({ dateStatus }) => dateStatus === MovieStatus.BILLBOARD)
    .sort(
      (a, b) =>
        (b.popularity ?? 0) - (a.popularity ?? 0) ||
        b.releaseDate.getTime() - a.releaseDate.getTime(),
    );
  const inColombia = billboard.filter(
    ({ isManual, lastSeenInColombia }) =>
      isManual || (lastSeenInColombia?.getTime() ?? 0) >= seenSince,
  );
  const activeBillboard = (inColombia.length ? inColombia : billboard).slice(
    0,
    MAX_BILLBOARD_MOVIES,
  );
  const activeIds = new Set(activeBillboard.map(({ id }) => id));
  const overflow = billboard.filter(({ id }) => !activeIds.has(id));
  const preSale = withDateStatus.filter(
    ({ dateStatus }) => dateStatus === MovieStatus.PRE_SALE,
  );
  const upcoming = withDateStatus.filter(
    ({ dateStatus }) => dateStatus === MovieStatus.UPCOMING,
  );

  const setStatus = (ids: string[], status: MovieStatus) =>
    ids.length
      ? Movie.updateMany({ _id: { $in: ids } }, { status })
      : Promise.resolve();
  await Promise.all([
    setStatus(
      activeBillboard.map(({ id }) => id),
      MovieStatus.BILLBOARD,
    ),
    setStatus(
      overflow.map(({ id }) => id),
      MovieStatus.ARCHIVED,
    ),
    setStatus(
      preSale.map(({ id }) => id),
      MovieStatus.PRE_SALE,
    ),
    setStatus(
      upcoming.map(({ id }) => id),
      MovieStatus.UPCOMING,
    ),
  ]);

  const rooms = await Room.find(
    {},
    { room: 1, totalSeats: 1, totalSeatsGeneral: 1, totalSeatsPreferential: 1 },
  ).lean<
    {
      _id: unknown;
      room: any;
      totalSeats: number;
      totalSeatsGeneral: number;
      totalSeatsPreferential: number;
    }[]
  >();
  const roomById = new Map(rooms.map((room) => [String(room._id), room]));

  const localNow = Date.now() - COLOMBIA_OFFSET_MS;
  const existing = await Session.find(
    { dateTime: { $gt: new Date(localNow) } },
    { movieId: 1, roomId: 1, dateTime: 1, availableSeats: 1 },
  ).lean<
    {
      _id: unknown;
      movieId: unknown;
      roomId: unknown;
      dateTime: Date;
      availableSeats: number;
    }[]
  >();

  const statusById = new Map<string, MovieStatus>();
  const scheduleMovies: ScheduleMovie[] = [
    ...activeBillboard.map(({ id }) => ({
      id,
      status: MovieStatus.BILLBOARD,
      firstDay: 0,
    })),
    ...preSale.map(({ id, releaseDate }) => ({
      id,
      status: MovieStatus.PRE_SALE,
      firstDay: Date.UTC(
        releaseDate.getUTCFullYear(),
        releaseDate.getUTCMonth(),
        releaseDate.getUTCDate(),
      ),
    })),
  ];
  scheduleMovies.forEach(({ id, status }) => statusById.set(id, status));

  const { toCreate, toDelete } = planSchedule(
    scheduleMovies,
    rooms.map((room) => ({ id: String(room._id) })),
    existing.map((session) => ({
      id: String(session._id),
      movieId: String(session.movieId),
      roomId: String(session.roomId),
      dateTime: session.dateTime.getTime(),
      hasSoldSeats:
        session.availableSeats <
        (roomById.get(String(session.roomId))?.totalSeats ?? 0),
    })),
    localNow,
  );

  if (toDelete.length) {
    await Session.deleteMany({ _id: { $in: toDelete } });
  }
  if (toCreate.length) {
    await Session.insertMany(
      toCreate.map(({ movieId, roomId, dateTime }) => {
        const room = roomById.get(roomId)!;
        const status = statusById.get(movieId)!;
        const price = (seatType: SeatType) =>
          calculatePrice(seatType, room.room, dateTime, status);
        return {
          movieId,
          roomId,
          dateTime,
          seatsPreferential: getSeatsNumber(room.totalSeatsPreferential),
          availableSeatsPreferential: room.totalSeatsPreferential,
          preferentialPrice: price(SeatType.PREFERENTIAL),
          seatsGeneral: getSeatsNumber(room.totalSeatsGeneral),
          availableSeatsGeneral: room.totalSeatsGeneral,
          generalPrice: price(SeatType.GENERAL),
          availableSeats: room.totalSeats,
        };
      }),
      { ordered: false },
    );
  }

  return {
    activeMovies: scheduleMovies.length,
    archivedMovies: overflow.length,
    createdSessions: toCreate.length,
    deletedSessions: toDelete.length,
  };
};
