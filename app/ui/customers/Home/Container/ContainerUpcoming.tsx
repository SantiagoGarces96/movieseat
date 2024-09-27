import React from "react";
import MovieCard from "@/app/ui/customers/card/MovieCard";
import MobileMovieCard from "@/app/ui/customers/card/MobileMovieCard"; // El componente móvil
import { IMovie } from "@/interfaces/movie";
import { MovieStatus } from "@/types/movie";
import PaginationButtons from "./ButtonsContainers";

interface PreSaleUpcomingBoxProps {
  movies: IMovie[];
  currentPage: number;
  totalPages: number;
}

const PreSaleUpcomingBox: React.FC<PreSaleUpcomingBoxProps> = ({
  movies,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="relative flex flex-col items-center overflow-hidden">
      {/* Grilla para pantallas grandes */}
      <div className="hidden w-full flex-wrap justify-center gap-4 px-8 py-4 sm:flex">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="hd:w-1/3 fhd:w-1/6 2k:w-1/8 w-full max-w-xs transform transition-transform hover:scale-105 sm:w-1/2"
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
      <div className="block w-full px-4 sm:hidden">
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
      <PaginationButtons currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default PreSaleUpcomingBox;
