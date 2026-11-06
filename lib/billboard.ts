import axios from "axios";
import { revalidatePath } from "next/cache";
import { TMDB_API_URL } from "@/constants";
import { updateMoviesStatus } from "@/lib/schedule";
import { saveMovieFromTMDB } from "@/lib/TMDB";
import Movie from "@/models/Movie";
import {
  IBillboardEntry,
  parseBillboardText,
} from "@/utils/parseBillboardText";

const TMDB_SEARCH_URL = TMDB_API_URL.replace("/movie", "/search/movie");
const MAX_TITLES = 40;
// Menos que esto indica un texto equivocado, no una cartelera pequeña.
const MIN_TITLES = 5;

const tmdbHeaders = () => ({
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
  },
});

const normalizeTitle = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();

const words = (text: string): string[] =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

// Parecidos si son iguales, o si uno contiene casi todas las palabras del otro:
// "Wildwood" y "Wildwood: El bosque salvaje", o "Part 2" y "Parte 2".
const isSimilar = (a: string, b: string): boolean => {
  if (normalizeTitle(a) === normalizeTitle(b)) return true;
  const [short, long] = [words(a), words(b)].sort(
    (x, y) => x.length - y.length,
  );
  if (!short.length) return false;
  // Los números distinguen secuelas: "Shrek" no es "Shrek 5".
  const numbers = (list: string[]) =>
    list.filter((word) => /^\d+$/.test(word)).join(",");
  if (numbers(short) !== numbers(long)) return false;
  const shared = short.filter((word) =>
    long.some(
      (other) =>
        other === word ||
        (Math.min(word.length, other.length) >= 4 &&
          (other.startsWith(word) || word.startsWith(other))),
    ),
  ).length;
  return shared / short.length >= 0.75;
};

const getNowPlayingIds = async (): Promise<Set<number>> => {
  const pages = await Promise.all(
    [1, 2, 3].map((page) =>
      axios.get(
        `${TMDB_API_URL}/now_playing?language=es-MX&region=CO&page=${page}`,
        tmdbHeaders(),
      ),
    ),
  );
  return new Set(
    pages.flatMap(({ data }) => data.results.map(({ id }: any) => id)),
  );
};

const searchTitle = async (query: string): Promise<any[]> => {
  const { data } = await axios.get(
    `${TMDB_SEARCH_URL}?language=es-MX&query=${encodeURIComponent(query)}`,
    tmdbHeaders(),
  );
  return data.results.filter(({ poster_path }: any) => poster_path);
};

// Compara cada dato disponible. La película pasa solo si coincide más de la mitad,
// con un mínimo de dos datos. Así queda fuera el cine clásico y los reestrenos.
const evaluate = (
  movie: any,
  entry: IBillboardEntry,
  nowPlaying: Set<number>,
) => {
  const matchesTitle = (query: string) =>
    isSimilar(query, movie.title) || isSimilar(query, movie.original_title);
  const checks = [
    matchesTitle(entry.title),
    nowPlaying.has(movie.id),
    ...(entry.altTitle ? [matchesTitle(entry.altTitle)] : []),
    ...(entry.releaseDate
      ? [
          Math.abs(
            Number(entry.releaseDate.slice(0, 4)) -
              Number((movie.release_date ?? "0").slice(0, 4)),
          ) <= 1,
        ]
      : []),
  ];
  const passed = checks.filter(Boolean).length;
  const exactTitles = [entry.title, entry.altTitle].filter(
    (query) =>
      query &&
      [movie.title, movie.original_title].some(
        (title) => normalizeTitle(query) === normalizeTitle(title),
      ),
  ).length;
  return {
    passed,
    total: checks.length,
    exactTitles,
    isPlaying: nowPlaying.has(movie.id),
    isAccepted: passed >= 2 && passed * 2 > checks.length,
  };
};

export interface IBillboardResult {
  title: string;
  movieTitle: string | null;
  year: string;
  passed: number;
  total: number;
}

