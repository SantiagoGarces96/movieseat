import SessionsPage from "@/app/ui/dashboard/Sessions";
import { AvailablesSections } from "@/types/sections";
import { notFound } from "next/navigation";

export default async function page({
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
  return <SessionsPage searchParams={searchParams} />;
}
