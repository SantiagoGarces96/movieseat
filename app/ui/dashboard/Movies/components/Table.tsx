import { moviesHeaders } from "@/constants/dashboard/headers";
import ResultCount from "../../ResultCount";
import ResultSearch from "../../ResultSearch";
import SortableHeader from "../../SortableHeader";
import ResultPagination from "../../ResultPagination";
import { DeleteMovieButton, UpdateMovieButton } from "./Buttons";
import { getMoviesInDashboard } from "@/services/movies";
import Image from "next/image";

export default async function MoviesTable({
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
  const sessions = await getMoviesInDashboard(
    page,
    limit,
    query,
    sortBy,
    order,
  );
  const current = parseInt(limit) * parseInt(page);
  return (
    <div className="h-full">
      <div className="flex w-full items-center justify-between px-1 py-5">
        <ResultCount />
        <ResultSearch placeholder="Ingrese su busqueda" />
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            {moviesHeaders.map(({ label, value }, index) => (
              <SortableHeader key={value + index} title={label} value={value} />
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sessions.results.map((data, index) => (
            <tr key={"element-" + data._id}>
              {Object.entries(data).map(([key, value]) => {
                switch (key) {
                  case "_id":
                    return (
                      <th key={key}>
                        {(parseInt(page) - 1) * parseInt(limit) + index + 1}
                      </th>
                    );

                  case "titleAndPoster":
                    const [title, posterURL, genre] = value.split("|");
                    return (
                      <td key={key}>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle relative h-12 w-12">
                              <Image src={posterURL} alt={title} fill />
                            </div>
                          </div>
                          <div className="max-w-56">
                            <div className="truncate font-bold">{title}</div>

                            <div
                              className="tooltip tooltip-bottom tooltip-accent"
                              data-tip={genre}
                            >
                              <p className="max-w-56 truncate">{genre}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    );

                  default:
                    return (
                      <td key={key}>
                        {key === "description" || key === "genre" ? (
                          <div
                            className="tooltip tooltip-accent !z-50"
                            data-tip={value}
                          >
                            <p className="max-w-48 truncate">{value}</p>
                          </div>
                        ) : (
                          value
                        )}
                      </td>
                    );
                }
              })}
              <th className="flex items-center justify-center">
                <DeleteMovieButton id={data._id} />
                <UpdateMovieButton id={data._id} />
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
