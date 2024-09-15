const DetailsMovieSkeleton: React.FC = () => {
    return (
      <div className="space-y-4 mt-8 animate-pulse">
        {/* Skeleton de la descripción */}
        <div className="h-6 bg-gray-300 w-5/6" />
        <div className="h-6 bg-gray-300 w-4/5" />
        <div className="h-6 bg-gray-300 w-2/3" />
  
        {/* Skeleton del director */}
        <div className="h-4 bg-gray-300 w-1/4 mt-6" />
        {/* Skeleton del elenco */}
        <div className="h-4 bg-gray-300 w-1/2 mt-4" />
        {/* Skeleton del idioma */}
        <div className="h-4 bg-gray-300 w-1/6 mt-4" />
      </div>
    );
  };
  
  export default DetailsMovieSkeleton;
  