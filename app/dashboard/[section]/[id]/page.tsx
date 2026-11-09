import EditFood from "@/app/ui/dashboard/Food/components/Edit";
import EditMovie from "@/app/ui/dashboard/Movies/components/Edit";
import EditRoom from "@/app/ui/dashboard/Rooms/components/Edit";
import EditSession from "@/app/ui/dashboard/Sessions/components/Edit";
import { notFound } from "next/navigation";
import { AvailablesSections } from "@/types/sections";

export default async function Page({
  params,
}: {
  params: Promise<{ section: string; id: string }>;
}) {
  const { section, id } = await params;

  switch (section) {
    case AvailablesSections.SESSIONS:
      return <EditSession id={id} />;

    case AvailablesSections.MOVIES:
      return <EditMovie id={id} />;

    case AvailablesSections.ROOMS:
      return <EditRoom id={id} />;

    case AvailablesSections.FOOD:
      return <EditFood id={id} />;

    // Usuarios, boletas y transacciones son registros: se consultan, no se editan.
    default:
      notFound();
  }
}
