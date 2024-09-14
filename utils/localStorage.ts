export const recentSearchSaver = (query: string): void => {
  if (query && query.trim() !== "") {
    const recentSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    );
    recentSearches.unshift(query);
    const limitedSearches = recentSearches.slice(0, 4);
    console.log(limitedSearches);

    localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));
  }
};

export const getRecentSearch = (): string[] => {
  return JSON.parse(localStorage.getItem("recentSearches") || "[]");
};
