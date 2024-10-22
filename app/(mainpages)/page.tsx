import PreSaleUpcomingBox from "@/app/ui/customers/Home/Container/ContainerUpcoming";
import { getMovies } from "@/services/movies";
import Box from "../ui/customers/Home/Container/ContainerBillboard";
import { MovieStatus } from "@/types/movie";
import CarouselNavigation from "@/app/ui/customers/Home/carousel/CarouselNavigation";

interface PageProps {
  searchParams: {
    billboardPage?: string;
    upcomingPage?: string;
    slide?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const billboardPage = searchParams.billboardPage || "1";
  const upcomingPage = searchParams.upcomingPage || "1";

  const billboardMovies = await getMovies(MovieStatus.BILLBOARD, billboardPage);
  const upcomingMovies = await getMovies(MovieStatus.UPCOMING, upcomingPage);

  return (
    <div className="mx-auto w-full">
      <div className="pb-6">
        <CarouselNavigation searchParams={searchParams} />
      </div>
      <Box
        movies={billboardMovies.results}
        currentPage={billboardMovies.page}
        totalPages={billboardMovies.totalPages}
        type={MovieStatus.BILLBOARD}
        searchParams={searchParams}
      />
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
