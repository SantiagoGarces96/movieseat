import React from "react";
import MovieCard from "@/app/ui/customers/card/MovieCard";
import MobileMovieCard from "@/app/ui/customers/card/MobileMovieCard"; // El componente móvil
import { IMovie } from "@/interfaces/movie";
import { MovieStatus } from "@/types/movie";
import PaginationButtons from "./ButtonsContainers";

interface PreSaleUpcomingBoxProps {
  movies: IMovie[];
  currentPage: number;
}

const PreSaleUpcomingBox: React.FC<PreSaleUpcomingBoxProps> = ({ movies, currentPage }) => {
  const moviesPerPage = 5;

  const filteredMovies = movies
    .filter(
      (movie) =>
        movie.status === MovieStatus.PRE_SALE ||
        movie.status === MovieStatus.UPCOMING
    )
    .sort(
      (a, b) =>
        new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    );

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = filteredMovies.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  return (
    <div className="relative flex flex-col items-center overflow-hidden">
      {/* Grilla para pantallas grandes */}
      <div className="hidden sm:flex flex-wrap justify-center gap-4 py-4 w-full px-8">
        {currentMovies.map((movie) => (
          <div
            key={movie._id}
            className="transition-transform transform hover:scale-105 w-full sm:w-1/2 hd:w-1/3 fhd:w-1/6 2k:w-1/8 max-w-xs"
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
      <div className="block sm:hidden w-full px-4">
        {currentMovies.map((movie) => (
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
        <div className="flex justify-center mt-4">
          <button className="text-blue-500 font-semibold underline">
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
