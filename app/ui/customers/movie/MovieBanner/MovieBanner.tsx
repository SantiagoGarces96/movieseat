import React from "react";
import Image from "next/image";
import { MovieStatus } from "@/types/movie";
import TrailerButton from "./TrailerButton";

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
    <section className="relative w-full pt-16 sm:h-[350px] hd:h-[400px] fhd:h-[450px]">
      {/* Backdrop */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Image
          src={backdrop}
          alt={`${title} backdrop`}
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          className="brightness-75"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black opacity-70"></div>

      {/* Contenedor del contenido */}
      <div className="container relative z-20 mx-auto flex h-full items-center justify-center px-8 sm:px-6 md:px-8">
        <div className="flex w-screen flex-col items-center gap-8 sm:flex-row fhd:w-4/5">
          {/* Poster */}
          <div className="w-2/5 flex-shrink-0 overflow-hidden rounded-lg shadow-lg md:w-1/4 hd:w-1/5">
            <Image
              src={poster}
              alt={`${title} poster`}
              width={350}
              height={500}
              style={{ objectFit: "fill" }}
              className="rounded-lg"
              priority
            />
          </div>

          {/* Información de la película */}
          <div className="space-y-4 text-white sm:text-left">
            <h1 className="text-2xl font-bold md:text-3xl hd:text-4xl">
              {title}
            </h1>
            <p className="text-sm md:text-base hd:text-lg">{`Estreno: ${releaseDate}`}</p>
            <p className="text-sm md:text-base hd:text-lg">{`Duración: ${duration} min`}</p>
            <p className="text-sm md:text-base hd:text-lg">
              {genre.join(", ")}
            </p>

            {/* estado */}
            <div className="flex items-center space-x-2 sm:justify-start">
              <span
                className={`rounded px-2 py-1 text-xs text-white md:text-sm hd:text-base ${statusColors[status]}`}
              >
                {status === MovieStatus.PRE_SALE
                  ? "Preventa"
                  : status === MovieStatus.UPCOMING
                    ? "Próximamente"
                    : status === MovieStatus.BILLBOARD
                      ? "Cartelera"
                      : status}
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
