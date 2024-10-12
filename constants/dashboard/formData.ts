import { IMovie } from "@/interfaces/movie";
import { IRoom } from "@/interfaces/room";
import { ISessionFormInput } from "@/interfaces/session";

export const createSessionData = (
  moviesData: IMovie[],
  roomsData: IRoom[],
  roomId?: string,
): ISessionFormInput[] => {
  const parsedMovies: ISessionFormInput = {
    label: "Pelicula",
    name: "movieId",
    type: "select",
    options: moviesData.map(({ _id, title }) => ({
      opt: title,
      value: _id.toString(),
    })),
    required: true,
  };

  const parsedRooms: ISessionFormInput = {
    label: "Sala",
    name: "roomId",
    type: "select",
    options: roomsData.map(({ _id, name }) => ({
      opt: name,
      value: _id.toString(),
    })),
    required: true,
  };

  const currentRoom = roomsData.find(({ _id }) => _id.toString() === roomId);

  return [
    parsedMovies,
    parsedRooms,
    {
      label: "Fecha de la funcion",
      name: "dateTime",
      type: "datetime-local",
      required: true,
    },
    {
      label: "Total asientos",
      name: "availableSeats",
      type: "number",
      disabled: true,
      currentValue: currentRoom?.totalSeats,
      required: false,
    },
    {
      label: "Total asientos preferenciales ",
      name: "seatsPreferential",
      type: "number",
      disabled: true,
      currentValue: currentRoom?.totalSeatsPreferential,
      required: false,
    },
    {
      label: "Total asientos generales",
      name: "seatsGeneral",
      type: "number",
      disabled: true,
      currentValue: currentRoom?.totalSeatsGeneral,
      required: false,
    },
    {
      label: "Precio asientos preferenciales",
      name: "preferentialPrice",
      type: "number",
      required: true,
    },
    {
      label: "Precio asientos generales",
      name: "generalPrice",
      type: "number",
      required: true,
    },
  ];
};
