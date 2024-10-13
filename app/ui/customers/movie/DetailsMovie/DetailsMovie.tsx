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
  const displayedCast = cast.slice(0, 7).join(", ");
  return (
    <div className="container mx-auto p-6 hd:p-12">
      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Descripción y detalles principales */}
        <div className="hd:w-1/3">
          <h2 className="mb-4 text-2xl font-bold">Sinopsis</h2>
          <p className="text-base text-gray-700">{description}</p>
        </div>

        {/* Director */}
        <div className="hd:w-1/3">
          <h2 className="mb-2 text-2xl font-bold">Director</h2>
          <p className="text-base text-gray-700">{director}</p>
        </div>

        {/* Elenco */}
        <div className="hd:w-1/3">
          <h2 className="mb-2 text-2xl font-bold">Elenco</h2>
          <p className="text-base text-gray-700">{displayedCast}</p>
        </div>

        {/* Idioma */}
        <div className="hd:w-1/3">
          <h2 className="mb-2 text-2xl font-bold">Idioma</h2>
          <p className="text-base text-gray-700">{language.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsMovie;
