'use client';
import React, { useState, useEffect } from 'react';
import { IMovie } from '@/interfaces/movie';
import MovieBanner from '@/app/ui/customers/MovieBanner/MovieBanner';
import DetailsMovie from '@/app/ui/customers/DetailsMovie/DetailsMovie';
import MovieBannerSkeleton from '@/app/ui/customers/MovieBanner/MovieBannerSkeleton';
import DetailsMovieSkeleton from '@/app/ui/customers/DetailsMovie/DetailsMovieSkeleton';

interface MoviePageProps {
  params: { id: string };
}

async function fetchMovie(id: string): Promise<IMovie> {
  const res = await fetch(`http://localhost:3000/api/movie/${id}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch the movie');
  }

  return res.json();
}

const MoviePage: React.FC<MoviePageProps> = ({ params }) => {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const fetchedMovie = await fetchMovie(params.id);
        setMovie(fetchedMovie);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-12">
        <MovieBannerSkeleton />
        <DetailsMovieSkeleton />
      </div>
    );
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-12">
      {/* Movie Banner */}
      <MovieBanner
        backdrop={movie.backdrop}
        poster={movie.poster}
        title={movie.title}
        releaseDate={new Date(movie.releaseDate).toLocaleDateString()}
        genre={movie.genre}
        duration={movie.duration}
        trailer={movie.trailer}
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
