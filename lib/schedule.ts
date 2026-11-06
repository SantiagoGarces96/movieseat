import { calculatePrice, getMovieStatus } from "@/lib/TMDB";
import Movie from "@/models/Movie";
import Room from "@/models/Room";
import Session from "@/models/Session";
import { MovieStatus } from "@/types/movie";
import { SeatType } from "@/types/room";
import { SessionTimeManagement } from "@/types/session";
import { getSeatsNumber } from "@/utils/getSeatsNumber";

// Si no hay lista de cartelera, se usan las más populares de TMDB.
export const MAX_BILLBOARD_MOVIES = 12;
export const SCHEDULE_DAYS = 7;
// La sincronización corre a diario. Tres días toleran que falle alguna vez.
const SEEN_IN_COLOMBIA_MS = 3 * 24 * 60 * 60 * 1000;
// Si nadie actualiza la lista, la cartelera vuelve sola a los datos de TMDB.
const LIST_MAX_AGE_MS = 10 * 24 * 60 * 60 * 1000;

const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * MINUTE_MS;
const COLOMBIA_OFFSET_MS = 5 * 60 * MINUTE_MS;
const DEFAULT_DURATION_MIN = 120;
const BREAK_MS =
  (Number(SessionTimeManagement.CLEANING_TIME) +
    Number(SessionTimeManagement.SETUP_TIME)) *
  MINUTE_MS;
const SHOWS_PER_ROOM_ESTIMATE = 4;

const clockToMs = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours * 60 + minutes) * MINUTE_MS;
};
const FIRST_SHOW_MS = clockToMs(SessionTimeManagement.FIRST_SESSION_TIME);
const LAST_SHOW_MS = clockToMs(SessionTimeManagement.LAST_SESSION_TIME);

const roundUpToFiveMinutes = (time: number): number =>
  Math.ceil(time / (5 * MINUTE_MS)) * 5 * MINUTE_MS;

const startOfDay = (time: number): number => time - (time % DAY_MS);

export interface ScheduleMovie {
  id: string;
  duration: number;
  firstDay: number;
}

export interface ExistingSession {
  id: string;
  movieId: string;
  roomId: string;
  dateTime: number;
  duration: number;
  hasSoldSeats: boolean;
}

export interface PlannedSession {
  movieId: string;
  roomId: string;
  dateTime: Date;
}

interface Interval {
  start: number;
  end: number;
}

const showEnd = (start: number, duration: number): number =>
  start + (duration || DEFAULT_DURATION_MIN) * MINUTE_MS + BREAK_MS;

