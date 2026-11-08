import { IDashboardResponse } from "@/interfaces/dasboard";
import ResultCount from "../ResultCount";
import ResultPagination from "../ResultPagination";
import ResultSearch from "../ResultSearch";
import SortableHeader from "../SortableHeader";

export interface RecordsHeader {
  label: string;
  value: string;
  sortable?: boolean;
}

// Tabla de solo lectura para usuarios, boletas y transacciones. En pantallas
// pequeñas muestra una tarjeta por registro.
export default function RecordsTable({
  data,
  headers,
  limit,
  tooltipText,
  emptyText,
}: {
  data: IDashboardResponse;
  headers: RecordsHeader[];
  limit: string;
  tooltipText: string;
  emptyText: string;
}) {
  const pageSize = parseInt(limit) || 10;
  const first = (data.page - 1) * pageSize;
  const last = Math.min(first + data.results.length, data.totalResults);
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between px-1 py-5">
        <ResultCount />
        <ResultSearch
          placeholder="Escribe para buscar"
          tooltipText={tooltipText}
        />
      </div>
      {data.results.length === 0 ? (
        <p className="w-full py-10 text-center text-gray-400">{emptyText}</p>
      ) : (
        <>
          <div className="h-full max-h-[75vh] w-full overflow-auto 2xl:hidden">
            {data.results.map((row) => (
              <dl
                key={row._id}
                className="mb-2 grid w-full grid-cols-2 gap-3 rounded-md border p-4 text-sm"
              >
                {headers.map(({ label, value }) => (
                  <div key={value} className="min-w-0">
                    <dt className="text-xs text-gray-400">{label}</dt>
                    <dd className="break-words font-medium">{row[value]}</dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>
          <div className="h-full max-h-[75vh] w-full overflow-auto">
            <table className="table table-xs hidden 2xl:table">
              <thead>
                <tr>
                  <th></th>
                  {headers.map(({ label, value, sortable = true }) =>
                    sortable ? (
                      <SortableHeader key={value} title={label} value={value} />
                    ) : (
                      <th key={value}>{label}</th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {data.results.map((row, index) => (
                  <tr key={row._id}>
                    <th>{first + index + 1}</th>
                    {headers.map(({ value }) => (
                      <td key={value}>{row[value]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {data.totalPages > 0 && (
        <div className="flex w-full items-center justify-between px-1 py-5">
          <span className="text-base text-gray-400">
            {`${first + 1}–${last} de ${data.totalResults}`}
          </span>
          <ResultPagination
            currentPage={data.page}
            totalPages={data.totalPages}
          />
        </div>
      )}
    </div>
  );
}
