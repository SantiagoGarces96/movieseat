import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { HiOutlineXMark } from "react-icons/hi2";

interface TrailerPopupProps {
  url: string;
  onClose: () => void;
}

const TrailerPopup: React.FC<TrailerPopupProps> = ({ url, onClose }) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tráiler"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar tráiler"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <HiOutlineXMark className="h-6 w-6" aria-hidden />
      </button>
      <div
        className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
        onClick={(event) => event.stopPropagation()}
      >
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          playing={true}
        />
      </div>
    </div>
  );
};

export default TrailerPopup;
