import Image from "next/image";
import React from "react";

interface MovieCardProps {
  title: string;
  poster: string;
  duration: number;
  releaseDate: string;
  genre: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  poster,
  duration,
  releaseDate,
  genre,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="image-container">
        {poster !== "N/A" ? (
          <Image
            src={poster}
            alt={title}
            layout="responsive"
            width={300}
            height={450}
          />
        ) : (
          <div className="placeholder">No image available</div>
        )}
      </div>
      <div className="info">
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="mt-2">Duración: {duration} minutos</p>
      <p className="mt-2">Fecha de estreno: {releaseDate}</p>
      <p className="mt-2">Géneros: {genre.join(", ")}</p>
    </div>
    </div>
  );
};

export default MovieCard;
