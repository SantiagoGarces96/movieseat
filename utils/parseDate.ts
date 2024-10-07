export const parseReleaseDate = (releaseDate: Date) => {
  return new Date(releaseDate).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};
