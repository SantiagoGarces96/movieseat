import React from "react";
import Link from "next/link";
import { IMovie } from "@/interfaces/movie";
import MovieBanner from "@/app/ui/customers/movie/MovieBanner/MovieBanner";
import DetailsMovie from "@/app/ui/customers/movie/DetailsMovie/DetailsMovie";
import { getAllMovies, getMovieById } from "@/services/movies";
import { getSessionByIdMovie } from "@/services/sessions";
import { formatReleaseDate } from "@/utils/format";

interface MoviePageProps {
  params: { id: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const movies = await getAllMovies();
  return movies.map(({ _id }) => {
    return { id: _id.toString() };
  });
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movieId = params.id;
  const movie: IMovie | null = await getMovieById(movieId);

  await getSessionByIdMovie(movieId);

  if (!movie) {
    return (
      <div className="ms-container py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          No encontramos esta película
        </h1>
        <p className="mt-2 text-muted">
          Puede que ya no esté disponible. Revisa lo que hay en cartelera.
        </p>
        <Link href="/releases" className="ms-btn ms-btn-primary mt-6">
          Ir a la cartelera
        </Link>
      </div>
    );
  }

  return (
    <>
      <MovieBanner
        backdrop={movie.backdrop}
        poster={movie.poster}
        title={movie.title}
        releaseDate={formatReleaseDate(movie.releaseDate)}
        genre={movie.genre}
        duration={movie.duration}
        trailer={movie.trailer}
        status={movie.status}
      />
      <DetailsMovie
        description={movie.description}
        director={movie.director}
        cast={movie.cast}
        language={movie.language}
      />
    </>
  );
}
