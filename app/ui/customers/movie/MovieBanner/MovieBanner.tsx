import React from "react";
import Image from "next/image";
import { MovieStatus } from "@/types/movie";
import { formatDuration, movieStatusLabel } from "@/utils/format";
import TrailerButton from "./TrailerButton";

interface MovieBannerProps {
  backdrop: string;
  poster: string;
  title: string;
  releaseDate: string;
  genre: string[];
  duration: number;
  trailer: string;
  status: MovieStatus;
}

const MovieBanner: React.FC<MovieBannerProps> = ({
  backdrop,
  poster,
  title,
  releaseDate,
  genre,
  duration,
  trailer,
  status,
}) => {
  const details = [formatDuration(duration), genre.join(", ")]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={backdrop}
        alt=""
        fill
        sizes="100vw"
        priority
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/30" />

      <div className="ms-container flex flex-col gap-6 pb-8 pt-16 sm:flex-row sm:items-end md:gap-10 md:pt-32">
        <div className="relative aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 md:w-64">
          <Image
            src={poster}
            alt={`Póster de ${title}`}
            fill
            sizes="(min-width: 830px) 256px, 160px"
            priority
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
            {movieStatusLabel[status]}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-paper/80 md:text-base">{details}</p>
          <p className="mt-1 text-sm text-muted md:text-base">
            Estreno: {releaseDate}
          </p>
          {trailer && (
            <div className="mt-5">
              <TrailerButton trailerUrl={trailer} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieBanner;
