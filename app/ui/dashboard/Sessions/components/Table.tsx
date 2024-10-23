import { sessionsHeaders } from "@/constants/dashboard/headers";
import { getSessions } from "@/services/sessions";
import ResultCount from "../../ResultCount";
import ResultSearch from "../../ResultSearch";
import SortableHeader from "../../SortableHeader";
import ResultPagination from "../../ResultPagination";
import { DeleteSessionButton, UpdateSessionButton } from "./Buttons";

export default async function SessionsTable({
  page,
  limit,
  query,
  sortBy,
  order,
}: {
  page: string;
  limit: string;
  query: string;
  sortBy: string;
  order: string;
}) {
  const sessions = await getSessions(page, limit, query, sortBy, order);
  const current = parseInt(limit) * parseInt(page);
  return (
    <div className="h-full">
      <div className="flex w-full items-center justify-between px-1 py-5">
        <ResultCount />
        <ResultSearch
          placeholder="Ingrese su busqueda"
          tooltipText="Puedes buscar por: Nombre de la película."
        />
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            {sessionsHeaders.map(({ label, value }, index) => (
              <SortableHeader key={value + index} title={label} value={value} />
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sessions.results.map((data, index) => (
            <tr key={"element" + index}>
              {Object.entries(data).map(([key, value]) => {
                return key === "_id" ? (
                  <th key={Math.random()}>
                    {(parseInt(page) - 1) * parseInt(limit) + index + 1}
                  </th>
                ) : (
                  <th key={Math.random()}>{value}</th>
                );
              })}
              <th className="flex items-center justify-center">
                <DeleteSessionButton id={data._id} />
                <UpdateSessionButton id={data._id} />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {sessions.totalPages > 0 && (
        <div className="flex items-center justify-between px-1 py-5">
          <span className="text-base text-gray-400">
            {(current > sessions.totalResults
              ? sessions.totalResults
              : current) +
              " of " +
              sessions.totalResults}
          </span>
          <ResultPagination
            currentPage={parseInt(page)}
            totalPages={sessions.totalPages}
          />
        </div>
      )}
    </div>
  );
}
