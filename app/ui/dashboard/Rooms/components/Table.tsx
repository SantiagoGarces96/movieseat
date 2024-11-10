import { roomsHeaders } from "@/constants/dashboard/headers";
import ResultCount from "../../ResultCount";
import ResultSearch from "../../ResultSearch";
import SortableHeader from "../../SortableHeader";
import ResultPagination from "../../ResultPagination";
import { DeleteRoomButton, UpdateRoomButton } from "./Buttons";
import { getRooms } from "@/services/rooms";

export default async function RoomTable({
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
  const rooms = await getRooms(page, limit, query, sortBy, order);
  const current = parseInt(limit) * parseInt(page);
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between px-1 py-5">
        <ResultCount />
        <ResultSearch
          placeholder="Ingrese su busqueda"
          tooltipText="Puedes buscar por: nombre y tipo."
        />
      </div>
      <div className="h-full max-h-[75vh] w-full overflow-auto 2xl:hidden">
        {rooms.results.map((data, index) => (
          <div key={data._id} className="mb-2 w-full rounded-md border p-4">
            <div className="flex w-full items-center justify-between pb-4 text-sm">
              <p className="w-1/2">
                Sala {(parseInt(page) - 1) * parseInt(limit) + index + 1}
                <br />
                <strong>{data.room}</strong>
              </p>
              <p className="w-1/2 truncate text-end font-bold">{data.movie}</p>
            </div>
            <div className="flex w-full items-center justify-between border-b py-5">
              <div className="flex w-1/3 flex-col">
                <p className="text-xs">Total asientos</p>
                <p className="font-medium">{data.totalSeats}</p>
              </div>
              <div className="flex w-1/3 flex-col">
                <p className="text-xs">Asientos preferenciales</p>
                <p className="font-medium">{data.totalSeatsPreferential}</p>
              </div>
              <div className="flex w-1/3 flex-col">
                <p className="text-xs">Asientos generales</p>
                <p className="font-medium">{data.totalSeatsGeneral}</p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between pt-4 text-sm">
              <p />
              <div className="flex items-end justify-center gap-3">
                <DeleteRoomButton id={data._id} />
                <UpdateRoomButton id={data._id} />
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
              {roomsHeaders.map(({ label, value }, index) => (
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
            {rooms.results.map((data, index) => (
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
                  <DeleteRoomButton id={data._id} />
                  <UpdateRoomButton id={data._id} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rooms.totalPages > 0 && (
        <div className="flex w-full items-center justify-between px-1 py-5">
          <span className="text-base text-gray-400">
            {(current > rooms.totalResults ? rooms.totalResults : current) +
              " of " +
              rooms.totalResults}
          </span>
          <ResultPagination
            currentPage={parseInt(page)}
            totalPages={rooms.totalPages}
          />
        </div>
      )}
    </div>
  );
}
