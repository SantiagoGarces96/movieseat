import { CountResultOpt } from "@/constants/dashboard/table";
import DashboardLayout from "../DashboardLayout";
import { CreateMovieButton } from "./components/Buttons";
import MoviesTable from "./components/Table";

export default function MoviesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams.page || " 1";
  const limit = searchParams.limit || CountResultOpt[1].toString();
  const query = searchParams.tableQuery || "";
  const sortBy = searchParams.sortBy || "createdAt";
  const order = searchParams.order || "";
  return (
    <DashboardLayout title="Películas" button={<CreateMovieButton />}>
      <MoviesTable
        page={page}
        limit={limit}
        query={query}
        sortBy={sortBy}
        order={order}
      />
    </DashboardLayout>
  );
}
