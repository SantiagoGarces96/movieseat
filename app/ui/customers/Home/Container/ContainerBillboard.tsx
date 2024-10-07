import React from "react";
import MovieCard from "@/app/ui/customers/card/MovieCard";
import MobileMovieCard from "@/app/ui/customers/card/MobileMovieCard";
import { IMovie } from "@/interfaces/movie";
import PaginationButtons from "./ButtonsContainers";

interface BoxProps {
  movies: IMovie[];
  currentPage: number;
  totalPages: number;
  type: string;
  searchParams: { billboardPage?: string; upcomingPage?: string };
}

const Box: React.FC<BoxProps> = ({
  movies,
  currentPage,
  totalPages,
  type,
  searchParams,
}) => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <div className="hidden w-full flex-wrap justify-center gap-4 px-8 py-4 md:flex">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="w-1/6 transform transition-transform hover:scale-105"
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

      {/* Vista para móviles */}
      <div className="block w-full px-4 md:hidden">
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
        {/* Botón de ver más solo para móviles */}
        <div className="mt-4 flex justify-center">
          <button className="font-semibold text-blue-500 underline">
            Ver más
          </button>
        </div>
      </div>

      {/* Botones de paginación */}
      <div className="absolute hidden w-full px-8 md:flex">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          type={type}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};

export default Box;
