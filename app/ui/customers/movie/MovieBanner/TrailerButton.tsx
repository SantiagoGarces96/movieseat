"use client";
import React, { useState } from "react";
import { HiPlay } from "react-icons/hi2";
import TrailerPopup from "./TrailerPopup";

interface TrailerButtonProps {
  trailerUrl: string;
  onOpenChange?: (isOpen: boolean) => void;
}

const TrailerButton: React.FC<TrailerButtonProps> = ({
  trailerUrl,
  onOpenChange,
}) => {
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const toggleTrailer = (isOpen: boolean) => {
    setShowTrailer(isOpen);
    onOpenChange?.(isOpen);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => toggleTrailer(true)}
        className="ms-btn ms-btn-secondary"
      >
        <HiPlay className="h-4 w-4" aria-hidden />
        Ver tráiler
      </button>

      {showTrailer && (
        <TrailerPopup url={trailerUrl} onClose={() => toggleTrailer(false)} />
      )}
    </>
  );
};

export default TrailerButton;
