import React from "react";
import Image from "next/image";
import { MovieStatus } from "@/types/movie";
import Link from "next/link";
import { parseReleaseDate } from "@/utils/parseDate";

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
    <div className="col-span-1">
      <Link href={`/movie/${id}`}>
        <div className="flex w-full items-start overflow-hidden rounded-lg bg-white shadow-lg">
          {/* Imagen del poster usando Next Image */}
          <div className="relative h-[300px] w-[200px] min-w-[100px]">
            <Image
              src={poster}
              alt={title}
              width={400}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Información de la película */}
          <div className="flex w-2/3 flex-col justify-between p-4">
            <div>
              <h3 className="mb-1 text-sm font-bold leading-snug">{title}</h3>
              <p className="mb-1 text-sm text-gray-600">
                {`Estreno: ${parseReleaseDate(releaseDate)}`}
              </p>
              <p className="mb-1 text-sm text-gray-600">
                {`Género: ${genre.join(", ")}`}
              </p>
              <p className="mb-1 text-sm text-gray-600">
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
                    : status === MovieStatus.BILLBOARD
                      ? "Cartelera"
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
