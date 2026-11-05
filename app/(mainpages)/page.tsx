import { getMovies } from "@/services/movies";
import { MovieStatus } from "@/types/movie";
import Hero from "@/app/ui/customers/Home/Hero";
import MovieSection from "@/app/ui/customers/Home/MovieSection";

export const revalidate = 60;

export default async function Page() {
  const [billboardMovies, upcomingMovies] = await Promise.all([
    getMovies(MovieStatus.BILLBOARD, "1", "6"),
    getMovies(MovieStatus.UPCOMING, "1", "6"),
  ]);

  const featured = billboardMovies.results.slice(0, 4).map((movie) => ({
    _id: movie._id,
    title: movie.title,
    backdrop: movie.backdrop,
    description: movie.description,
    genre: movie.genre,
    duration: movie.duration,
    trailer: movie.trailer,
  }));

  return (
    <>
      <Hero movies={featured} />
      <MovieSection
        title="En cartelera"
        href="/releases"
        movies={billboardMovies.results}
        emptyMessage="Por ahora no hay películas en cartelera."
      />
      <MovieSection
        title="Próximos estrenos"
        href="/upcoming"
        movies={upcomingMovies.results}
        emptyMessage="Por ahora no hay próximos estrenos."
      />
    </>
  );
}
