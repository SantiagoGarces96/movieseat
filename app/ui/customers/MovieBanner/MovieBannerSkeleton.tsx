const MovieBannerSkeleton: React.FC = () => {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start w-full h-[600px] bg-gray-200 animate-pulse">
        {/* Skeleton del backdrop */}
        <div className="w-full h-full bg-gray-300" />
  
        {/* Skeleton del poster */}
        <div className="w-[360px] h-[550px] bg-gray-300 mt-4 md:mt-0 md:mr-6" />
  
        {/* Skeleton del contenido a la derecha */}
        <div className="flex-1 mt-4 md:mt-0 space-y-4">
          {/* Skeleton del título */}
          <div className="h-8 bg-gray-300 w-3/4" />
          {/* Skeleton de la fecha de estreno */}
          <div className="h-4 bg-gray-300 w-1/4" />
          {/* Skeleton de los géneros */}
          <div className="h-4 bg-gray-300 w-1/3" />
          {/* Skeleton de la duración */}
          <div className="h-4 bg-gray-300 w-1/6" />
          {/* Skeleton del botón */}
          <div className="h-10 bg-gray-300 w-24 mt-4" />
        </div>
      </div>
    );
  };
  
  export default MovieBannerSkeleton;
  