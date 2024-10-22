"use client";
import useParams from "@/app/hooks/useParams";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

export default function ResultPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const { updateParam } = useParams();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateParam("page", page.toString());
    }
  };

  const renderPageButton = (page: number) => (
    <button
      key={page}
      className="btn join-item"
      aria-label="1"
      disabled={page === currentPage}
      onClick={() => handlePageChange(page)}
    >
      {page}
    </button>
  );

  return (
    <div className="join">
      <button
        className="btn join-item"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        <HiChevronDoubleLeft />
      </button>
      <button
        className="btn join-item"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <HiChevronLeft />
      </button>
      <div>
        {renderPageButton(
          totalPages === 1
            ? totalPages
            : currentPage < totalPages - 2
              ? currentPage
              : totalPages - 2,
        )}
        {totalPages > 1 &&
          renderPageButton(
            currentPage < totalPages - 2 ? currentPage + 1 : totalPages - 1,
          )}
        {totalPages > 2 &&
          renderPageButton(
            currentPage < totalPages - 2 ? currentPage + 2 : totalPages,
          )}
      </div>

      <button
        className="btn join-item"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <HiChevronRight />
      </button>
      <button
        className="btn join-item"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        <HiChevronDoubleRight />
      </button>
    </div>
  );
}
