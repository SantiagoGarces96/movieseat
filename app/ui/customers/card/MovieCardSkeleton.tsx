const MovieCardSkeleton: React.FC = () => {
    return (
      <div className="bg-[#1E91D6] text-[#FFFDF6] p-4 rounded-lg shadow-md animate-pulse">
        <div className="w-full h-64 bg-gray-300 rounded-lg"></div> {/* Skeleton Image */}
        <div className="mt-4 h-6 bg-gray-300 rounded w-3/4"></div> {/* Skeleton Title */}
        <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div> {/* Skeleton Duration */}
        <div className="mt-2 h-4 bg-gray-300 rounded w-1/3"></div> {/* Release Date */}
        <div className="mt-2 h-4 bg-gray-300 rounded w-2/3"></div> {/* Genres */}
      </div>
    );
  };
  
  export default MovieCardSkeleton;
  