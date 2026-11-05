import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MovieStatus } from "@/types/movie";
import {
  formatDuration,
  formatReleaseDate,
  movieStatusLabel,
} from "@/utils/format";

export interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  status: MovieStatus;
  duration: number;
  releaseDate: Date;
  genre: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster,
  status,
  duration,
  releaseDate,
  genre,
}) => {
  const isBillboard = status === MovieStatus.BILLBOARD;
  const details = isBillboard
    ? [genre[0], formatDuration(duration)].filter(Boolean).join(" · ")
    : `Estreno: ${formatReleaseDate(releaseDate)}`;

  return (
    <Link
      href={`/movie/${id}`}
      className="group block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-ink-800 ring-1 ring-white/5 transition duration-300 group-hover:ring-gold/70">
        <Image
          src={poster}
          alt={`Póster de ${title}`}
          fill
          sizes="(min-width: 1280px) 16vw, (min-width: 460px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
        {!isBillboard && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-ink-950/85 px-2.5 py-1 text-xs font-semibold text-gold backdrop-blur">
            {movieStatusLabel[status]}
          </span>
        )}
      </div>
      <h3 className="mt-3 truncate text-sm font-semibold text-paper md:text-base">
        {title}
      </h3>
      <p className="mt-0.5 truncate text-xs text-muted md:text-sm">{details}</p>
    </Link>
  );
};

export default MovieCard;
