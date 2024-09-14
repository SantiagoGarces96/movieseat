"use client";
import React from "react";
import Badge from "./Badge";
import { getRecentSearch } from "@/utils/localStorage";

export default function RecentSearch() {
  const recetSearchData = getRecentSearch();
  return (
    <div className="flex flex-col gap-3 p-5">
      <span className="text-sm font-medium text-gray-400">Recent Search</span>
      <div className="flex flex-grow gap-2">
        {recetSearchData.map((label, index) => (
          <Badge key={label + index} label={label} />
        ))}
      </div>
    </div>
  );
}
