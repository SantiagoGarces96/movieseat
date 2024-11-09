"use client";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi2";
import Link from "next/link";
import { deleteSession } from "@/services/sessions";
import { useFormState } from "react-dom";
import { initialState } from "@/constants/dashboard/form";
import useAlert from "@/app/hooks/useAlert";
import Alert from "../../Alert";

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
  const deleteSessionWithId = deleteSession.bind(null, id);
  const [state, formAction] = useFormState(deleteSessionWithId, initialState);
  const { showAlert } = useAlert(state);
  return (
    <form action={formAction}>
      {showAlert && <Alert {...state} />}
      <button type="submit" className="btn btn-circle btn-ghost btn-sm">
        <HiOutlineTrash className="h-4 w-4" />
      </button>
    </form>
  );
}
