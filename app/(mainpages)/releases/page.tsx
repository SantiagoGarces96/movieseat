import React from "react";
import PaginatedMoviesGrid from "@/app/ui/customers/releases/moviesCards/moviescards";
import { getAllMovies } from "@/services/movies";

interface PageProps {
  searchParams: { releasesPage?: string };
}

export default async function ReleasesPage({ searchParams }: PageProps) {
  const releasesPage = searchParams.releasesPage || "1";

  const releasesMovies = await getAllMovies("billboard", releasesPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-4xl font-bold capitalize">Cartelera</h1>
      <PaginatedMoviesGrid
        movies={releasesMovies.results}
        currentPage={releasesMovies.page}
        totalPages={releasesMovies.totalPages}
        type="billboard"
        searchParams={searchParams}
      />
    </div>
  );
}
