import React from "react";
import Link from "next/link";

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ currentPage, totalPages }) => {

  return (
    <div className="flex justify-between items-center w-full px-8 mb-4">
      {currentPage > 1 && (
        <Link
          href={`?page=${currentPage - 1}`}
          className="bg-gray-800 text-white rounded-full p-2"
        >
          &lt;
        </Link>
      )}

      {currentPage < totalPages && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="bg-gray-800 text-white rounded-full p-2"
        >
          &gt;
        </Link>
      )}
    </div>
  );
};

export default PaginationButtons;
