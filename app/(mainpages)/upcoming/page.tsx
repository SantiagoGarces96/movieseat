import React from "react";
import MovieGrid from "@/app/ui/customers/movies/MovieGrid";
import PageHeader from "@/app/ui/customers/PageHeader";
import Pagination from "@/app/ui/customers/pagination/pagination";
import { getMovies } from "@/services/movies";
import { MovieStatus } from "@/types/movie";

interface PageProps {
  searchParams: Promise<{ UpcomingPage?: string }>;
}

export default async function UpcomingPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const movies = await getMovies(
    MovieStatus.UPCOMING,
    searchParams.UpcomingPage || "1",
    "12",
  );

  return (
    <div className="ms-container py-10 md:py-14">
      <PageHeader
        title="Próximos estrenos"
        description="Lo que está por llegar a las salas."
      />
      <MovieGrid
        movies={movies.results}
        emptyMessage="Por ahora no hay próximos estrenos."
      />
      {movies.totalPages > 1 && (
        <Pagination
          currentPage={movies.page}
          totalPages={movies.totalPages}
          type={MovieStatus.UPCOMING}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}
