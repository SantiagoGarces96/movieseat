"use client";
import { IRoom } from "@/interfaces/room";
import Link from "next/link";
import { useFormState } from "react-dom";
import { initialState } from "@/constants/dashboard/form";
import useAlert from "@/app/hooks/useAlert";
import Alert from "../../../../Alert";
import { Button } from "../../../../Button";
import { SessionRoom } from "@/types/session";
import { updateRoom } from "@/services/rooms";

export default function RoomEditForm({ room }: { room: IRoom }) {
  const [state, formAction] = useFormState(
    updateRoom.bind(null, room._id),
    initialState,
  );

  const { showAlert } = useAlert(state);

  return (
    <form
      action={formAction}
      className="grid w-full grid-cols-12 gap-4 rounded-xl border px-8 py-8 lg:px-10 xl:px-16 2xl:w-3/4"
    >
      {showAlert && <Alert {...state} />}
      <label className="form-control col-span-12 grid w-full lg:col-span-6">
        <div className="label text-lg font-bold">
          <span className="label-text">Nombre de la sala</span>
        </div>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={room.name}
          className="input input-sm input-bordered w-full"
        />
      </label>
      <label className="form-control col-span-12 grid w-full lg:col-span-6">
        <div className="label text-lg font-bold">
          <span className="label-text">Tipo de sala</span>
        </div>
        <select
          id="room"
          name="room"
          className="select select-bordered select-sm w-full"
          defaultValue={room.room}
          required
        >
          <option value="" disabled>
            Seleccione un tipo
          </option>
          {Object.entries(SessionRoom).map(([_, value], index) => (
            <option key={value + index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label className="form-control col-span-12 grid w-full lg:col-span-6">
        <div className="label text-lg font-bold">
          <span className="label-text">Total asientos preferenciales</span>
        </div>
        <input
          id="totalSeatsPreferential"
          name="totalSeatsPreferential"
          type="number"
          defaultValue={room.totalSeatsPreferential}
          className="input input-sm input-bordered w-full"
          required
        />
      </label>
      <label className="form-control col-span-12 grid w-full lg:col-span-6">
        <div className="label text-lg font-bold">
          <span className="label-text">Total asientos generales</span>
        </div>
        <input
          id="totalSeatsGeneral"
          name="totalSeatsGeneral"
          type="number"
          defaultValue={room.totalSeatsGeneral}
          className="input input-sm input-bordered w-full"
          required
        />
      </label>
      <div className="col-span-12 mt-6 grid w-full">
        <div className="flex w-full items-center justify-center gap-4">
          <Link
            href="/dashboard/rooms"
            className="btn btn-error btn-sm min-w-28 text-primary"
          >
            Cancelar
          </Link>
          <Button type="submit">Actualizar</Button>
        </div>
      </div>
    </form>
  );
}
