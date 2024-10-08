"use client";
import useParams from "@/app/hooks/useParams";

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const { updateParam } = useParams();

  const handleBack = () => {
    if (currentPage > 1) {
      const backPage = (currentPage - 1).toString();
      updateParam("page", backPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const backPage = (currentPage + 1).toString();
      updateParam("page", backPage);
    }
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
