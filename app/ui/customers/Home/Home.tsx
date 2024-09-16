"use client";
import React, { useEffect, useState } from "react";
import MovieCardSkeleton from "@/app/ui/customers/Container/ContainerBillboardSkeleton";
import Box from "@/app/ui/customers/Container/ContainerBillboard";
import PreSaleUpcomingBox from "@/app/ui/customers/Container/ContainerUpcoming";
import { IMovie } from "@/interfaces/movie";
import { MovieStatus } from "@/types/movie";

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
    <div className="p-4">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
         <h2 className="text-2xl font-bold my-6 capitalize">
         estrenos / cartelera
          </h2>
          {/* Carousel of movies on "billboard" */}
          {movies && (
            <Box
              movies={movies.filter(
                (movie) => movie.status === MovieStatus.BILLBOARD
              )}
            />
          )}

          <h2 className="text-2xl font-bold my-6 capitalize">
            Preventa / Próximo Estreno
          </h2>

          {/* Carousel of movies on "pre-sale" and "upcoming" */}
          {movies && <PreSaleUpcomingBox movies={movies} />}
        </>
      )}
    </div>
  );
};

export default HomePage;
