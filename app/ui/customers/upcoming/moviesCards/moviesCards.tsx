import React from "react";
import MovieCard from "@/app/ui/customers/card/MovieCard";
import MobileMovieCard from "@/app/ui/customers/card/MobileMovieCard";
import Button from "@/app/ui/customers/pagination/pagination";
import { IMovie } from "@/interfaces/movie";

interface PaginatedMoviesGridProps {
  movies: IMovie[];
  currentPage: number;
  totalPages: number;
  type: string;
  searchParams: { UpcomingPage?: string };
}

const PaginatedMoviesGrid: React.FC<PaginatedMoviesGridProps> = ({
  movies,
  currentPage,
  totalPages,
  type,
  searchParams,
}) => {
  return (
    <div className="w-full overflow-hidden">
      {/* Versión para pantallas grandes (HD, FHD, 2K) */}
      <div className="hidden grid-cols-1 gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="transform transition-transform hover:scale-105"
          >
            <MovieCard
              id={movie._id}
              title={movie.title}
              poster={movie.poster}
              status={movie.status}
              duration={movie.duration}
              releaseDate={movie.releaseDate}
              genre={movie.genre}
            />
          </div>
        ))}
      </div>

      {/* Versión para pantallas móviles y tablets */}
      <div className="block sm:hidden">
        {movies.map((movie) => (
          <div key={movie._id} className="mb-4">
            <MobileMovieCard
              id={movie._id}
              title={movie.title}
              poster={movie.poster}
              status={movie.status}
              duration={movie.duration}
              releaseDate={movie.releaseDate}
              genre={movie.genre}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Button
          currentPage={currentPage}
          totalPages={totalPages}
          type={type}
          searchParams={searchParams}
        />
      )}
    </div>
  );
};

export default PaginatedMoviesGrid;
