import React, { useState } from 'react';
import Image from 'next/image';
import TrailerPopup from './TrailerPopup';

interface MovieBannerProps {
  backdrop: string;
  poster: string;
  title: string;
  releaseDate: string;
  genre: string[];
  duration: number;
  trailer: string;
}

const MovieBanner: React.FC<MovieBannerProps> = ({
  backdrop,
  poster,
  title,
  releaseDate,
  genre,
  duration,
  trailer,
}) => {
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const handleOpenTrailer = () => setShowTrailer(true);
  const handleCloseTrailer = () => setShowTrailer(false);

  const imageUrl = poster !== "N/A" ? poster : (backdrop !== "N/A" ? backdrop : "/default-poster.png");

  return (
    <div className="relative w-full h-96">
      {/* Backdrop */}
      <div className="absolute inset-0">
        <Image
          src={backdrop}
          alt={`${title} backdrop`}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative container mx-auto flex items-center gap-4 p-4">
        {/* Poster */}
        <div className="w-1/5">
          <Image
            src={imageUrl} 
            alt={`${title} poster`}
            width={360}
            height={250}

          />
        </div>
        {/* Movie Info */}
        <div className="w-2/3 text-white">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg mt-2">{releaseDate}</p>
          <p className="text-md mt-2">{genre.join(', ')}</p>
          <p className="text-md mt-2">Duración: {duration} minutos</p>
          <button
            onClick={handleOpenTrailer}
            className="mt-4 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
          >
            Ver tráiler
          </button>
        </div>
      </div>
      {/* Trailer Popup */}
      {showTrailer && (
        <TrailerPopup url={trailer} onClose={handleCloseTrailer} />
      )}
    </div>
  );
};

export default MovieBanner;
