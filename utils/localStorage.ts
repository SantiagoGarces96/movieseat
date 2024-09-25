export const recentSearchSaver = (query: string): void => {
  if (query && query.trim() !== "") {
    const recentSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    );
    recentSearches.unshift(query);
    const limitedSearches = recentSearches.slice(0, 4);
    localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));
    const event = new CustomEvent("recentSearchUpdated");
    window.dispatchEvent(event);
  }
};

export const getRecentSearch = (): string[] => {
  if (typeof window === "undefined") {
    return [];
  }
  return JSON.parse(localStorage.getItem("recentSearches") || "[]");
};
