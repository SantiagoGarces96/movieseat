import React from "react";
import Box from "@/app/ui/customers/Home/Container/ContainerBillboard";
import PreSaleUpcomingBox from "@/app/ui/customers/Home/Container/ContainerUpcoming";
import { IMovie } from "@/interfaces/movie";
import { MovieStatus } from "@/types/movie";

const HomePage = async () => {
  let movies: IMovie[] = [];
  try {
    const response = await fetch("http://localhost:3000/api/movie", {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    movies = await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
  }

  return (
    <div className="pt-20 p-4">
          <h2 className="text-2xl font-bold my-6 capitalize">estrenos / cartelera</h2>
          <Box
            movies={movies.filter((movie) => movie.status === MovieStatus.BILLBOARD)}
          />

          <h2 className="text-2xl font-bold my-6 capitalize">
            Preventa / Próximo Estreno
          </h2>
          <PreSaleUpcomingBox movies={movies} />
        </div>

  );
};

export default HomePage;
