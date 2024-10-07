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
    <section className="relative h-[450px] w-full pt-16">
      {/* Backdrop */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
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
      <div className="absolute inset-0 z-10 bg-black opacity-70"></div>

      {/* Contenedor del contenido */}
      <div className="container relative z-20 mx-auto flex h-full items-center justify-center px-8">
        <div className="flex w-full flex-col items-center gap-8 fhd:w-4/5 fhd:flex-row">
          {/* Poster */}
          <div className="w-1/5 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={poster}
              alt={`${title} poster`}
              width={350}
              height={500}
              style={{ objectFit: "fill" }}
              className="rounded-lg"
            />
          </div>

          {/* Información de la película */}
          <div className="space-y-4 text-white">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-lg">{`Estreno: ${releaseDate}`}</p>
            <p className="text-md">{`Duración: ${duration} min`}</p>
            <p className="text-md">{genre.join(", ")}</p>

            {/* estado */}
            <div className="flex items-center space-x-2">
              <span
                className={`rounded px-2 py-1 text-white ${statusColors[status]}`}
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
