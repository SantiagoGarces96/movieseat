"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "@/app/ui/customers/card/MovieCard";
import MovieCardSkeleton from "@/app/ui/customers/card/MovieCardSkeleton";
import { IMovie } from "@/interfaces/movie";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movie/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las películas:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {loading
        ? Array.from({ length: 1 }).map((_, index) => <MovieCardSkeleton key={index} />) // Muestra 6 skeletons mientras carga
        : movies?.map((movie, index) => (
            <MovieCard
              key={movie._id}
              title={movie.title}
              poster={movie.poster}
              duration={movie.duration}
              releaseDate={new Date(movie.releaseDate).toLocaleDateString()}
              genre={movie.genre}
            />
          ))}
    </div>
  );
};

export default HomePage;
