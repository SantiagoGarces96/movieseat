import { MovieStatus } from "@/types/movie";

export const formatDuration = (minutes: number): string => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
};

export const formatReleaseDate = (date: Date | string): string =>
  new Date(date).toLocaleDateString("es-CO", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

export const movieStatusLabel: Record<MovieStatus, string> = {
  [MovieStatus.PRE_SALE]: "Preventa",
  [MovieStatus.UPCOMING]: "Próximamente",
  [MovieStatus.BILLBOARD]: "En cartelera",
  [MovieStatus.ARCHIVED]: "Archivada",
};
