"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TrailerButton from "@/app/ui/customers/movie/MovieBanner/TrailerButton";
import { formatDuration } from "@/utils/format";

export interface HeroMovie {
  _id: string;
  title: string;
  backdrop: string;
  description: string;
  genre: string[];
  duration: number;
  trailer: string;
}

const ROTATION_MS = 9000;

const Hero = ({ movies }: { movies: HeroMovie[] }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (movies.length < 2 || isPaused || isTrailerOpen || prefersReducedMotion)
      return;
    const interval = setInterval(
      () => setCurrent((index) => (index + 1) % movies.length),
      ROTATION_MS,
    );
    return () => clearInterval(interval);
  }, [movies.length, isPaused, isTrailerOpen]);

  if (!movies.length) {
    return (
      <section className="ms-container py-16 md:py-24">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Tu próxima película empieza aquí
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Muy pronto verás aquí la cartelera.
        </p>
      </section>
    );
  }

  const movie = movies[current];
  const details = [movie.genre.slice(0, 2).join(", "), formatDuration(movie.duration)]
    .filter(Boolean)
    .join(" · ");

  return (
    <section
      aria-label="Películas destacadas"
      className="relative isolate flex min-h-[520px] items-end overflow-hidden md:min-h-[600px] xl:min-h-[680px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {movies.map((item, index) => (
        <Image
          key={item._id}
          src={item.backdrop}
          alt=""
          fill
          sizes="100vw"
          priority={index === 0}
          className={`-z-20 object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/85 via-ink-950/30 to-transparent" />

      <div className="ms-container pb-10 pt-24 md:pb-14">
        <p className="text-sm font-medium text-gold">{details}</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          {movie.title}
        </h1>
        <p className="mt-4 line-clamp-3 max-w-xl text-base text-paper/80 md:text-lg">
          {movie.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href={`/movie/${movie._id}`} className="ms-btn ms-btn-primary">
            Ver detalles
          </Link>
          {movie.trailer && (
            <TrailerButton
              key={movie._id}
              trailerUrl={movie.trailer}
              onOpenChange={setIsTrailerOpen}
            />
          )}
        </div>

        {movies.length > 1 && (
          <div className="-ml-2 mt-6 flex">
            {movies.map((item, index) => (
              <button
                key={item._id}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Ver ${item.title}`}
                aria-current={index === current ? "true" : undefined}
                className="group flex h-8 w-10 items-center justify-center"
              >
                <span
                  className={`h-1 w-7 rounded-full transition-colors ${
                    index === current
                      ? "bg-gold"
                      : "bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
