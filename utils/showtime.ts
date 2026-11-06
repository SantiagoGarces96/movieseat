// Las funciones se guardan con la hora local del cine marcada como UTC
// (una función de las 7:00 p. m. queda como 19:00Z), así que siempre se
// muestran en UTC y "ahora" se ajusta a la hora de Colombia para comparar.
const COLOMBIA_OFFSET_MS = 5 * 60 * 60 * 1000;

export const getLocalNow = (): Date =>
  new Date(Date.now() - COLOMBIA_OFFSET_MS);

export const isShowtimeOver = (dateTime: Date | string): boolean =>
  new Date(dateTime).getTime() <= getLocalNow().getTime();

export const formatShowTime = (dateTime: Date | string): string =>
  new Date(dateTime).toLocaleTimeString("es-CO", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export const formatShowDate = (dateTime: Date | string): string =>
  new Date(dateTime).toLocaleDateString("es-CO", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export const formatShowDay = (date: string) => {
  const value = new Date(`${date}T12:00:00Z`);
  const format = (options: Intl.DateTimeFormatOptions) =>
    value.toLocaleDateString("es-CO", { timeZone: "UTC", ...options });
  return {
    weekday: format({ weekday: "short" }).replace(".", ""),
    day: format({ day: "numeric" }),
    month: format({ month: "short" }).replace(".", ""),
  };
};
