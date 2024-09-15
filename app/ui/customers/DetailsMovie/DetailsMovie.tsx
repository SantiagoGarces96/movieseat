interface DetailsMovieProps {
    description: string;
    director: string;
    cast: string[];
    language: string[];
  }
  
  const DetailsMovie: React.FC<DetailsMovieProps> = ({
    description,
    director,
    cast,
    language,
  }) => {
    return (
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        {/* Descripción */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Descripción</h2>
          <p className="text-md text-gray-700">{description}</p>
        </div>
  
        {/* Director */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Director</h2>
          <p className="text-md text-gray-700">{director}</p>
        </div>
  
        {/* Elenco */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Elenco</h2>
          <p className="text-md text-gray-700">{cast.join(', ')}</p>
        </div>
  
        {/* Idioma */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Idioma</h2>
          <p className="text-md text-gray-700">{language.join(', ')}</p>
        </div>
      </div>
    );
  };
  
  export default DetailsMovie;
  