const chooseMovie = async (entry: IBillboardEntry, nowPlaying: Set<number>) => {
  const queries = [entry.title, entry.altTitle].filter(Boolean) as string[];
  const results = (await Promise.all(queries.map(searchTitle))).flat();
  const unique = Array.from(
    new Map(results.map((movie) => [movie.id, movie])).values(),
  );
  const [best] = unique
    .map((movie) => ({ movie, ...evaluate(movie, entry, nowPlaying) }))
    .sort(
      (a, b) =>
        Number(b.isAccepted) - Number(a.isAccepted) ||
        b.exactTitles - a.exactTitles ||
        b.passed - a.passed ||
        Number(b.isPlaying) - Number(a.isPlaying) ||
        b.movie.popularity - a.movie.popularity,
    );
  return best;
};

const toDate = (releaseDate?: string): Date | undefined =>
  releaseDate ? new Date(`${releaseDate}T00:00:00Z`) : undefined;

const applyBillboardList = async (
  items: { tmdbId: number; releaseDate?: string }[],
) => {
  const positions: { id: unknown; position: number; date?: Date }[] = [];
  let failed = 0;

  for (const [position, { tmdbId, releaseDate }] of items.entries()) {
    const date = toDate(releaseDate);
    try {
      const movie =
        (await Movie.findOne({ imdb_id: tmdbId }, { _id: 1 })) ??
        (await saveMovieFromTMDB(tmdbId, { releaseDate: date ?? new Date() }));
      positions.push({ id: movie._id, position, date });
    } catch (error: any) {
      console.error(`Error saving movie ${tmdbId}: ${error.message}`);
      failed++;
    }
  }
  if (!positions.length) {
    throw new Error("No se pudo guardar ninguna película");
  }

  const listedAt = new Date();
  await Movie.updateMany(
    { billboardPosition: { $ne: null } },
    { billboardPosition: null, billboardListedAt: null },
  );
  await Movie.bulkWrite(
    positions.map(({ id, position, date }) => ({
      updateOne: {
        filter: { _id: id },
        update: {
          billboardPosition: position,
          billboardListedAt: listedAt,
          ...(date ? { releaseDate: date } : {}),
        },
      },
    })) as any,
  );

  const schedule = await updateMoviesStatus();
  revalidatePath("/", "layout");
  return { saved: positions.length, failed, ...schedule };
};

// Revisa los títulos y actualiza la cartelera con los que coinciden. Si el texto
// no parece una cartelera, no cambia nada.
export const updateBillboardFromText = async (text: string) => {
  const entries = parseBillboardText(text).slice(0, MAX_TITLES);
  if (entries.length < MIN_TITLES) {
    throw new Error(
      `Solo se reconocieron ${entries.length} películas. No se cambió nada.`,
    );
  }

  const nowPlaying = await getNowPlayingIds();
  const chosen = await Promise.all(
    entries.map(async (entry) => ({
      entry,
      best: await chooseMovie(entry, nowPlaying),
    })),
  );

  const results: IBillboardResult[] = chosen.map(({ entry, best }) => ({
    title: entry.altTitle ?? entry.title,
    movieTitle: best?.isAccepted ? best.movie.title : null,
    year: best?.isAccepted ? (best.movie.release_date ?? "").slice(0, 4) : "",
    passed: best?.passed ?? 0,
    total: best?.total ?? 0,
  }));

  const accepted = chosen.filter(({ best }) => best?.isAccepted);
  const uniqueItems = Array.from(
    new Map(
      accepted.map(({ entry, best }) => [
        best.movie.id,
        { tmdbId: best.movie.id as number, releaseDate: entry.releaseDate },
      ]),
    ).values(),
  );
  if (uniqueItems.length < MIN_TITLES) {
    throw new Error(
      `Solo ${uniqueItems.length} películas coincidieron. No se cambió nada.`,
    );
  }

  const applied = await applyBillboardList(uniqueItems);
  return { results, ...applied };
};
