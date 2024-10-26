export enum MovieStatus {
  PRE_SALE = "pre-sale",
  BILLBOARD = "billboard",
  UPCOMING = "upcoming",
  ARCHIVED = "archived",
}

export enum SpanishMovieStatus {
  PRE_SALE = "preventa",
  BILLBOARD = "cartelera",
  UPCOMING = "próximamente",
  ARCHIVED = "archivada",
}

export type MovieCreateFormState = {
  cast: string[];
  genre: string[];
  language: string[];
};
