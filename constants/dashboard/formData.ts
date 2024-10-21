import { IFormInputData } from "@/interfaces/Form";
import { IMovie } from "@/interfaces/movie";
import { IRoom } from "@/interfaces/room";
import { ISession } from "@/interfaces/session";
import { parseIputDate } from "@/utils/parseDate";

export const createSessionData = (
  moviesData: IMovie[],
  roomsData: IRoom[],
  roomId?: string,
): IFormInputData[] => {
  const parsedMovies: IFormInputData = {
    label: "Pelicula",
    name: "movieId",
    type: "select",
    options: moviesData.map(({ _id, title }) => ({
      opt: title,
      value: _id.toString(),
    })),
    required: true,
  };

  const parsedRooms: IFormInputData = {
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

export const editSessionData = (
  moviesData: IMovie[],
  roomsData: IRoom[],
  session: ISession | null,
  roomId?: string,
): IFormInputData[] => {
  if (session) {
    const { movieId, dateTime, preferentialPrice, generalPrice } = session;
    const parsedMovies: IFormInputData = {
      label: "Pelicula",
      name: "movieId",
      type: "select",
      options: moviesData.map(({ _id, title }) => ({
        opt: title,
        value: _id.toString(),
      })),
      currentValue: movieId.toString(),
      required: true,
    };

    const parsedRooms: IFormInputData = {
      label: "Sala",
      name: "roomId",
      type: "select",
      options: roomsData.map(({ _id, name }) => ({
        opt: name,
        value: _id.toString(),
      })),
      currentValue: session.roomId.toString(),
      required: true,
    };

    const currentRoom = roomsData.find(
      ({ _id }) => _id.toString() === (roomId || session.roomId.toString()),
    );

    return [
      parsedMovies,
      parsedRooms,
      {
        label: "Fecha de la funcion",
        name: "dateTime",
        type: "datetime-local",
        currentValue: parseIputDate(dateTime.toString()),
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
        currentValue: preferentialPrice,
        required: true,
      },
      {
        label: "Precio asientos generales",
        name: "generalPrice",
        type: "number",
        currentValue: generalPrice,
        required: true,
      },
    ];
  }
  return [];
};
