"use client";
import React, { useState, useEffect } from "react";
import Badge from "./Badge";
import { getRecentSearch } from "@/utils/localStorage";

export default function RecentSearch() {
  const [recentSearchData, setRecentSearchData] = useState<string[]>([]);

  const loadRecentSearches = () => {
    const recentSearches = getRecentSearch();
    setRecentSearchData(recentSearches);
  };

  useEffect(() => {
    loadRecentSearches();
    const handleRecentSearchUpdate = () => {
      loadRecentSearches();
    };
    window.addEventListener("recentSearchUpdated", handleRecentSearchUpdate);

    return () => {
      window.removeEventListener(
        "recentSearchUpdated",
        handleRecentSearchUpdate,
      );
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 p-5">
      <span className="text-sm font-medium text-gray-400">Recent Search</span>
      <div className="flex flex-grow gap-2">
        {recentSearchData.length > 0 ? (
          recentSearchData.map((label, index) => (
            <Badge key={label + index} label={label} />
          ))
        ) : (
          <span className="text-gray-500">No recent searches.</span>
        )}
      </div>
    </div>
  );
}
