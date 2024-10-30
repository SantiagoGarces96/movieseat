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
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between px-1 py-5">
        <ResultCount />
        <ResultSearch
          placeholder="Ingrese su busqueda"
          tooltipText="Puedes buscar por: Nombre de la película."
        />
      </div>
      <div className="h-full max-h-[75vh] w-full overflow-auto 2xl:hidden">
        {sessions.results.map((data, index) => (
          <div key={data._id} className="mb-2 w-full rounded-md border p-4">
            <div className="flex w-full items-center justify-between pb-4 text-sm">
              <p className="w-1/2">
                Sesión {(parseInt(page) - 1) * parseInt(limit) + index + 1}
              </p>
              <p className="w-1/2 truncate text-end font-bold">{data.movie}</p>
            </div>
            <div className="flex w-full items-center justify-between border-b py-5">
              <div className="flex w-1/3 flex-col">
                <p className="text-xs">Sala</p>
                <p className="font-medium">{data.room}</p>
              </div>
              <div className="flex w-1/3 flex-col">
                <p className="text-xs">Precio preferencial</p>
                <p className="font-medium">{data.preferentialPrice}</p>
              </div>
              <div className="flex w-1/3 flex-col">
                <p className="text-xs">Precio general</p>
                <p className="font-medium">{data.generalPrice}</p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between pt-4 text-sm">
              <p>
                <strong>{data.availableSeats}</strong> asientos disponibles
              </p>
              <div className="flex items-end justify-center gap-3">
                <DeleteSessionButton id={data._id} />
                <UpdateSessionButton id={data._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-full max-h-[75vh] w-full overflow-auto">
        <table className="table table-xs hidden 2xl:table">
          <thead>
            <tr>
              <th></th>
              {sessionsHeaders.map(({ label, value }, index) => (
                <SortableHeader
                  key={value + index}
                  title={label}
                  value={value}
                />
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
                    <td key={Math.random()}>{value}</td>
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
      </div>
      {sessions.totalPages > 0 && (
        <div className="flex w-full items-center justify-between px-1 py-5">
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
