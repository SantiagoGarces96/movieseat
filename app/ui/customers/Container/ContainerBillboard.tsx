import React, { useState } from "react";
import MovieCard from "@/app/ui/customers/card/MovieCard";
import { IMovie } from "@/interfaces/movie";

interface BoxProps {
  movies: IMovie[];
}

const Box: React.FC<BoxProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesToShow = 6; // Mostrar una película a la vez
  const cardWidth = 300; // Ancho fijo para las tarjetas
  const cardHeight = 550; // Altura fija para las tarjetas

  // Función para ir a la siguiente película
  const nextPage = () => {
    if (currentIndex + moviesToShow < movies.length) {
      setCurrentIndex(currentIndex + moviesToShow);
    }
  };

  // Función para ir a la película anterior
  const prevPage = () => {
    if (currentIndex - moviesToShow >= 0) {
      setCurrentIndex(currentIndex - moviesToShow);
    }
  };

  // Obtener la película actual a mostrar
  const currentMovies = movies.slice(currentIndex, currentIndex + moviesToShow);

  return (
    <div className="relative flex items-center overflow-hidden">
      {/* Botón de flecha izquierda */}
      <button
        onClick={prevPage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
        disabled={currentIndex === 0} // Deshabilitar si estamos en la primera película
      >
        &lt;
      </button>

      {/* Carrusel de películas */}
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

      {/* Botón de flecha derecha */}
      <button
        onClick={nextPage}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
        disabled={currentIndex + moviesToShow >= movies.length} // Deshabilitar si estamos en la última película
      >
        &gt;
      </button>
    </div>
  );
};

export default Box;
