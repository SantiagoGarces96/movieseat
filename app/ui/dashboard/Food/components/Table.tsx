import { foodHeaders } from "@/constants/dashboard/headers";
import ResultCount from "../../ResultCount";
import ResultSearch from "../../ResultSearch";
import SortableHeader from "../../SortableHeader";
import ResultPagination from "../../ResultPagination";
import { DeleteMovieButton, UpdateMovieButton } from "./Buttons";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { getFood } from "@/services/food";
import {
  FoodSize,
  SpanishFoodSize,
  SpanishFoodType,
  SpanishhFoodCategory,
} from "@/types/food";

export default async function FoodTable({
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
  const food = await getFood(page, limit, query, sortBy, order);
  const current = parseInt(limit) * parseInt(page);
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between px-1 py-5">
        <ResultCount />
        <ResultSearch
          placeholder="Ingrese su busqueda"
          tooltipText="Puedes buscar por: Nombre, Categoria y tipo."
        />
      </div>
      <div className="h-full max-h-[75vh] w-full overflow-auto 2xl:hidden">
        {food.results.map((data, index) => {
          const [name, image, category, type] = data.nameAndImage.split("|");
          const prasedCategory = category.toUpperCase();
          const prasedType = type.toUpperCase();
          const prasedValue = data.size.toUpperCase();
          return (
            <div key={data._id} className="mb-2 w-full rounded-md border p-4">
              <div className="flex w-full items-center justify-between pb-4 text-sm">
                <p className="w-1/2">
                  Comida {(parseInt(page) - 1) * parseInt(limit) + index + 1}
                  <br />
                </p>
              </div>
              <div className="flex w-full flex-col items-center justify-between gap-3 border-b py-5 md:flex-row md:gap-0">
                <div className="flex w-full items-center justify-start gap-2 md:w-1/2">
                  <div className="relative h-28 w-20">
                    <Image src={image} alt={name} fill className="rounded-md" />
                  </div>
                  <div className="h-28 w-full max-w-[70%]">
                    <div className="truncate text-sm font-bold">{name}</div>
                    <p className="truncate text-xs capitalize">
                      {prasedCategory in SpanishhFoodCategory
                        ? SpanishhFoodCategory[
                            prasedCategory as keyof typeof SpanishhFoodCategory
                          ]
                        : "-"}
                    </p>
                    <p className="truncate text-xs capitalize">
                      {prasedType in SpanishFoodType
                        ? SpanishFoodType[
                            prasedType as keyof typeof SpanishFoodType
                          ]
                        : "-"}
                    </p>
                    <div
                      className={cn("badge badge-xs capitalize", {
                        "badge-info": data.size === FoodSize.EXTRALARGE,
                        "badge-warning": data.size === FoodSize.LARGE,
                        "badge-success": data.size === FoodSize.SMALL,
                      })}
                    >
                      {prasedValue in SpanishFoodSize
                        ? SpanishFoodSize[
                            prasedValue as keyof typeof SpanishFoodSize
                          ]
                        : "-"}
                    </div>
                    <p className="truncate text-xs font-bold">$ {data.price}</p>
                  </div>
                </div>
                <div className="flex h-full max-h-52 w-full flex-col md:w-1/2">
                  <p className="text-xs font-bold">Descripción</p>
                  <p className="line-clamp-6 text-xs">{data.description}</p>
                </div>
              </div>
              <div className="flex w-full items-center justify-between pt-4 text-sm">
                <p>
                  <strong>{data.availableAmount}</strong> unidades disponibles
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
              {foodHeaders.map(({ label, value }, index) => (
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
            {food.results.map((data, index) => (
              <tr key={"element-" + data._id}>
                {Object.entries(data).map(([key, value]) => {
                  switch (key) {
                    case "_id":
                      return (
                        <th key={key}>
                          {(parseInt(page) - 1) * parseInt(limit) + index + 1}
                        </th>
                      );

                    case "nameAndImage":
                      const [name, image, category, type] = value.split("|");
                      const prasedCategory = category.toUpperCase();
                      const prasedType = type.toUpperCase();
                      return (
                        <td key={key}>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle relative h-12 w-12">
                                <Image src={image} alt={name} fill />
                              </div>
                            </div>
                            <div className="max-w-56">
                              <div className="truncate font-bold">{name}</div>
                              <p className="max-w-56 truncate capitalize">
                                {prasedCategory in SpanishhFoodCategory
                                  ? SpanishhFoodCategory[
                                      prasedCategory as keyof typeof SpanishhFoodCategory
                                    ]
                                  : "-"}
                              </p>
                              <p className="max-w-56 truncate capitalize">
                                {prasedType in SpanishFoodType
                                  ? SpanishFoodType[
                                      prasedType as keyof typeof SpanishFoodType
                                    ]
                                  : "-"}
                              </p>
                            </div>
                          </div>
                        </td>
                      );

                    case "size":
                      const prasedValue = value.toUpperCase();
                      return (
                        <td key={key} className="capitalize">
                          {prasedValue in SpanishFoodSize
                            ? SpanishFoodSize[
                                prasedValue as keyof typeof SpanishFoodSize
                              ]
                            : "-"}
                        </td>
                      );

                    default:
                      return (
                        <td key={key}>
                          {key === "description" ? (
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
      {food.totalPages > 0 && (
        <div className="flex w-full items-center justify-between px-1 py-5">
          <span className="text-base text-gray-400">
            {(current > food.totalResults ? food.totalResults : current) +
              " of " +
              food.totalResults}
          </span>
          <ResultPagination
            currentPage={parseInt(page)}
            totalPages={food.totalPages}
          />
        </div>
      )}
    </div>
  );
}
