import React from 'react';
import ReactPlayer from 'react-player';

interface TrailerPopupProps {
  url: string;
  onClose: () => void;
}

const TrailerPopup: React.FC<TrailerPopupProps> = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative bg-black rounded-lg max-w-4xl w-full">
        {/* Botón para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* ReactPlayero */}
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

