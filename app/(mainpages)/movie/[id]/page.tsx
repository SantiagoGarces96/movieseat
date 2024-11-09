import React from "react";
import { IMovie } from "@/interfaces/movie";
import MovieBanner from "@/app/ui/customers/movie/MovieBanner/MovieBanner";
import DetailsMovie from "@/app/ui/customers/movie/DetailsMovie/DetailsMovie";
import { getAllMovies, getMovieById } from "@/services/movies";
import { getSessionByIdMovie } from "@/services/sessions";

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
    return <div>Película no encontrada</div>;
  }

  return (
    <div>
      <MovieBanner
        backdrop={movie.backdrop}
        poster={movie.poster}
        title={movie.title}
        releaseDate={new Date(movie.releaseDate).toLocaleDateString()}
        genre={movie.genre}
        duration={movie.duration}
        trailer={movie.trailer}
        status={movie.status}
      />
      <div className="py-8">
        <DetailsMovie
          description={movie.description}
          director={movie.director}
          cast={movie.cast}
          language={movie.language}
        />
      </div>
    </div>
  );
}
