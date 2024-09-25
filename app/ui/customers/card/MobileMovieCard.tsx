import React from "react";
import Image from "next/image";
import { MovieStatus } from "@/types/movie";
import Link from "next/link";

interface MobileMovieCardProps {
  id: string;
  title: string;
  poster: string;
  status: MovieStatus;
  duration: number;
  releaseDate: Date;
  genre: string[];
}

const statusColors: Record<MovieStatus, string> = {
  [MovieStatus.PRE_SALE]: "bg-blue-500",
  [MovieStatus.UPCOMING]: "bg-yellow-500",
  [MovieStatus.BILLBOARD]: "bg-green-500",
  [MovieStatus.ARCHIVED]: "bg-gray-500",
};

const MobileMovieCard: React.FC<MobileMovieCardProps> = ({
  id,
  title,
  poster,
  status,
  duration,
  releaseDate,
  genre,
}) => {
  return (
    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
      <Link href={`/movie/${id}`}>
        <div className="flex flex-row items-start w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Imagen del poster usando Next Image */}
          <div className="w-1/3 min-w-[100px]">
            <Image
              src={poster}
              alt={title}
              width={600}
              height={850}
              className="w-full h-auto object-cover"
              priority={true}
            />
          </div>

         {/* Información de la película */}
<div className="w-2/3 p-4 flex flex-col justify-between">
  <div>
    <h3 className="text-sm font-bold mb-1 leading-snug">
      {title}
    </h3>
    <p className="text-sm text-gray-600 mb-1">
      {`Estreno: ${new Date(releaseDate).toLocaleDateString()}`}
    </p>
    <p className="text-sm text-gray-600 mb-1">
      {`Género: ${genre.join(", ")}`}
    </p>
    <p className="text-sm text-gray-600 mb-1">
      {`Duración: ${duration} Min`}
    </p>
  </div>

  {/* Estado de la película */}
  <div className="mt-2">
    <span
      className={`inline-block rounded px-2 py-1 text-xs font-semibold text-white ${statusColors[status]}`}
    >
      {status === MovieStatus.PRE_SALE
        ? "Preventa"
        : status === MovieStatus.UPCOMING
        ? "Próximamente"
        : status}
    </span>
  </div>
</div>

        </div>
      </Link>
    </div>
  );
};

export default MobileMovieCard;
