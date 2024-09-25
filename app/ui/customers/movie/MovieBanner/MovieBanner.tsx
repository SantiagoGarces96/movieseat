import React from 'react';
import Image from 'next/image';
import { MovieStatus } from '@/types/movie';
import TrailerButton from './TrailerButton';

interface MovieBannerProps {
  backdrop: string;
  poster: string;
  title: string;
  releaseDate: string;
  genre: string[];
  duration: number;
  trailer: string;
  status: MovieStatus;
}

const statusColors: Record<MovieStatus, string> = {
  [MovieStatus.PRE_SALE]: "bg-blue-500",
  [MovieStatus.UPCOMING]: "bg-yellow-500",
  [MovieStatus.BILLBOARD]: "bg-green-500",
  [MovieStatus.ARCHIVED]: "bg-gray-500",
};

const MovieBanner: React.FC<MovieBannerProps> = ({
  backdrop,
  poster,
  title,
  releaseDate,
  genre,
  duration,
  trailer,
  status,
}) => {
  return (
    <section className="relative w-full h-[450px] pt-16">
      {/* Backdrop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={backdrop}
          alt={`${title} backdrop`}
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          className="brightness-75" 
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70 z-10"></div>

      {/* Contenedor del contenido */}
      <div className="relative z-20 container mx-auto flex justify-center items-center h-full px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full lg:w-4/5">
          {/* Poster */}
          <div className="w-1/3 lg:w-1/4 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={poster}
              alt={`${title} poster`}
              width={350}
              height={600}
              style={{ objectFit: "fill" }}
              className="rounded-lg"
            />
          </div>

          {/* Información de la película */}
          <div className="text-white space-y-4 lg:w-3/4">
            <h1 className="text-4xl lg:text-5xl font-bold">{title}</h1>
            <p className="text-lg">{`Estreno: ${releaseDate}`}</p>
            <p className="text-md">{`Duración: ${duration} min`}</p>
            <p className="text-md">{genre.join(', ')}</p>

            {/* estado */}
            <div className="flex items-center space-x-2">
              <span className={`text-white px-2 py-1 rounded ${statusColors[status]}`}>
                {status}
              </span>
            </div>

            {/* Botón para el tráiler */}
            <TrailerButton trailerUrl={trailer} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieBanner;
