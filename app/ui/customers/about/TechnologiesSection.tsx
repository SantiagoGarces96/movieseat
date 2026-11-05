const formats = [
  {
    name: "2D",
    description:
      "La experiencia clásica de cine en pantalla plana, con excelente imagen y sonido.",
  },
  {
    name: "3D",
    description:
      "Suma profundidad a la película para una experiencia más inmersiva. Se ve con gafas especiales que te entregamos en el cine.",
  },
  {
    name: "IMAX",
    description:
      "Pantallas mucho más grandes y un sonido superior, ideal para acción, documentales y ciencia ficción.",
  },
];

const TechnologiesSection = () => {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
        Formatos
      </h2>
      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {formats.map(({ name, description }) => (
          <div
            key={name}
            className="rounded-2xl border border-white/5 bg-ink-900 p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold text-gold">{name}</h3>
            <p className="mt-2 text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologiesSection;
