import { ISeats } from "@/interfaces/session";

const getLetterByPosition = (position: number): string | null => {
  if (position < 1 || position > 26) {
    return null;
  }

  return String.fromCharCode(96 + position).toUpperCase();
};

export const getSeatsNumber = (availableSeats: number): ISeats => {
  const response: ISeats = {};
  const rows = availableSeats / 10;
  for (let index = 1; index <= rows; index++) {
    const row = getLetterByPosition(index) || "A";
    for (let index = 1; index <= 10; index++) {
      response[row + index] = true;
    }
  }
  return response;
};
