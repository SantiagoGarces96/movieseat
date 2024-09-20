import Box from "@/app/ui/customers/Home/Container/ContainerBillboard";
import PreSaleUpcomingBox from "@/app/ui/customers/Home/Container/ContainerUpcoming";
import { IMovie } from "@/interfaces/movie";
import { getAllMovies } from "@/services/movies";
import { MovieStatus } from "@/types/movie";
import { Suspense } from "react";

export default async function page() {
  const movies: IMovie[] = await getAllMovies();
  return (
    <div className="p-4 pt-20">
      <h2 className="my-6 text-2xl font-bold capitalize">
        estrenos / cartelera
      </h2>
      <Suspense
        key="arneshteanrs"
        fallback={
          <div className="flex w-52 flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
        }
      >
        <Box
          movies={movies.filter(
            (movie) => movie.status === MovieStatus.BILLBOARD,
          )}
        />
      </Suspense>
      <h2 className="my-6 text-2xl font-bold capitalize">
        Preventa / Próximo Estreno
      </h2>
      <PreSaleUpcomingBox movies={movies} />
    </div>
  );
}
