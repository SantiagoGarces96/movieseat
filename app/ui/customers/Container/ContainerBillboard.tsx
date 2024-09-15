import React, { useState } from "react";
import MovieCard from "@/app/ui/customers/card/MovieCard";
import { IMovie } from "@/interfaces/movie";

interface BoxProps {
  movies: IMovie[];
}

const Box: React.FC<BoxProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesToShow = 6;
  const cardWidth = 300;
  const cardHeight = 550;
  const nextPage = () => {
    if (currentIndex + moviesToShow < movies.length) {
      setCurrentIndex(currentIndex + moviesToShow);
    }
  };

 
  const prevPage = () => {
    if (currentIndex - moviesToShow >= 0) {
      setCurrentIndex(currentIndex - moviesToShow);
    }
  };

  
  const currentMovies = movies.slice(currentIndex, currentIndex + moviesToShow);

  return (
    <div className="relative flex items-center overflow-hidden">
      {/* Left arrow button */}
      <button
        onClick={prevPage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
        disabled={currentIndex === 0}
      >
        &lt;
      </button>

      {/* Carousel of movies */}
      <div className="flex space-x-4 py-4">
        {currentMovies.map((movie) => (
          <div
            key={movie._id}
            className="flex-shrink-0"
            style={{ width: cardWidth, height: cardHeight }}
          >
            <MovieCard
              id={movie._id}
              title={movie.title}
              poster={movie.poster}
              backdrop={movie.backdrop}
              status={movie.status}
              duration={movie.duration}
              releaseDate={new Date(movie.releaseDate).toLocaleDateString()}
              genre={movie.genre}
            />
          </div>
        ))}
      </div>

      {/* Right arrow button */}
      <button
        onClick={nextPage}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
        disabled={currentIndex + moviesToShow >= movies.length} 
      >
        &gt;
      </button>
    </div>
  );
};

export default Box;
