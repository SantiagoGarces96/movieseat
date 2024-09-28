import PreSaleUpcomingBox from "@/app/ui/customers/Home/Container/ContainerUpcoming";
import { getUpcomingMovies } from "@/services/movies";

interface PageProps {
  searchParams: { page?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const upcomingMovies = await getUpcomingMovies(searchParams.page);

  return (
    <div className="p-4">
      <h2 className="my-6 text-2xl font-bold capitalize">
        estrenos / cartelera
      </h2>
      {/* <Box
        movies={movies.filter(
          (movie) => movie.status === MovieStatus.BILLBOARD,
        )}
      /> */}
      <h2 className="my-6 text-2xl font-bold capitalize">
        Preventa / Próximo Estreno
      </h2>
      <PreSaleUpcomingBox
        movies={upcomingMovies.results}
        currentPage={upcomingMovies.page}
        totalPages={upcomingMovies.totalPages}
      />
    </div>
  );
}
