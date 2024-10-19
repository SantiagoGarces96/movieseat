import { IFormInputData } from "@/interfaces/Form";
import { IMovie } from "@/interfaces/movie";
import { IRoom } from "@/interfaces/room";
import { ISession } from "@/interfaces/session";

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
): IFormInputData[] => {
  if (session) {
    const { movieId, roomId, dateTime, preferentialPrice, generalPrice } =
      session;
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
      currentValue: roomId.toString(),
      required: true,
    };

    const currentRoom = roomsData.find(
      ({ _id }) => _id.toString() === roomId.toString(),
    );

    const parseDate = (dateStr: string) => {
      const date = new Date(dateStr);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return [
      parsedMovies,
      parsedRooms,
      {
        label: "Fecha de la funcion",
        name: "dateTime",
        type: "datetime-local",
        currentValue: parseDate(dateTime.toString()),
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
