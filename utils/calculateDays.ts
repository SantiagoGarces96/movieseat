const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const calculateDates = (): { startDate: string; endDate: string } => {
  const now = new Date();

  // Start date is today's date
  const startDate = formatDate(now);

  // End date is four months later
  const endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + 4);

  // Format the end date
  const formattedEndDate = formatDate(endDate);

  return { startDate, endDate: formattedEndDate };
};
