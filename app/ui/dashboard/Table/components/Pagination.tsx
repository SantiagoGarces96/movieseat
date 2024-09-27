"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const handleBack = () => {
    if (currentPage > 1) {
      const backPage = (currentPage - 1).toString();
      params.set("page", backPage);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const backPage = (currentPage + 1).toString();
      params.set("page", backPage);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="join">
      <button
        className="btn join-item"
        disabled={currentPage === 1}
        onClick={handleBack}
      >
        «
      </button>
      <button className="btn join-item">{currentPage}</button>
      <button
        className="btn join-item"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        »
      </button>
    </div>
  );
}

export default Pagination;
