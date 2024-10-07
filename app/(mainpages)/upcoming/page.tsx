import React from "react";
import PaginatedMoviesGrid from "@/app/ui/customers/upcoming/moviesCards/moviesCards";
import { getMovies } from "@/services/movies";
import { MovieStatus } from "@/types/movie";

interface PageProps {
  searchParams: { UpcomingPage?: string };
}

export default async function UpcomingPage({ searchParams }: PageProps) {
  const UpcomingPage = searchParams.UpcomingPage || "1";

  const releasesMovies = await getMovies(
    MovieStatus.UPCOMING,
    UpcomingPage,
    "12",
  );

  return (
    <div className="container mx-auto p-4">
      <PaginatedMoviesGrid
        movies={releasesMovies.results}
        currentPage={releasesMovies.page}
        totalPages={releasesMovies.totalPages}
        type={MovieStatus.UPCOMING}
        searchParams={searchParams}
      />
    </div>
  );
}
