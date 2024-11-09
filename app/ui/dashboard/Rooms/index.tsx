import { CountResultOpt } from "@/constants/dashboard/table";
import DashboardLayout from "../DashboardLayout";
import SessionsTable from "./components/Table";
import { CreateRoomButton } from "./components/Buttons";

export default function RoomsPage({
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
    <DashboardLayout title="Salas" button={<CreateRoomButton />}>
      <SessionsTable
        page={page}
        limit={limit}
        query={query}
        sortBy={sortBy}
        order={order}
      />
    </DashboardLayout>
  );
}
