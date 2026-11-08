import { CountResultOpt } from "@/constants/dashboard/table";
import {
  ticketsHeaders,
  transactionsHeaders,
  usersHeaders,
} from "@/constants/dashboard/headers";
import { getTickets } from "@/services/tickets";
import { getTransactions } from "@/services/transactions";
import { getUsers } from "@/services/users";
import DashboardLayout from "../DashboardLayout";
import RecordsTable from "./RecordsTable";

type SearchParams = { [key: string]: string | undefined };

const readParams = (searchParams: SearchParams) =>
  [
    searchParams.page || "1",
    searchParams.limit || CountResultOpt[1].toString(),
    searchParams.tableQuery || "",
    searchParams.sortBy || "createdAt",
    searchParams.order || "desc",
  ] as const;

export async function UsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = readParams(searchParams);
  return (
    <DashboardLayout title="Usuarios" fullWidth>
      <RecordsTable
        data={await getUsers(...params)}
        headers={usersHeaders}
        limit={params[1]}
        tooltipText="Puedes buscar por nombre, apellido o correo."
        emptyText="No hay usuarios que coincidan con la búsqueda."
      />
    </DashboardLayout>
  );
}

export async function TicketsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = readParams(searchParams);
  return (
    <DashboardLayout title="Boletas" fullWidth>
      <RecordsTable
        data={await getTickets(...params)}
        headers={ticketsHeaders}
        limit={params[1]}
        tooltipText="Puedes buscar por código, película o correo del comprador."
        emptyText="Todavía no hay boletas vendidas."
      />
    </DashboardLayout>
  );
}

export async function TransactionsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = readParams(searchParams);
  return (
    <DashboardLayout title="Transacciones" fullWidth>
      <RecordsTable
        data={await getTransactions(...params)}
        headers={transactionsHeaders}
        limit={params[1]}
        tooltipText="Puedes buscar por referencia de pago o correo del comprador."
        emptyText="Todavía no hay pagos registrados."
      />
    </DashboardLayout>
  );
}
