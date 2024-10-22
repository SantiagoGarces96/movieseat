import Image from "next/image";

const TechnologiesSection = () => {
  return (
    <div className="mx-auto p-6 sm:w-full hd:w-3/4 fhd:w-2/3">
      <h1 className="mb-8 text-center text-4xl font-bold">Tecnologías</h1>

      {/* 2D Technology */}
      <div className="flex flex-col items-center justify-center overflow-hidden rounded-lg bg-white shadow-md md:flex-row">
        <div className="w-full p-6">
          <h2 className="mb-2 text-2xl font-semibold">2D</h2>
          <p className="text-gray-700">
            Esta es la experiencia clásica de cine, donde las películas se
            proyectan en una pantalla plana. Ofrece una excelente calidad de
            imagen y sonido, ideal para quienes prefieren disfrutar de una
            experiencia sencilla y tradicional, sin efectos visuales
            adicionales.
          </p>
        </div>
        <div className="relative h-96 w-full">
          <Image
            src="https://decoratel.com/wp-content/uploads/2020/01/elevadores-infantiles-para-ver-toy-story.jpg"
            alt="2D Cinema"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
          />
        </div>
      </div>

      {/* 3D Technology */}
      <div className="mt-8 flex flex-col-reverse items-center justify-between overflow-hidden rounded-lg bg-white shadow-md md:flex-row">
        <div className="relative h-96 w-full md:w-1/2">
          <Image
            src="https://media.airedesantafe.com.ar/p/6258ddf0867eec54cfa5d44f79b79b92/adjuntos/268/imagenes/003/690/0003690342/1200x0/smart/imagepng.png"
            alt="3D Cinema"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
          />
        </div>
        <div className="w-full p-6 md:w-1/2">
          <h2 className="mb-2 text-2xl font-semibold">3D</h2>
          <p className="text-gray-700">
            El 3D añade una sensación de profundidad a la película, haciendo que
            algunos elementos parezcan salir de la pantalla. Esto crea una
            experiencia más inmersiva, ideal para quienes disfrutan de una mayor
            interacción visual. Se necesitan gafas especiales, que te
            proporcionaremos en el cine.
          </p>
        </div>
      </div>

      {/* IMAX Technology */}
      <div className="mt-8 flex flex-col-reverse items-center justify-between overflow-hidden rounded-lg bg-white shadow-md md:flex-row">
        <div className="w-full p-6 md:w-1/2">
          <h2 className="mb-2 text-2xl font-semibold">IMAX</h2>
          <p className="text-gray-700">
            IMAX es una experiencia cinematográfica de alta gama, con pantallas
            mucho más grandes que las tradicionales y un sistema de sonido
            superior. Es perfecta para quienes buscan una experiencia
            impresionante, especialmente en películas de acción, documentales o
            ciencia ficción, donde cada detalle cuenta.
          </p>
        </div>
        <div className="relative h-96 w-full md:w-1/2">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/581bd18003596e16cc905cad/5b8a2d7a-6f9f-4b02-bec7-8fab0c40ae33/more-about-imax-news.jpg"
            alt="IMAX Cinema"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default TechnologiesSection;
