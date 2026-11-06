import React from "react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import MovieGrid from "@/app/ui/customers/movies/MovieGrid";
import { IMovie } from "@/interfaces/movie";

interface MovieSectionProps {
  title: string;
  href: string;
  movies: IMovie[];
  emptyMessage: string;
}

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  href,
  movies,
  emptyMessage,
}) => (
  <section className="ms-container mt-12 md:mt-16">
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      <Link
        href={href}
        className="ms-link inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light"
      >
        Ver todo
        <HiArrowRight aria-hidden />
      </Link>
    </div>
    <MovieGrid movies={movies} emptyMessage={emptyMessage} />
  </section>
);

export default MovieSection;
