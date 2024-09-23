import React from 'react';
import { IMovie } from '@/interfaces/movie';
import MovieBanner from '@/app/ui/customers/movie/MovieBanner/MovieBanner';
import DetailsMovie from '@/app/ui/customers/movie/DetailsMovie/DetailsMovie';
import { getMovieById } from '@/services/movies';

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movieId = params.id;
  const movie: IMovie | null = await getMovieById(movieId);

  if (!movie) {
    return <div>Película no encontrada</div>;
  }

  return (
    <div className="pt-16">
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

      <DetailsMovie
        description={movie.description}
        director={movie.director}
        cast={movie.cast}
        language={movie.language}
      />
    </div>
  );
}
