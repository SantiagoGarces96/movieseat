"use client";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi2";
import Link from "next/link";
import { deleteSession } from "@/services/sessions";
import { useActionState } from "react";
import { initialState } from "@/constants/dashboard/form";
import useAlert from "@/app/hooks/useAlert";
import Alert from "../../Alert";

export function CreateSessionButton() {
  return (
    <Link
      href="/dashboard/sessions/create"
      className="btn btn-secondary btn-sm text-primary"
    >
      Crear función
    </Link>
  );
}

export function UpdateSessionButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/sessions/${id}`}
      className="btn btn-circle btn-ghost btn-sm"
    >
      <HiOutlinePencil className="h-4 w-4" />
    </Link>
  );
}

export function DeleteSessionButton({ id }: { id: string }) {
  const deleteSessionWithId = deleteSession.bind(null, id);
  const [state, formAction, isPending] = useActionState(
    deleteSessionWithId,
    initialState,
  );
  const { showAlert } = useAlert(state);
  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (
          !window.confirm(
            "¿Seguro que quieres eliminar esta función? No se puede deshacer.",
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
        aria-label="Eliminar esta función"
        className="btn btn-circle btn-ghost btn-sm"
      >
        <HiOutlineTrash className="h-4 w-4" />
      </button>
    </form>
  );
}
