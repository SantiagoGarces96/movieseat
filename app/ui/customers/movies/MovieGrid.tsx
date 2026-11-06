import React from "react";
import MovieCard from "@/app/ui/customers/card/MovieCard";
import { IMovie } from "@/interfaces/movie";

interface MovieGridProps {
  movies: IMovie[];
  emptyMessage: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, emptyMessage }) => {
  if (!movies.length) {
    return (
      <p className="rounded-2xl border border-white/5 bg-ink-900 px-6 py-12 text-center text-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          id={movie._id}
          title={movie.title}
          poster={movie.poster}
          status={movie.status}
          duration={movie.duration}
          releaseDate={movie.releaseDate}
          genre={movie.genre}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
