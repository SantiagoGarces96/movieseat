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
  const facts = [
    { label: "Director", value: director },
    { label: "Elenco", value: cast.slice(0, 7).join(", ") },
    { label: "Idioma", value: language.join(", ") },
  ];

  return (
    <div className="ms-container grid gap-10 py-10 lg:grid-cols-3 lg:gap-16">
      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">
          Sinopsis
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-paper/80">
          {description}
        </p>
      </div>

      <dl className="space-y-5">
        {facts.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-sm font-semibold text-muted">{label}</dt>
            <dd className="mt-1 text-base">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default DetailsMovie;
