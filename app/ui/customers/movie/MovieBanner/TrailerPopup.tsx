import React from "react";
import ReactPlayer from "react-player";
import { HiOutlineXMark } from "react-icons/hi2";

interface TrailerPopupProps {
  url: string;
  onClose: () => void;
}

const TrailerPopup: React.FC<TrailerPopupProps> = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-full max-w-4xl rounded-lg bg-black">
        {/* Close button*/}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-80 focus:outline-none"
        >
          <HiOutlineXMark className="h-8 w-8" />
        </button>

        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="70vh"
          playing={true}
        />
      </div>
    </div>
  );
};

export default TrailerPopup;
