"use client";
import React, { useState } from "react";
import { HiOutlinePlay } from "react-icons/hi2";
import TrailerPopup from "./TrailerPopup";

interface TrailerButtonProps {
  trailerUrl: string;
}

const TrailerButton: React.FC<TrailerButtonProps> = ({ trailerUrl }) => {
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const handleOpenTrailer = () => setShowTrailer(true);
  const handleCloseTrailer = () => setShowTrailer(false);

  return (
    <>
      <button
        onClick={handleOpenTrailer}
        className="mt-4 flex items-center rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 md:text-sm hd:text-base"
      >
        <HiOutlinePlay />
        Ver tráiler
      </button>

      {showTrailer && (
        <TrailerPopup url={trailerUrl} onClose={handleCloseTrailer} />
      )}
    </>
  );
};

export default TrailerButton;
