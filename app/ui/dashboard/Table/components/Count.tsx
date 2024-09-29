import React from "react";

function Count({
  limit,
  currentPage,
  totalResults,
}: {
  limit: number;
  currentPage: number;
  totalResults: number;
}) {
  const current = limit * currentPage;
  return (
    <span className="text-base text-gray-400">
      {(current > totalResults ? totalResults : current) +
        " of " +
        totalResults}
    </span>
  );
}

export default Count;
