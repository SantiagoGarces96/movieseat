const AboutContent = () => {
  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-center text-4xl font-bold">Nosotros</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Visión</h2>
        <p className="text-gray-700">
          Queremos ser reconocidos constantemente como la empresa de
          entretenimiento más importante de Colombia y una de las mejores en
          cuanto a servicio y tecnología en toda Latinoamérica.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Misión</h2>
        <p className="text-gray-700">
          Nos dedicamos a ofrecer experiencias de diversión y entretenimiento
          saludables a través de la proyección de películas y servicios
          complementarios. Buscamos generar los ingresos necesarios para
          mantener un ambiente de trabajo favorable y en crecimiento para
          nuestros empleados, mientras proporcionamos buenos resultados a los
          accionistas y contribuimos al bienestar de las comunidades donde
          estamos presentes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Principios</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li className="mb-2">
            <strong>Honestidad:</strong> Manejamos con responsabilidad y cuidado
            todos los recursos y materiales a nuestro cargo.
          </li>
          <li className="mb-2">
            <strong>Respeto:</strong> Fomentamos el respeto tanto hacia uno
            mismo como hacia los demás, aceptando las diferencias.
          </li>
          <li className="mb-2">
            <strong>Agregar valor:</strong> Todas nuestras acciones están
            orientadas a generar beneficios para nuestros clientes.
          </li>
          <li className="mb-2">
            <strong>Servicio excelente al cliente:</strong> Nos esforzamos por
            ofrecer un servicio sobresaliente, caracterizado.
          </li>
          <li className="mb-2">
            <strong>Cumplimiento de las leyes:</strong> Cumplimos rigurosamente
            con todas las normativas internas y legales.
          </li>
          <li className="mb-2">
            <strong>Justicia:</strong> Nuestras decisiones, análisis y
            evaluaciones se basan siempre en la equidad.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutContent;
