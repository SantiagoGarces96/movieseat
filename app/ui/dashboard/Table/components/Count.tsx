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
  return (
    <span className="text-base text-gray-400">
      {limit * currentPage + " of " + totalResults}
    </span>
  );
}

export default Count;
