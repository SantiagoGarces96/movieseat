import PreSaleUpcomingBox from "@/app/ui/customers/Home/Container/ContainerUpcoming";
import { getMovies } from "@/services/movies";
import Box from "../ui/customers/Home/Container/ContainerBillboard";
import { MovieStatus } from "@/types/movie";

interface PageProps {
  searchParams: { billboardPage?: string; upcomingPage?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const billboardPage = searchParams.billboardPage || "1";
  const upcomingPage = searchParams.upcomingPage || "1";

  const billboardMovies = await getMovies(MovieStatus.BILLBOARD, billboardPage);
  const upcomingMovies = await getMovies(MovieStatus.UPCOMING, upcomingPage);

  return (
    <div className="p-4">
      <h2 className="my-6 text-2xl font-bold capitalize">
        Estrenos / Cartelera
      </h2>
      <Box
        movies={billboardMovies.results}
        currentPage={billboardMovies.page}
        totalPages={billboardMovies.totalPages}
        type={MovieStatus.BILLBOARD}
        searchParams={searchParams}
      />
      <h2 className="my-6 text-2xl font-bold capitalize">
        Preventa / Próximo Estreno
      </h2>
      <PreSaleUpcomingBox
        movies={upcomingMovies.results}
        currentPage={upcomingMovies.page}
        totalPages={upcomingMovies.totalPages}
        type={MovieStatus.UPCOMING}
        searchParams={searchParams}
      />
    </div>
  );
}
