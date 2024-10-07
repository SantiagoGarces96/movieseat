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
    <div className="flex w-full flex-col overflow-hidden">
      <h1 className="mb-6 flex justify-center text-4xl font-bold capitalize">
        Proximos Estrenos
      </h1>
      {/* Versión para pantallas grandes (HD, FHD, 2K) */}
      <div className="hidden flex-wrap justify-center gap-6 p-8 md:flex">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="w-[350px] transform transition-transform hover:scale-105"
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
      <div className="block w-full md:hidden md:p-0">
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
