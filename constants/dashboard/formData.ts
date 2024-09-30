import { IMovie } from "@/interfaces/movie";
import { IRoom } from "@/interfaces/room";
import { ISessionFormInput } from "@/interfaces/session";

export const createSessionData = (
  moviesData: IMovie[],
  roomsData: IRoom[],
): ISessionFormInput[] => {
  const parsedMovies: ISessionFormInput = {
    label: "Pelicula",
    type: "select",
    options: moviesData.map(({ _id, title }) => ({
      opt: title,
      value: _id.toString(),
    })),
    colSpan: 6,
  };

  const parsedRooms: ISessionFormInput = {
    label: "Sala",
    type: "select",
    options: roomsData.map(({ _id, name }) => ({
      opt: name,
      value: _id.toString(),
    })),
    colSpan: 6,
  };

  return [
    parsedMovies,
    parsedRooms,
    { label: "Fecha de la funcion", type: "date", colSpan: 6 },
    {
      label: "Total asientos disponibles",
      type: "number",
      disabled: true,
      colSpan: 6,
    },
    {
      label: "Asientos preferenciales disponibles",
      type: "number",
      disabled: true,
      colSpan: 6,
    },
    {
      label: "Asientos generales disponibles",
      type: "number",
      disabled: true,
      colSpan: 6,
    },
    { label: "Precio asientos preferenciales", type: "number", colSpan: 6 },
    { label: "Precio asientos generales", type: "number", colSpan: 6 },
  ];
};
