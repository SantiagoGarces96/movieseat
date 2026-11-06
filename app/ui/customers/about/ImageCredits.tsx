// Estas licencias piden nombrar al autor y enlazar la fuente. Las fotos fueron
// recortadas, y las de los combos combinan crispetas y gaseosa.
const credits = [
  { label: "Crispetas y combos", author: "Pink Sherbet Photography", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Popcorn_Love_(4304309769).jpg" },
  { label: "Perro caliente", author: "Evan Swigart", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Hot_dog_on_a_plate_-_Evan_Swigart.jpg" },
  { label: "Nachos", author: "Ewan Munro", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Ye_Old_White_Horse,_Holborn,_London_(3785360109).jpg" },
  { label: "Chocolatina", author: "Evan-Amos", license: "Dominio público", url: "https://commons.wikimedia.org/wiki/File:Candy-Skor-Broken.jpg" },
  { label: "Gaseosa y combos", author: "pic_p_ter", license: "Dominio público", url: "https://commons.wikimedia.org/wiki/File:Glass_cola.jpg" },
  { label: "Agua", author: "Yusuke Kawasaki", license: "Dominio público", url: "https://commons.wikimedia.org/wiki/File:InterContinental_Yokohama_Grand_bottled_water_20111101.jpg" },
  { label: "Sala 2D", author: "an-d", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Doberan_Kamp-Theater_Kinosaal_1.jpg" },
  { label: "Sala 3D", author: "Manuel Martín", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Experimentando_el_3D_1.jpg" },
  { label: "Sala IMAX", author: "Shahzaib Damn Cruze", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Interior_of_IMAX_cinema_in_Lahore_1.jpg" },
  { label: "Misión", author: "Autor desconocido", license: "Dominio público", url: "https://commons.wikimedia.org/wiki/File:Strand_Motion_Picture_Theater_entrance_at_419_North_Sixth_Street_featuring_advertisement_for_the_movie_%22Bootles%27_Baby.%22_Theater_was_located_on_the_west_side_of_Sixth_Street,_near_St._Charles_Street.jpg" },
  { label: "Visión", author: "Mattia Luigi Nappi", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Manual_film_projector.jpg" },
];

const ImageCredits = () => (
  <details className="rounded-2xl border border-white/5 bg-ink-900 p-5 text-sm text-muted">
    <summary className="cursor-pointer font-medium text-paper">
      Créditos de las imágenes
    </summary>
    <p className="mt-3">
      Fotos de Wikimedia Commons, adaptadas y recortadas para este sitio.
    </p>
    <ul className="mt-3 grid gap-x-6 gap-y-1.5 md:grid-cols-2">
      {credits.map(({ label, author, license, url }) => (
        <li key={label}>
          {label}:{" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="ms-link underline"
          >
            {author}
          </a>{" "}
          ({license})
        </li>
      ))}
    </ul>
  </details>
);

export default ImageCredits;
