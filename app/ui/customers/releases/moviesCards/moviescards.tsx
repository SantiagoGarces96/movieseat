"use client";
import React, { useState } from "react";
import MovieCard from "@/app/ui/customers/card/MovieCard";
import PaginationControls from "@/app/ui/customers/pagination/pagination";
import { IMovie } from "@/interfaces/movie";
import { MovieStatus } from "@/types/movie";

interface PaginatedMoviesGridProps {
  movies: IMovie[];
}

const PaginatedMoviesGrid: React.FC<PaginatedMoviesGridProps> = ({
  movies,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardSize, setCardSize] = useState({ width: 330, height: 580 });
  const moviesPerPage = 12;

  const filteredMovies = movies
    .filter((movie) => movie.status === MovieStatus.BILLBOARD)
    .sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
    );

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentMovies = filteredMovies.slice(
    currentPage * moviesPerPage,
    (currentPage + 1) * moviesPerPage,
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentMovies.map((movie) => (
          <div
            key={movie._id}
            style={{ width: cardSize.width, height: cardSize.height }}
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

      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};
export default PaginatedMoviesGrid;
