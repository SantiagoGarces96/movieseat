import { CountResultOpt } from "@/constants/dashboard/table";

// Lee los parámetros de una tabla del panel. Solo se puede ordenar por las
// columnas permitidas, y el tamaño de página es uno de los que ofrece el menú.
export const readTableParams = (
  { page, limit, sortBy, order }: Record<string, string>,
  sortable: string[],
) => {
  const requested = parseInt(limit) || CountResultOpt[1];
  const pageSize = CountResultOpt.reduce((prev, curr) =>
    Math.abs(curr - requested) < Math.abs(prev - requested) ? curr : prev,
  );
  return {
    pageSize,
    requestedPage: Math.max(parseInt(page) || 1, 1),
    sortField: sortable.includes(sortBy) ? sortBy : "createdAt",
    sortOrder: (order === "asc" ? 1 : -1) as 1 | -1,
  };
};

export const pageInfo = (
  requestedPage: number,
  pageSize: number,
  totalResults: number,
) => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const page = Math.min(requestedPage, Math.max(totalPages, 1));
  return { page, totalPages, skip: (page - 1) * pageSize };
};

export const formatDashboardDate = (date?: Date | null): string =>
  date
    ? new Date(date).toLocaleString("es-CO", {
        timeZone: "America/Bogota",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";
