import React from "react";
import Link from "next/link";

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
}) => {
  return (
    <div
      className={`flex w-full items-center ${currentPage === 1 ? "justify-end" : currentPage === totalPages ? "justify-start" : "justify-between"}`}
    >
      {currentPage > 1 && (
        <Link
          href={`?page=${currentPage - 1}`}
          className="rounded-full bg-gray-800 p-2 text-white"
        >
          &lt;
        </Link>
      )}

      {currentPage < totalPages && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="rounded-full bg-gray-800 p-2 text-white"
        >
          &gt;
        </Link>
      )}
    </div>
  );
};

export default PaginationButtons;
