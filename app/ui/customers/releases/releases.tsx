import React from 'react';
import PaginatedMoviesGrid from "@/app/ui/customers/releases/moviesCards/moviescards";
import { IMovie } from "@/interfaces/movie";

// Simulación de obtención de datos desde una API o base de datos
async function fetchMovies(): Promise<IMovie[]> {
  const res = await fetch("http://localhost:3000/api/movie", {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  return res.json();
}

const ReleasesPage = async () => {
  let movies: IMovie[] | null = null;

  try {
    movies = await fetchMovies();
  } catch (error) {
    console.error("Error fetching movies:", error);
  }

  if (!movies) {
    return <div>No movies found</div>;
  }

  return (
    <div className="container mx-auto py-12 pt-20">
      <h1 className="text-4xl font-bold mb-6">Estrenos</h1>
      <PaginatedMoviesGrid movies={movies} />
    </div>
  );
};

export default ReleasesPage;
