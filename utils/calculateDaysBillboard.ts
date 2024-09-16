const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son base 0
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const calculateDatesBillboard = (): {
  startDate: string;
  endDate: string;
} => {
  const now = new Date();

  // La fecha de fin es la fecha actual
  const endDate = formatDate(now);

  // La fecha de inicio es cuatro meses anteriores
  const startDate = new Date(now);
  startDate.setMonth(startDate.getMonth() - 4);

  // Formatear la fecha de inicio
  const formattedStartDate = formatDate(startDate);

  return { startDate: formattedStartDate, endDate };
};
