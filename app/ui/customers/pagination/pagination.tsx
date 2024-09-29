import React from "react";
import Link from "next/link";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  type: string;
  searchParams: { releasesPage?: string; UpcomingPage?: string };
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  type,
  searchParams,
}) => {
  const newSearchParamsPrev = { ...searchParams };
  const newSearchParamsNext = { ...searchParams };

  if (type === "releases") {
    newSearchParamsPrev.releasesPage = String(currentPage - 1);
    newSearchParamsNext.releasesPage = String(currentPage + 1);
  } else if (type === "upcomings") {
    newSearchParamsPrev.UpcomingPage = String(currentPage - 1);
    newSearchParamsNext.UpcomingPage = String(currentPage + 1);
  }

  const generateHref = (newParams: any) => {
    const params = new URLSearchParams(newParams);
    return `?${params.toString()}`;
  };

  return (
    <div className="mt-8 flex items-center justify-center">
      {currentPage > 1 && (
        <Link
          href={generateHref(newSearchParamsPrev)}
          className="mt-1 px-3 py-1 text-gray-600 transition hover:text-gray-800"
        >
          Anterior
        </Link>
      )}

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <Link
            key={pageNumber}
            href={generateHref({
              ...searchParams,
              releasesPage: String(pageNumber),
            })}
            className={`mt-1 px-3 py-1 transition ${
              pageNumber === currentPage
                ? "rounded-md bg-gray-800 text-white"
                : "rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={generateHref(newSearchParamsNext)}
          className="mt-1 px-3 py-1 text-gray-600 transition hover:text-gray-800"
        >
          Siguiente
        </Link>
      )}
    </div>
  );
};

export default PaginationControls;
