export const parseReleaseDate = (releaseDate: Date) => {
  return new Date(releaseDate).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export const parseToTimeUTC = (timeString: string, date: string): Date => {
  const [hours, minutes, seconds] = timeString.split(":");
  const newDate = new Date(
    Date.UTC(
      new Date(date).getUTCFullYear(),
      new Date(date).getUTCMonth(),
      new Date(date).getUTCDate(),
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds),
      0,
    ),
  );
  return newDate;
};
