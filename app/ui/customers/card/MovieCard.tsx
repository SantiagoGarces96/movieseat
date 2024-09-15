import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation"; 
import { MovieStatus } from "@/types/movie";

export interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  backdrop: string;  // Asegúrate de recibir el backdrop
  status: MovieStatus;
  duration: number;
  releaseDate: string;
  genre: string[];
}

const statusColors: Record<MovieStatus, string> = {
  [MovieStatus.PRE_SALE]: "bg-blue-500",
  [MovieStatus.UPCOMING]: "bg-yellow-500",
  [MovieStatus.BILLBOARD]: "bg-green-500",
  [MovieStatus.ARCHIVED]: "bg-gray-500",
};

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster,
  backdrop,  // Recibimos el backdrop como propiedad
  status,
  duration,
  releaseDate,
  genre,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/movie/${id}`);
  };

  // Aseguramos que el status sea válido
  const statusLabel = status in statusColors
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "Unknown";

  // Manejo de la URL del poster o backdrop
  const imageUrl = poster !== "N/A" ? poster : (backdrop !== "N/A" ? backdrop : "/default-poster.png");

  const displayedGenres = genre.slice(0, 3).join(", ");

  return (
    <div
      className="col-span-1 md:col-span-3"
      data-aos="fade-up"
      data-aos-delay="0"
    >
      <a
        href={`/movie/${id}`}
        className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
        onClick={handleClick}
      >
        <div className="relative">
          <span
            className={`absolute top-2 left-2 text-white text-xs font-semibold py-1 px-2 rounded ${statusColors[status]}`}
            style={{ zIndex: 10 }} // Asegura que el sticker esté encima del contenido
          >
            {statusLabel}
          </span>
          <figure className="relative w-full h-96">
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="fill"
              className="rounded-t-lg"
            />
          </figure>
        </div>
        <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 truncate overflow-hidden whitespace-nowrap" style={{ width: '100%' }}>
            {title}
          </h2>
          <span className="block text-sm mb-1">Estreno: {new Date(releaseDate).toLocaleDateString()}</span>
          <span className="block text-sm mb-2">Género: {displayedGenres}</span>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-gray-200 text-gray-800 text-xs font-medium py-1 px-2 rounded">
              {duration} Min
            </span>
            <span className={`inline-block text-white text-xs font-medium py-1 px-2 rounded ${statusColors[status]}`}>
              {statusLabel}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default MovieCard;
