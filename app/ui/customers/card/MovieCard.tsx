import Image from "next/image";
import React from "react";
import { MovieStatus } from "@/types/movie";
import Link from "next/link";
import { parseReleaseDate } from "@/utils/parseDate";

export interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  status: MovieStatus;
  duration: number;
  releaseDate: Date;
  genre: string[];
}

const statusColors: Record<MovieStatus, string> = {
  [MovieStatus.PRE_SALE]: "bg-blue-500",
  [MovieStatus.UPCOMING]: "bg-yellow-500",
  [MovieStatus.BILLBOARD]: "bg-green-500",
  [MovieStatus.ARCHIVED]: "bg-gray-500",
};

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster,
  status,
  duration,
  releaseDate,
  genre,
}) => {
  const statusLabel =
    status in statusColors
      ? status.charAt(0).toUpperCase() + status.slice(1)
      : "Unknown";

  const displayedGenres = genre.slice(0, 3).join(", ");

  return (
    <div className="">
      <Link
        href={`/movie/${id}`}
        className="block overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
      >
        <div className="relative">
          <span
            className={`absolute left-2 top-2 rounded px-2 py-1 text-xs font-semibold text-white ${statusColors[status]}`}
            style={{ zIndex: 10 }}
          >
            {status === MovieStatus.PRE_SALE
              ? "Preventa"
              : status === MovieStatus.UPCOMING
                ? "Próximamente"
                : status === MovieStatus.BILLBOARD
                  ? "Cartelera"
                  : status}
          </span>
          <figure className="relative w-full md:h-[15rem] hd:h-[20rem] fhd:h-[25rem]">
            <Image
              src={poster}
              alt={title}
              fill
              style={{ objectFit: "fill" }}
              className="rounded-t-lg"
              priority
            />
          </figure>
        </div>
        <div className="p-4">
          <h2 className="mb-1 overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
            {title}
          </h2>
          <span className="mb-1 block text-xs sm:text-sm">
            Estreno: {parseReleaseDate(releaseDate)}
          </span>
          <span className="mb-2 block overflow-hidden truncate whitespace-nowrap text-xs">
            Género: {displayedGenres}
          </span>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
              {duration} Min
            </span>
            <span
              className={`inline-block rounded px-2 py-1 text-xs font-medium text-white ${statusColors[status]}`}
            >
              {status === MovieStatus.PRE_SALE
                ? "Preventa"
                : status === MovieStatus.UPCOMING
                  ? "Próximamente"
                  : status === MovieStatus.BILLBOARD
                    ? "Cartelera"
                    : statusLabel}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
