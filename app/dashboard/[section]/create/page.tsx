import CreateFood from "@/app/ui/dashboard/Food/components/Create";
import CreateMovie from "@/app/ui/dashboard/Movies/components/Create";
import CreateRoom from "@/app/ui/dashboard/Rooms/components/Create";
import CreateSession from "@/app/ui/dashboard/Sessions/components/Create";
import { AvailablesSections } from "@/types/sections";

export default async function Page({
  params,
}: {
  params: { section: string };
}) {
  const { section } = params;

  switch (section) {
    case AvailablesSections.SESSIONS:
      return <CreateSession />;

    case AvailablesSections.MOVIES:
      return <CreateMovie />;

    case AvailablesSections.ROOMS:
      return <CreateRoom />;

    case AvailablesSections.FOOD:
      return <CreateFood />;

    case AvailablesSections.USERS:
    // return <CreateUser />;

    case AvailablesSections.TICKETS:
    // return <CreateTicket />;

    default:
    // return <CreateTransaction />;
  }
}
