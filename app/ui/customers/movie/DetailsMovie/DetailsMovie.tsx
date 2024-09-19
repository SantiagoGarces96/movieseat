"use client";
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
    <div className="container mx-auto p-6 lg:p-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Descripción y detalles principales */}
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Sinopsis</h2>
          <p className="text-base text-gray-700">{description}</p>
        </div>

        {/* Director */}
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-bold mb-2">Director</h2>
          <p className="text-base text-gray-700">{director}</p>
        </div>

        {/* Elenco */}
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-bold mb-2">Elenco</h2>
          <p className="text-base text-gray-700">{displayedCast}</p>
        </div>

        {/* Idioma */}
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-bold mb-2">Idioma</h2>
          <p className="text-base text-gray-700">{language.join(', ')}</p>
        </div>
      </div>

      {/* Sección comentada: Fechas y funciones */}
      {/* Puedes descomentar esta parte si la necesitas */}
      {/*
      <div className="lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Fechas disponibles</h2>
        <div className="flex gap-4 mb-4">
          {dates.map((date) => (
            <button
              key={date}
              className="px-4 py-2 border rounded hover:bg-blue-500 hover:text-white transition"
            >
              {date}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Funciones por Multiplex</h2>
        <div className="space-y-4">
          {multiplexes.map((multiplex) => (
            <div key={multiplex} className="border rounded p-4">
              <h3 className="font-bold">{multiplex.name}</h3>
              <p>{multiplex.location}</p>
            </div>
          ))}
        </div>
      </div>
      */}
    </div>
  );
};

export default DetailsMovie;
