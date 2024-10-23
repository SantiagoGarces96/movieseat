"use client";
import { IMovie } from "@/interfaces/movie";
import { IRoom } from "@/interfaces/room";
import { createSession, getAvailableSessionTimes } from "@/services/sessions";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { cn } from "@/utils/cn";
import { initialState } from "@/constants/dashboard/form";
import useAlert from "@/app/hooks/useAlert";
import Alert from "../../../../Alert";
import { Button } from "../../../../Button";

export default function SessionCreateForm({
  movies,
  rooms,
}: {
  movies: IMovie[];
  rooms: IRoom[];
}) {
  const [seats, setSeats] = useState({
    totalSeats: 0,
    totalSeatsPreferential: 0,
    totalSeatsGeneral: 0,
  });
  const [roomId, setRoomId] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [disableDate, setDisableDate] = useState<boolean>(true);
  const [notAvailableTimes, setNotAvailableTimes] = useState<boolean>(false);
  const [availableSessionTimes, setAvailableSessionTimes] = useState<string[]>(
    [],
  );
  const [currentTime, setCurrentTime] = useState<string>("");

  const [state, formAction] = useFormState(
    createSession.bind(null, currentTime),
    initialState,
  );

  const { showAlert } = useAlert(state);

  const handleRoom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentRoomId = e.target.value;
    setCurrentDate("");
    setAvailableSessionTimes([]);
    setRoomId(currentRoomId);
    setDisableDate(false);
    const currentRoom = rooms.find(
      ({ _id }) => _id.toString() === currentRoomId,
    );
    if (currentRoom) {
      const { totalSeats, totalSeatsPreferential, totalSeatsGeneral } =
        currentRoom;
      setSeats({ totalSeats, totalSeatsPreferential, totalSeatsGeneral });
    }
  };

  const handleDate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setCurrentDate(date);
    const availableSessions = await getAvailableSessionTimes(date, roomId);
    setAvailableSessionTimes(availableSessions);
    setNotAvailableTimes(!!date && availableSessions.length === 0);
  };

  return (
    <form
      action={formAction}
      className="grid grid-cols-12 gap-4 rounded-xl border px-8 py-8 lg:px-10 xl:px-16"
    >
      {showAlert && <Alert {...state} />}
      <label className="form-control col-span-12 grid w-full lg:col-span-6">
        <div className="label">
          <span className="label-text">Película</span>
        </div>
        <select
          id="movie"
          name="movieId"
          className="select select-bordered select-sm w-full"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Seleccione una película
          </option>
          {movies.map(({ _id, title }) => (
            <option key={_id} value={_id}>
              {title}
            </option>
          ))}
        </select>
      </label>

      <label className="form-control col-span-12 grid w-full lg:col-span-6">
        <div className="label">
          <span className="label-text">Sala</span>
        </div>
        <select
          id="room"
          name="roomId"
          className="select select-bordered select-sm w-full"
          defaultValue=""
          onChange={handleRoom}
          required
        >
          <option value="" disabled>
            Seleccione una sala
          </option>
          {rooms.map(({ _id, name }) => (
            <option key={_id.toString()} value={_id.toString()}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label className="form-control col-span-12 grid w-full lg:col-span-12">
        <div className="label">
          <span className="label-text">Fecha de la función</span>
        </div>
        <input
          id="date"
          name="date"
          type="date"
          className="input input-sm input-bordered w-full"
          required
          value={currentDate}
          disabled={disableDate}
          onChange={handleDate}
        />
        <div className="mt-3 flex w-full flex-wrap items-center justify-center gap-3 p-2">
          {notAvailableTimes && (
            <span className="label-text font-bold">
              No hay disponibilidad, seleccione otra fecha por favor.
            </span>
          )}
          {availableSessionTimes.map((time) => (
            <span
              key={Math.random()}
              className={cn(
                "badge badge-lg cursor-pointer p-2 hover:bg-accent hover:text-primary",
                {
                  "badge-accent text-primary": currentTime === time,
                  "badge-outline": currentTime !== time,
                },
              )}
              onClick={() => setCurrentTime(time)}
            >
              {time}
            </span>
          ))}
        </div>
      </label>

      <label className="form-control col-span-12 grid w-full lg:col-span-4">
        <div className="label">
          <span className="label-text">Total asientos</span>
        </div>
        <input
          id="totalSeats"
          name="totalSeats"
          value={seats.totalSeats}
          type="number"
          className="input input-sm input-bordered w-full"
          disabled
        />
      </label>

      <label className="form-control col-span-12 grid w-full lg:col-span-4">
        <div className="label">
          <span className="label-text">Total asientos preferenciales</span>
        </div>
        <input
          id="totalSeatsPreferential"
          name="totalSeatsPreferential"
          value={seats.totalSeatsPreferential}
          type="number"
          className="input input-sm input-bordered w-full"
          disabled
        />
      </label>

      <label className="form-control col-span-12 grid w-full lg:col-span-4">
        <div className="label">
          <span className="label-text">Total asientos generales</span>
        </div>
        <input
          id="totalSeatsGeneral"
          name="totalSeatsGeneral"
          value={seats.totalSeatsGeneral}
          type="number"
          className="input input-sm input-bordered w-full"
          disabled
        />
      </label>

      <label className="form-control col-span-12 grid w-full lg:col-span-6">
        <div className="label">
          <span className="label-text">Precio asientos preferenciales</span>
        </div>
        <input
          id="preferentialPrice"
          name="preferentialPrice"
          type="number"
          className="input input-sm input-bordered w-full"
          required
        />
      </label>

      <label className="form-control col-span-12 grid w-full lg:col-span-6">
        <div className="label">
          <span className="label-text">Precio asientos generales</span>
        </div>
        <input
          id="generalPrice"
          name="generalPrice"
          type="number"
          className="input input-sm input-bordered w-full"
          required
        />
      </label>

      <div className="col-span-12 mt-6 grid w-full">
        <div className="flex w-full items-center justify-center gap-4">
          <Link
            href="/dashboard/sessions"
            className="btn btn-error btn-sm min-w-28 text-primary"
          >
            Cancelar
          </Link>
          <Button type="submit">Crear</Button>
        </div>
      </div>
    </form>
  );
}
