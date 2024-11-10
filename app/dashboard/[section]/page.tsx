import MoviesPage from "@/app/ui/dashboard/Movies";
import RoomsPage from "@/app/ui/dashboard/Rooms";
import SessionsPage from "@/app/ui/dashboard/Sessions";
import { routes } from "@/constants/dashboard/routes";
import { AvailablesSections } from "@/types/sections";
import { notFound } from "next/navigation";

interface IPageProps {
  params: {
    section: string;
  };
  searchParams: { [key: string]: string | undefined };
}

export async function generateStaticParams() {
  return routes.map((section) => {
    return { section };
  });
}

export default async function Page({ params, searchParams }: IPageProps) {
  const section: string =
    params.section.toUpperCase() as keyof typeof AvailablesSections;

  if (!(section in AvailablesSections)) {
    return notFound();
  }

  switch (section.toLowerCase()) {
    case AvailablesSections.SESSIONS:
      return <SessionsPage searchParams={searchParams} />;

    case AvailablesSections.MOVIES:
      return <MoviesPage searchParams={searchParams} />;

    case AvailablesSections.ROOMS:
      return <RoomsPage searchParams={searchParams} />;

    case AvailablesSections.FOOD:
    // return <FoodPage searchParams={searchParams} />;

    case AvailablesSections.USERS:
    // return <UsersPage searchParams={searchParams} />;

    case AvailablesSections.TICKETS:
    // return <TicketsPage searchParams={searchParams} />;

    default:
    // return <TransactionsPage searchParams={searchParams} />;
  }
}
