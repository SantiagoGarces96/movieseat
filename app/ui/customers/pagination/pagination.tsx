import React from "react";
import Link from "next/link";
import { MovieStatus } from "@/types/movie";

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
  type PageParamKey = "releasesPage" | "UpcomingPage";
  let pageParamKey: PageParamKey | undefined;

  if (type === MovieStatus.BILLBOARD) {
    pageParamKey = "releasesPage";
  } else if (type === MovieStatus.UPCOMING) {
    pageParamKey = "UpcomingPage";
  }

  if (pageParamKey) {
    newSearchParamsPrev[pageParamKey] = String(currentPage - 1);
    newSearchParamsNext[pageParamKey] = String(currentPage + 1);
  }

  const generateHref = (newParams: any) => {
    const params = new URLSearchParams(newParams);
    return `?${params.toString()}`;
  };

  return (
    <nav
      aria-label="Paginación"
      className="mt-12 flex flex-wrap items-center justify-center gap-2 text-sm font-medium"
    >
      {currentPage > 1 && (
        <Link
          href={generateHref(newSearchParamsPrev)}
          className="ms-link px-3 py-2 text-muted"
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
              ...(pageParamKey && { [pageParamKey]: String(pageNumber) }),
            })}
            aria-current={pageNumber === currentPage ? "page" : undefined}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              pageNumber === currentPage
                ? "bg-gold text-ink-950"
                : "bg-ink-800 text-muted hover:bg-ink-700 hover:text-paper"
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={generateHref(newSearchParamsNext)}
          className="ms-link px-3 py-2 text-muted"
        >
          Siguiente
        </Link>
      )}
    </nav>
  );
};

export default PaginationControls;
