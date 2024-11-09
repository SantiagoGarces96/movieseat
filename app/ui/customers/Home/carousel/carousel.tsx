import Image from "next/image";

export const carouselImages = [
  {
    href: "https://www.cinemark.com.co/cartelera",
    src: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/content/covers/6328e0d30313c500096ec9ac/desktop/2x1-con-cine-club-gold-1727794305645",
    alt: "¡Bienvenidos a Cinemark Colombia!",
  },
  {
    href: "https://www.cinemark.com.co/gladiador-reestreno",
    src: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/content/covers/62cefeb052c9d40009cb92b6/desktop/preventa-gladiador-1-1727974271329",
    alt: "¡Bienvenidos a Cinemark Colombia!",
  },
  {
    href: "https://www.cinemark.com.co/cartelera",
    src: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/content/covers/63d155d4d5d0ed0008619be0/desktop/preventa-temporada-siniestra-1728406234740",
    alt: "¡Bienvenidos a Cinemark Colombia!",
  },
  {
    href: "https://www.cinemark.com.co/cartelera",
    src: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/content/covers/5e277bbf173202000792d827/desktop/premier-con-cine-club-1714403518867",
    alt: "¡Bienvenidos a Cinemark Colombia!",
  },
];

export const mobileImages = [
  {
    href: "https://www.cinemark.com.co/cartelera",
    src: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/content/covers/6328e0d30313c500096ec9ac/mobileresponsive/2x1-con-cine-club-gold-1727794305645",
    alt: "¡Bienvenidos a Cinemark Colombia!",
  },
  {
    href: "https://www.cinemark.com.co/cartelera",
    src: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/content/covers/62cefeb052c9d40009cb92b6/mobileresponsive/preventa-gladiador-2-1730395823443",
    alt: "¡Bienvenidos a Cinemark Colombia!",
  },
  {
    href: "https://www.cinemark.com.co/cartelera",
    src: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/content/covers/63d155d4d5d0ed0008619be0/mobileresponsive/preventa-temporada-siniestra-1728406234740",
    alt: "¡Bienvenidos a Cinemark Colombia!",
  },
  {
    href: "https://www.cinemark.com.co/cartelera",
    src: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/content/covers/63fe817c3a84b5000852860a/mobileresponsive/cine-club-gold-1720193703630",
    alt: "¡Bienvenidos a Cinemark Colombia!",
  },
];

interface CarouselProps {
  currentIndex: number;
}

const Carousel: React.FC<CarouselProps> = ({ currentIndex }) => {
  return (
    <div className="relative h-[250px] w-full overflow-hidden md:h-[300px] hd:h-[400px]">
      <a
        href={carouselImages[currentIndex].href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <div className="hidden md:block">
          <Image
            src={carouselImages[currentIndex].src}
            alt={carouselImages[currentIndex].alt}
            fill
            style={{ objectFit: "fill" }}
            className="w-full transition-transform duration-700"
          />
        </div>
        <div className="block md:hidden">
          <Image
            src={mobileImages[currentIndex].src}
            alt={mobileImages[currentIndex].alt}
            fill
            style={{ objectFit: "fill" }}
            className="w-full transition-transform duration-700"
          />
        </div>
      </a>
    </div>
  );
};

export default Carousel;
