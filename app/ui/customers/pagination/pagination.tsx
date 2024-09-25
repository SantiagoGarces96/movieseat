import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div className="flex items-center justify-center mt-8">
      {currentPage > 0 && (
        <button
          onClick={() => {
            onPrevPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-3 py-1 text-gray-600 hover:text-gray-800 transition"
        >
          Anterior
        </button>
      )}

      <div className="flex space-x-2 mx-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`px-3 py-1 transition ${
              currentPage === index
                ? "bg-gray-800 text-white rounded-md"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-md"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {currentPage < totalPages - 1 && (
        <button
          onClick={() => {
            onNextPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-3 py-1 text-gray-600 hover:text-gray-800 transition"
        >
          Siguiente
        </button>
      )}
    </div>
  );
};

export default PaginationControls;