// Cada sala se llena a lo largo del día según la duración de cada película, más
// el tiempo de limpieza y preparación. Una película suele repetirse en la misma
// sala, y se reparte primero a las que aún no tienen funciones ese día.
export const planSchedule = (
  movies: ScheduleMovie[],
  roomIds: string[],
  existing: ExistingSession[],
  localNow: number,
) => {
  const movieById = new Map(movies.map((movie) => [movie.id, movie]));
  const today = startOfDay(localNow);
  const windowEnd = today + SCHEDULE_DAYS * DAY_MS;

  const busy = new Map<string, Interval[]>(roomIds.map((id) => [id, []]));
  const overlaps = (roomId: string, { start, end }: Interval) =>
    (busy.get(roomId) ?? []).find(
      (item) => start < item.end && item.start < end,
    );
  const reserve = (roomId: string, interval: Interval) => {
    const list = busy.get(roomId) ?? [];
    list.push(interval);
    busy.set(roomId, list);
  };

  const toDelete: string[] = [];
  const kept: ExistingSession[] = [];

  // Primero lo que no se puede tocar: funciones pasadas o con sillas vendidas.
  const isLocked = ({ dateTime, hasSoldSeats }: ExistingSession) =>
    hasSoldSeats || dateTime <= localNow;
  const ordered = [...existing].sort(
    (a, b) =>
      Number(isLocked(b)) - Number(isLocked(a)) || a.dateTime - b.dateTime,
  );
  for (const session of ordered) {
    const interval = {
      start: session.dateTime,
      end: showEnd(session.dateTime, session.duration),
    };
    const movie = movieById.get(session.movieId);
    const isValid =
      movie &&
      movie.firstDay <= session.dateTime &&
      session.dateTime < windowEnd &&
      !overlaps(session.roomId, interval);
    if (isLocked(session) || isValid) {
      reserve(session.roomId, interval);
      kept.push(session);
    } else {
      toDelete.push(session.id);
    }
  }

  const toCreate: PlannedSession[] = [];

  for (let day = 0; day < SCHEDULE_DAYS; day++) {
    const dayStart = today + day * DAY_MS;
    const eligible = movies.filter(({ firstDay }) => firstDay <= dayStart);
    if (!eligible.length) continue;

    const shows = new Map<string, number>();
    for (const { dateTime, movieId } of kept) {
      if (dateTime >= dayStart && dateTime < dayStart + DAY_MS) {
        shows.set(movieId, (shows.get(movieId) ?? 0) + 1);
      }
    }

    roomIds.forEach((roomId, roomIndex) => {
      let cursor = dayStart + FIRST_SHOW_MS;
      let movie: ScheduleMovie | null = null;
      let repeatsLeft = 0;

      while (cursor <= dayStart + LAST_SHOW_MS) {
        if (cursor <= localNow) {
          cursor = roundUpToFiveMinutes(localNow + MINUTE_MS);
          continue;
        }
        if (repeatsLeft === 0 || !movie) {
          movie = eligible.reduce((best, current) =>
            (shows.get(current.id) ?? 0) < (shows.get(best.id) ?? 0)
              ? current
              : best,
          );
          const withoutShows = eligible.filter(
            ({ id }) => !shows.get(id),
          ).length;
          const slotsLeft =
            (roomIds.length - roomIndex) * SHOWS_PER_ROOM_ESTIMATE;
          repeatsLeft = withoutShows * 2 > slotsLeft ? 1 : 2;
        }

        const interval = {
          start: cursor,
          end: showEnd(cursor, movie.duration),
        };
        const blocker = overlaps(roomId, interval);
        if (blocker) {
          cursor = roundUpToFiveMinutes(blocker.end);
          continue;
        }

        toCreate.push({
          movieId: movie.id,
          roomId,
          dateTime: new Date(cursor),
        });
        reserve(roomId, interval);
        shows.set(movie.id, (shows.get(movie.id) ?? 0) + 1);
        repeatsLeft--;
        cursor = roundUpToFiveMinutes(interval.end);
      }
    });
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
      duration: 1,
      popularity: 1,
      lastSeenInColombia: 1,
      isManual: 1,
      billboardPosition: 1,
      billboardListedAt: 1,
    },
  ).lean<
    {
      _id: unknown;
      releaseDate: Date;
      status: MovieStatus;
      duration: number;
      popularity?: number;
      lastSeenInColombia?: Date;
      isManual?: boolean;
      billboardPosition?: number | null;
      billboardListedAt?: Date | null;
    }[]
  >();

  const withDateStatus = movies.map((movie) => ({
    ...movie,
    id: String(movie._id),
    isListed:
      typeof movie.billboardPosition === "number" &&
      (movie.billboardListedAt?.getTime() ?? 0) >= Date.now() - LIST_MAX_AGE_MS,
    dateStatus: getMovieStatus(movie.releaseDate.toISOString().split("T")[0]),
  }));

  // Vencidas por fecha: se eliminan, salvo si están en la lista de cartelera,
  // como pasa con los reestrenos.
  const expiredIds = withDateStatus
    .filter(
      ({ dateStatus, isListed }) =>
        dateStatus === MovieStatus.ARCHIVED && !isListed,
    )
    .map(({ id }) => id);
  if (expiredIds.length) {
    await Movie.deleteMany({ _id: { $in: expiredIds } });
    await Session.deleteMany({ movieId: { $in: expiredIds } });
  }

  const listed = withDateStatus
    .filter(({ isListed }) => isListed)
    .sort(
      (a, b) =>
        (a.billboardPosition as number) - (b.billboardPosition as number),
    );
  const billboard = withDateStatus
    .filter(
      ({ dateStatus, isListed }) =>
        dateStatus === MovieStatus.BILLBOARD && !isListed,
    )
    .sort(
      (a, b) =>
        (b.popularity ?? 0) - (a.popularity ?? 0) ||
        b.releaseDate.getTime() - a.releaseDate.getTime(),
    );

  // Con lista, la cartelera es exactamente esa lista más lo creado a mano. Sin
  // lista, son las más populares que TMDB reporta para Colombia. Las demás
  // quedan archivadas, y no se borran.
  const seenSince = Date.now() - SEEN_IN_COLOMBIA_MS;
  const inColombia = billboard.filter(
    ({ isManual, lastSeenInColombia }) =>
      isManual || (lastSeenInColombia?.getTime() ?? 0) >= seenSince,
  );
  const activeBillboard = listed.length
    ? [...listed, ...billboard.filter(({ isManual }) => isManual)]
    : (inColombia.length ? inColombia : billboard).slice(
        0,
        MAX_BILLBOARD_MOVIES,
      );
  const activeIds = new Set(activeBillboard.map(({ id }) => id));
  const overflow = billboard.filter(({ id }) => !activeIds.has(id));
  const preSale = withDateStatus.filter(
    ({ dateStatus, isListed }) =>
      dateStatus === MovieStatus.PRE_SALE && !isListed,
  );
  const upcoming = withDateStatus.filter(
    ({ dateStatus, isListed }) =>
      dateStatus === MovieStatus.UPCOMING && !isListed,
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
    { dateTime: { $gte: new Date(startOfDay(localNow)) } },
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

  const durationById = new Map(
    withDateStatus.map(({ id, duration }) => [id, duration]),
  );
  const statusById = new Map<string, MovieStatus>();
  const scheduleMovies: ScheduleMovie[] = [
    ...activeBillboard.map(({ id, duration }) => {
      statusById.set(id, MovieStatus.BILLBOARD);
      return { id, duration, firstDay: 0 };
    }),
    ...preSale.map(({ id, duration, releaseDate }) => {
      statusById.set(id, MovieStatus.PRE_SALE);
      return { id, duration, firstDay: startOfDay(releaseDate.getTime()) };
    }),
  ];

  const { toCreate, toDelete } = planSchedule(
    scheduleMovies,
    rooms.map((room) => String(room._id)),
    existing.map((session) => ({
      id: String(session._id),
      movieId: String(session.movieId),
      roomId: String(session.roomId),
      dateTime: session.dateTime.getTime(),
      duration: durationById.get(String(session.movieId)) ?? 0,
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
