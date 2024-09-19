import React from 'react';
import { IMovie } from '@/interfaces/movie';
import MovieBanner from '@/app/ui/customers/movie/MovieBanner/MovieBanner';
import DetailsMovie from '@/app/ui/customers/movie/DetailsMovie/DetailsMovie';

interface MoviePageProps {
  params: { id: string };
}
 
async function fetchMovie(id: string): Promise<IMovie> {
  const res = await fetch(`http://localhost:3000/api/movie/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch the movie');
  }

  return res.json();
}

const MoviePage = async ({ params }: MoviePageProps) => {
  let movie: IMovie | null = null;

  try {
    movie = await fetchMovie(params.id);
  } catch (error) {
    console.error("Error fetching movie:", error);
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className=" pt-16">
      {/* Movie Banner */}
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

      {/* DetailsMovie */}
      <DetailsMovie
        description={movie.description}
        director={movie.director}
        cast={movie.cast}
        language={movie.language}
      />
    </div>
  );
};

export default MoviePage;
