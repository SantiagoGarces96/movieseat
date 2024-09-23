import React from 'react';
import PaginatedMoviesGrid from "@/app/ui/customers/upcoming/moviesCards/moviesCards";
import { getAllMovies } from "@/services/movies";
import { IMovie } from "@/interfaces/movie";

export default async function page() {
  const UpcomingPage: IMovie[] = await getAllMovies();
  return (
    <div className="container mx-auto py-12 pt-20">
      <h1 className="text-4xl font-bold mb-6 capitalize">Proximos Estrenos</h1>
      <PaginatedMoviesGrid movies={UpcomingPage} />
    </div>
  );
};

