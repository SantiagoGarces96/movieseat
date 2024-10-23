import SessionsPage from "@/app/ui/dashboard/Sessions";
import { AvailablesSections } from "@/types/sections";
import { notFound } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { section: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const section: string =
    params.section.toUpperCase() as keyof typeof AvailablesSections;

  if (!(section in AvailablesSections)) {
    return notFound();
  }

  switch (section.toLowerCase()) {
    case AvailablesSections.SESSIONS:
      return <SessionsPage searchParams={searchParams} />;

    case AvailablesSections.MOVIES:
    // return <MoviesPage searchParams={searchParams} />;

    case AvailablesSections.ROOMS:
    // return <RoomsPage searchParams={searchParams} />;

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
