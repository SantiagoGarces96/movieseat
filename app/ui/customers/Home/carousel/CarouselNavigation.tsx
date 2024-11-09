"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Carousel, { carouselImages } from "./carousel";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

interface CarouselNavigationProps {
  searchParams: {
    slide?: string;
  };
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  searchParams,
}) => {
  const totalImages = carouselImages.length;
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const slideIndex = parseInt(searchParams.slide || "0") % totalImages;
    setCurrentSlide(slideIndex);
  }, [searchParams.slide, totalImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % totalImages);
    }, 10000);

    return () => clearInterval(interval);
  }, [totalImages]);

  const prevIndex = (currentSlide - 1 + totalImages) % totalImages;
  const nextIndex = (currentSlide + 1) % totalImages;

  const generateHref = (newIndex: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("slide", String(newIndex));
    return `?${params.toString()}`;
  };

  return (
    <div className="relative">
      <Carousel currentIndex={currentSlide} />

      <div className="absolute top-1/2 flex w-full justify-between px-4">
        <Link
          href={generateHref(prevIndex)}
          className="rounded-md bg-gray-800 p-2 text-white"
          aria-label="previous slide"
        >
          <HiOutlineChevronLeft className="h-6 w-6" />
        </Link>

        <Link
          href={generateHref(nextIndex)}
          className="rounded-md bg-gray-800 p-2 text-white"
          aria-label="next slide"
        >
          <HiOutlineChevronRight className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default CarouselNavigation;
