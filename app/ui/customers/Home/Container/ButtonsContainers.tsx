import React from "react";
import Link from "next/link";

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  type: string;
  searchParams: { billboardPage?: string; upcomingPage?: string };
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  type,
  searchParams,
}) => {
  const newSearchParamsPrev = { ...searchParams };
  const newSearchParamsNext = { ...searchParams };

  if (type === "billboard") {
    newSearchParamsPrev.billboardPage = String(currentPage - 1);
    newSearchParamsNext.billboardPage = String(currentPage + 1);
  } else if (type === "upcoming") {
    newSearchParamsPrev.upcomingPage = String(currentPage - 1);
    newSearchParamsNext.upcomingPage = String(currentPage + 1);
  }

  const generateHref = (newParams: any) => {
    const params = new URLSearchParams(newParams);
    return `?${params.toString()}`;
  };

  return (
    <div
      className={`flex w-full items-center ${
        currentPage === 1
          ? "justify-end"
          : currentPage === totalPages
            ? "justify-start"
            : "justify-between"
      }`}
    >
      {currentPage > 1 && (
        <Link
          href={generateHref(newSearchParamsPrev)}
          scroll={false}
          className="rounded-md bg-gray-800 p-2 text-white"
        >
          &lt;
        </Link>
      )}

      {currentPage < totalPages && (
        <Link
          href={generateHref(newSearchParamsNext)}
          scroll={false}
          className="rounded-md bg-gray-800 p-2 text-white"
        >
          &gt;
        </Link>
      )}
    </div>
  );
};

export default PaginationButtons;
