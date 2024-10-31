import { moviesHeaders } from "@/constants/dashboard/headers";
import ResultCount from "../../ResultCount";
import ResultSearch from "../../ResultSearch";
import SortableHeader from "../../SortableHeader";
import ResultPagination from "../../ResultPagination";
import { DeleteMovieButton, UpdateMovieButton } from "./Buttons";
import { getMoviesInDashboard } from "@/services/movies";
import Image from "next/image";
import { SpanishMovieStatus } from "@/types/movie";
import { cn } from "@/utils/cn";

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
  const movies = await getMoviesInDashboard(page, limit, query, sortBy, order);
  const current = parseInt(limit) * parseInt(page);
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between px-1 py-5">
        <ResultCount />
        <ResultSearch
          placeholder="Ingrese su busqueda"
          tooltipText="Puedes buscar por: Titulo, Género, Director y Estado(En Inglés)."
        />
      </div>
      <div className="h-full max-h-[75vh] w-full overflow-auto 2xl:hidden">
        {movies.results.map((data, index) => {
          const [title, posterURL, genre] = data.titleAndPoster.split("|");
          return (
            <div key={data._id} className="mb-2 w-full rounded-md border p-4">
              <div className="flex w-full items-center justify-between pb-4 text-sm">
                <p className="w-1/2">
                  Película {(parseInt(page) - 1) * parseInt(limit) + index + 1}
                  <br />
                  <strong>{data.releaseDate}</strong>
                </p>
              </div>
              <div className="flex w-full flex-col items-center justify-between gap-3 border-b py-5 md:flex-row md:gap-0">
                <div className="flex w-full items-center justify-start gap-2 md:w-1/2">
                  <div className="relative h-28 w-20">
                    <Image
                      src={posterURL}
                      alt={title}
                      fill
                      className="rounded-md"
                    />
                  </div>
                  <div className="h-28 w-full max-w-[70%]">
                    <div className="truncate text-sm font-bold">{title}</div>
                    <p className="truncate text-xs">{genre}</p>
                    <p className="truncate text-xs">{data.director}</p>
                    <div
                      className={cn("badge badge-xs", {
                        "badge-info":
                          data.status.toLowerCase() ===
                          SpanishMovieStatus.PRE_SALE,
                        "badge-warning":
                          data.status.toLowerCase() ===
                          SpanishMovieStatus.UPCOMING,
                        "badge-success":
                          data.status.toLowerCase() ===
                          SpanishMovieStatus.BILLBOARD,
                        "badge-ghost":
                          data.status.toLowerCase() ===
                          SpanishMovieStatus.ARCHIVED,
                      })}
                    >
                      {data.status}
                    </div>
                  </div>
                </div>
                <div className="flex h-full max-h-52 w-full flex-col md:w-1/2">
                  <p className="text-xs font-bold">Descripción</p>
                  <p className="line-clamp-6 text-xs">{data.description}</p>
                </div>
              </div>
              <div className="flex w-full items-center justify-between pt-4 text-sm">
                <p>
                  <strong>{data.duration}</strong> minutos
                </p>
                <div className="flex items-end justify-center gap-3">
                  <DeleteMovieButton id={data._id} />
                  <UpdateMovieButton id={data._id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-full max-h-[75vh] w-full overflow-auto">
        <table className="table table-xs hidden 2xl:table">
          <thead>
            <tr>
              <th></th>
              {moviesHeaders.map(({ label, value }, index) => (
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
            {movies.results.map((data, index) => (
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
      </div>
      {movies.totalPages > 0 && (
        <div className="flex w-full items-center justify-between px-1 py-5">
          <span className="text-base text-gray-400">
            {(current > movies.totalResults ? movies.totalResults : current) +
              " of " +
              movies.totalResults}
          </span>
          <ResultPagination
            currentPage={parseInt(page)}
            totalPages={movies.totalPages}
          />
        </div>
      )}
    </div>
  );
}
