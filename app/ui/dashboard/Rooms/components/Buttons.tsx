"use client";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi2";
import Link from "next/link";
import { useActionState } from "react";
import { initialState } from "@/constants/dashboard/form";
import useAlert from "@/app/hooks/useAlert";
import Alert from "../../Alert";
import { deleteRoom } from "@/services/rooms";

export function CreateRoomButton() {
  return (
    <Link
      href="/dashboard/rooms/create"
      className="btn btn-secondary btn-sm text-primary"
    >
      Crear sala
    </Link>
  );
}

export function UpdateRoomButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/rooms/${id}`}
      className="btn btn-circle btn-ghost btn-sm"
    >
      <HiOutlinePencil className="h-4 w-4" />
    </Link>
  );
}

export function DeleteRoomButton({ id }: { id: string }) {
  const deleteRoomWithId = deleteRoom.bind(null, id);
  const [state, formAction, isPending] = useActionState(
    deleteRoomWithId,
    initialState,
  );
  const { showAlert } = useAlert(state);
  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (
          !window.confirm(
            "¿Seguro que quieres eliminar esta sala? No se puede deshacer.",
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      {showAlert && <Alert {...state} />}
      <button
        type="submit"
        disabled={isPending}
        aria-label="Eliminar esta sala"
        className="btn btn-circle btn-ghost btn-sm"
      >
        <HiOutlineTrash className="h-4 w-4" />
      </button>
    </form>
  );
}
