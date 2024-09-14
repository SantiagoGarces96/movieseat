"use client";
import React, { useEffect, useState } from "react";
import Badge from "./Badge";
import { getRecentSearch } from "@/utils/localStorage";

export default function RecentSearch() {
  const [recentSearchData, setRecentSearchData] = useState<string[]>([]);

  useEffect(() => {
    const data = getRecentSearch();
    setRecentSearchData(data);
  }, []);

  return (
    <div className="flex flex-col gap-3 p-5">
      <span className="text-sm font-medium text-gray-400">Recent Search</span>
      <div className="flex flex-grow gap-2">
        {recentSearchData.map((label, index) => (
          <Badge key={label + index} label={label} />
        ))}
      </div>
    </div>
  );
}
