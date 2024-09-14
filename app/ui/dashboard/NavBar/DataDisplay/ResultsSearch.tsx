import { IResultsSearchsDashboard } from "@/interfaces/dasboard";
import React from "react";
import ResultCard from "./ResultCard";

export default function ResultsSearchs({
  title,
  resultData,
}: IResultsSearchsDashboard) {
  return (
    <div className="flex flex-col gap-3 border-t p-5">
      <span className="text-sm font-medium text-gray-400">{title}</span>
      <ul className="menu menu-sm w-full rounded-box bg-base-100">
        {resultData.map((result, index) => (
          <ResultCard key={result.label + index} {...result} />
        ))}
      </ul>
    </div>
  );
}
