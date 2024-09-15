import React from "react";

const MovieCardSkeleton: React.FC = () => {
  const cardWidth = 300;
  const cardHeight = 550;

  return (
    <div
      className="flex-shrink-0 bg-gray-200 animate-pulse"
      style={{ width: cardWidth, height: cardHeight }}
    >
      <div
        className="w-full h-3/5 bg-gray-300"
        style={{ borderRadius: "0.5rem" }}
      ></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
