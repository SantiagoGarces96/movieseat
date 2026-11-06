import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";

interface FoodsHeroProps {
  title: string;
  image: string;
  description?: string;
  showBackLink?: boolean;
  children: React.ReactNode;
}

const FoodsHero: React.FC<FoodsHeroProps> = ({
  title,
  image,
  description,
  showBackLink = false,
  children,
}) => (
  <div className="relative isolate">
    {/* Fija a la ventana: la foto se queda quieta y el contenido pasa encima. */}
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink-950/70" />
    </div>

    <header className="ms-container pb-10 pt-16 text-center md:pb-14 md:pt-28">
      {showBackLink && (
        <Link
          href="/foods"
          className="ms-link mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-paper/85"
        >
          <HiArrowLeft aria-hidden />
          Comidas
        </Link>
      )}
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
      {description && (
        <p className="mx-auto mt-3 max-w-2xl text-base text-paper/85 md:text-lg">
          {description}
        </p>
      )}
    </header>

    <div className="ms-container pb-10 md:pb-14">{children}</div>
  </div>
);

export default FoodsHero;
