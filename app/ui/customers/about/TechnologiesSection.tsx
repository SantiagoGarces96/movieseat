import Image from "next/image";

const formats = [
  {
    name: "2D",
    image: "/images/about/sala-2d.webp",
    alt: "Sala de cine con sillas rojas frente a la pantalla",
    description:
      "La experiencia clásica de cine en pantalla plana, con excelente imagen y sonido.",
  },
  {
    name: "3D",
    image: "/images/about/sala-3d.webp",
    alt: "Personas viendo una película con gafas 3D",
    description:
      "Suma profundidad a la película para una experiencia más inmersiva. Se ve con gafas especiales que te entregamos en el cine.",
  },
  {
    name: "IMAX",
    image: "/images/about/sala-imax.webp",
    alt: "Sala IMAX con pantalla gigante y sillas azules",
    description:
      "Pantallas mucho más grandes y un sonido superior, ideal para acción, documentales y ciencia ficción.",
  },
];

const TechnologiesSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
        Nuestras salas
      </h2>
      <p className="mb-6 mt-2 text-sm text-muted">
        Imágenes de referencia de cada formato.
      </p>
      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {formats.map(({ name, image, alt, description }) => (
          <article
            key={name}
            className="overflow-hidden rounded-2xl border border-white/5 bg-ink-900"
          >
            <div className="relative aspect-[16/10] bg-ink-800">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 830px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gold">{name}</h3>
              <p className="mt-2 text-muted">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TechnologiesSection;
