import Image from "next/image";
import PageHeader from "@/app/ui/customers/PageHeader";

const purposes = [
  {
    title: "Misión",
    image: "/images/about/mision.webp",
    alt: "Entrada de un cine antiguo",
    text: "Ofrecer una forma clara y agradable de descubrir películas y planear tu salida a cine, sin distracciones.",
  },
  {
    title: "Visión",
    image: "/images/about/vision.webp",
    alt: "Proyector de cine clásico",
    text: "Ser la plataforma que las personas prefieren para elegir su próxima película, por lo sencilla y confiable que es.",
  },
];

const AboutContent = () => {
  return (
    <section>
      <PageHeader
        title="Nosotros"
        description="MovieSeat nace para que ir a cine sea fácil desde el primer clic: ver qué hay en cartelera, elegir tu película y disfrutarla."
      />
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {purposes.map(({ title, image, alt, text }) => (
          <article
            key={title}
            className="overflow-hidden rounded-2xl border border-white/5 bg-ink-900"
          >
            <div className="relative aspect-[16/9] bg-ink-800">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 830px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold tracking-tight">{title}</h2>
              <p className="mt-2 text-muted">{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AboutContent;
