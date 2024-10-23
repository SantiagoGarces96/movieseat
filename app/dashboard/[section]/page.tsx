import { CreateSession } from "@/app/ui/dashboard/Sessions/Buttons";
import SessionsTable from "@/app/ui/dashboard/Sessions/Table";
import { CountResultOpt } from "@/constants/dashboard/table";
import { AvailablesSections } from "@/types/sections";
import { notFound } from "next/navigation";

export default async function SessionsPage({
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

  const page = searchParams.page || " 1";
  const limit = searchParams.limit || CountResultOpt[1].toString();
  const query = searchParams.tableQuery || "";
  const sortBy = searchParams.sortBy || "createdAt";
  const order = searchParams.order || "";
  return (
    <section className="h-[100vh] w-full divide-y">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-3xl font-bold">Sesiones</h2>
        <CreateSession />
      </div>
      <div className="p-5">
        <SessionsTable
          page={page}
          limit={limit}
          query={query}
          sortBy={sortBy}
          order={order}
        />
      </div>
    </section>
  );
}
