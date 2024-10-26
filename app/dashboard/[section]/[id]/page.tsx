import EditMovie from "@/app/ui/dashboard/Movies/components/Edit";
import EditSession from "@/app/ui/dashboard/Sessions/components/Edit";
import { AvailablesSections } from "@/types/sections";

export default async function Page({
  params,
}: {
  params: { section: string; id: string };
}) {
  const { section, id } = params;

  switch (section) {
    case AvailablesSections.SESSIONS:
      return <EditSession id={id} />;

    case AvailablesSections.MOVIES:
      return <EditMovie id={id} />;

    case AvailablesSections.ROOMS:
    // return <EditRoom id={id} />;

    case AvailablesSections.FOOD:
    // return <EditFood id={id} />;

    case AvailablesSections.USERS:
    // return <EditUser id={id} />;

    case AvailablesSections.TICKETS:
    // return <EditTicket id={id} />;

    default:
    // return <EditTransaction id={id} />;
  }
}
