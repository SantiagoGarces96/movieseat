import PageHeader from "@/app/ui/customers/PageHeader";

const AboutContent = () => {
  return (
    <section>
      <PageHeader
        title="Nosotros"
        description="MovieSeat nace para que ir a cine sea fácil desde el primer clic: ver qué hay en cartelera, elegir tu película y disfrutarla."
      />
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-2xl border border-white/5 bg-ink-900 p-6 md:p-8">
          <h2 className="text-xl font-bold tracking-tight">Misión</h2>
          <p className="mt-2 text-muted">
            Ofrecer una forma clara y agradable de descubrir películas y
            planear tu salida a cine, sin distracciones.
          </p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-ink-900 p-6 md:p-8">
          <h2 className="text-xl font-bold tracking-tight">Visión</h2>
          <p className="mt-2 text-muted">
            Ser la plataforma que las personas prefieren para elegir su próxima
            película, por lo sencilla y confiable que es.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
