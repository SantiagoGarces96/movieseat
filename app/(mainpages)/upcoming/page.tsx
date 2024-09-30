import React from "react";
import PaginatedMoviesGrid from "@/app/ui/customers/upcoming/moviesCards/moviesCards";
import { getAllMovies } from "@/services/movies";

interface PageProps {
  searchParams: { UpcomingPage?: string };
}

export default async function UpcomingPage({ searchParams }: PageProps) {
  const UpcomingPage = searchParams.UpcomingPage || "1";

  const releasesMovies = await getAllMovies("upcoming", UpcomingPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-4xl font-bold capitalize">Proximos Estrenos</h1>
      <PaginatedMoviesGrid
        movies={releasesMovies.results}
        currentPage={releasesMovies.page}
        totalPages={releasesMovies.totalPages}
        type="upcoming"
        searchParams={searchParams}
      />
    </div>
  );
}
