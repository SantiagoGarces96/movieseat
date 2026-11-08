// Las compras guardan la hora real (UTC). Las gráficas las agrupan por día y
// mes de Colombia, y rellenan con cero los días o meses sin ventas.
export const CHART_TIMEZONE = "America/Bogota";

const DAY_MS = 24 * 60 * 60 * 1000;

const dayKey = (date: Date): string =>
  date.toLocaleDateString("en-CA", { timeZone: CHART_TIMEZONE });

export const lastDays = (count: number, now = new Date()) =>
  Array.from({ length: count }, (_, index) => {
    const date = new Date(now.getTime() - (count - 1 - index) * DAY_MS);
    return {
      key: dayKey(date),
      label: date
        .toLocaleDateString("es-CO", {
          timeZone: CHART_TIMEZONE,
          day: "numeric",
          month: "short",
        })
        .replace(".", ""),
    };
  });

export const lastMonths = (count: number, now = new Date()) => {
  const [year, month] = dayKey(now).split("-").map(Number);
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(Date.UTC(year, month - 1 - (count - 1 - index), 15));
    return {
      key: date.toISOString().slice(0, 7),
      label: date
        .toLocaleDateString("es-CO", {
          timeZone: "UTC",
          month: "short",
          year: "numeric",
        })
        .replace(".", ""),
    };
  });
};

// Fecha desde la que hay que buscar para cubrir los últimos días o meses.
export const daysAgo = (count: number, now = new Date()) =>
  new Date(now.getTime() - count * DAY_MS);
