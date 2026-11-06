import React from "react";
import MovieGrid from "@/app/ui/customers/movies/MovieGrid";
import PageHeader from "@/app/ui/customers/PageHeader";
import Pagination from "@/app/ui/customers/pagination/pagination";
import { getMovies } from "@/services/movies";
import { MovieStatus } from "@/types/movie";

interface PageProps {
  searchParams: Promise<{ releasesPage?: string }>;
}

export default async function ReleasesPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const movies = await getMovies(
    MovieStatus.BILLBOARD,
    searchParams.releasesPage || "1",
    "12",
  );

  return (
    <div className="ms-container py-10 md:py-14">
      <PageHeader
        title="Cartelera"
        description="Las películas que puedes ver ahora en cine."
      />
      <MovieGrid
        movies={movies.results}
        emptyMessage="Por ahora no hay películas en cartelera."
      />
      {movies.totalPages > 1 && (
        <Pagination
          currentPage={movies.page}
          totalPages={movies.totalPages}
          type={MovieStatus.BILLBOARD}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}
