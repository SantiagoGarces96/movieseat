"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import TrailerPopup from './TrailerPopup';
import { MovieStatus } from '@/types/movie';

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
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const handleOpenTrailer = () => setShowTrailer(true);
  const handleCloseTrailer = () => setShowTrailer(false);


  return (
    <section className="relative w-full h-[450px] pt-16">
      {/* Backdrop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={backdrop}
          alt={`${title} backdrop`}
          layout="fill"
          objectFit="cover"
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
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Información de la película */}
          <div className="text-white space-y-4 lg:w-3/4">
            <h1 className="text-4xl lg:text-5xl font-bold">{title}</h1>
            <p className="text-lg">{`Estreno: ${releaseDate}`}</p>
            <p className="text-md">{`Duración: ${duration} min`}</p>
            <p className="text-md">{genre.join(', ')}</p>

            {/* Clasificación por edad y estado de preventa */}
            <div className="flex items-center space-x-2">
              <span className="bg-blue-600 text-white px-2 py-1 rounded">
                {status}
              </span>
            </div>

            {/* Botón para el tráiler */}
            <button
              onClick={handleOpenTrailer}
              className="mt-4 flex items-center bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132a1 1 0 00-1.555.832v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                ></path>
              </svg>
              Ver tráiler
            </button>
          </div>
        </div>
      </div>

      {/* Popup del tráiler */}
      {showTrailer && <TrailerPopup url={trailer} onClose={handleCloseTrailer} />}
    </section>
  );
};

export default MovieBanner;
