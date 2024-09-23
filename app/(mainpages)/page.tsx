import Box from "@/app/ui/customers/Home/Container/ContainerBillboard";
import PreSaleUpcomingBox from "@/app/ui/customers/Home/Container/ContainerUpcoming";
import { IMovie } from "@/interfaces/movie";
import { getAllMovies } from "@/services/movies";
import { MovieStatus } from "@/types/movie";

export default async function page() {
  const movies: IMovie[] = await getAllMovies();
  return (
    <div className="p-4 pt-20">
      <h2 className="my-6 text-2xl font-bold capitalize">
        estrenos / cartelera
      </h2>
        <Box
          movies={movies.filter(
            (movie) => movie.status === MovieStatus.BILLBOARD,
          )}
        />
      <h2 className="my-6 text-2xl font-bold capitalize">
        Preventa / Próximo Estreno
      </h2>
      <PreSaleUpcomingBox movies={movies} />
    </div>
  );
}
