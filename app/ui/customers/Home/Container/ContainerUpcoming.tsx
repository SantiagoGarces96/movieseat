"use client";
import React, { useState, useEffect } from "react";
import MovieCard from "@/app/ui/customers/card/MovieCard";
import { IMovie } from "@/interfaces/movie";
import { MovieStatus } from "@/types/movie";

interface PreSaleUpcomingBoxProps {
  movies: IMovie[];
}

const PreSaleUpcomingBox: React.FC<PreSaleUpcomingBoxProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moviesToShow, setMoviesToShow] = useState(4);
  const [cardSize, setCardSize] = useState({ width: 300, height: 550 });

  const filteredMovies = movies
    .filter(
      (movie) =>
        movie.status === MovieStatus.PRE_SALE ||
        movie.status === MovieStatus.UPCOMING
    )
    .sort(
      (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    );

  const updateMoviesToShow = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 3840) {
      setMoviesToShow(8); 
      setCardSize({ width: 320, height: 600 });
    } else if (screenWidth >= 1920) {
      setMoviesToShow(6); 
      setCardSize({ width: 300, height: 550 });
    } else if (screenWidth >= 1280) {
      setMoviesToShow(4); 
      setCardSize({ width: 280, height: 500 });
    } else if (screenWidth >= 720) {
      setMoviesToShow(3); 
      setCardSize({ width: 230, height: 430 });
    } else if (screenWidth >= 375) {
      setMoviesToShow(2);
      setCardSize({ width: 180, height: 400 });
    } else {
      setMoviesToShow(1);
      setCardSize({ width: 150, height: 330 });
    }
  };

  useEffect(() => {
    updateMoviesToShow();
    window.addEventListener("resize", updateMoviesToShow);
    return () => window.removeEventListener("resize", updateMoviesToShow);
  }, []);

  const nextPage = () => {
    if (currentIndex + moviesToShow < filteredMovies.length) {
      setCurrentIndex(currentIndex + moviesToShow);
    }
  };

  const prevPage = () => {
    if (currentIndex - moviesToShow >= 0) {
      setCurrentIndex(currentIndex - moviesToShow);
    }
  };

  const currentMovies = filteredMovies.slice(
    currentIndex,
    currentIndex + moviesToShow
  );

  return (
    <div className="relative flex items-center overflow-hidden">
      {/* Botón anterior fuera de las tarjetas */}
      <button
       onClick={prevPage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
        disabled={currentIndex === 0}
      >
        &lt;
      </button>

      {/* Contenedor de tarjetas de películas */}
      <div className="flex justify-center space-x-2 py-4 w-full px-8">
        {currentMovies.map((movie) => (
          <div
            key={movie._id}
            className="transition-transform transform hover:scale-105"
             style={{ width: cardSize.width, height: cardSize.height }}
          >
            <MovieCard
              id={movie._id}
              title={movie.title}
              poster={movie.poster}
              backdrop={movie.backdrop}
              status={movie.status}
              duration={movie.duration}
              releaseDate={new Date(movie.releaseDate).toLocaleDateString()}
              genre={movie.genre.slice(0, 3)}
            />
          </div>
        ))}
      </div>

      {/* Botón siguiente fuera de las tarjetas */}
      <button
          onClick={nextPage}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
        disabled={currentIndex + moviesToShow >= filteredMovies.length}
      >
        &gt;
      </button>
    </div>
  );
};

export default PreSaleUpcomingBox;
