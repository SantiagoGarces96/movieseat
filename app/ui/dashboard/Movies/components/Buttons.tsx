"use client";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi2";
import Link from "next/link";
import { useActionState } from "react";
import { initialState } from "@/constants/dashboard/form";
import useAlert from "@/app/hooks/useAlert";
import Alert from "../../Alert";
import { deleteMovie } from "@/services/movies";

export function CreateMovieButton() {
  return (
    <Link
      href="/dashboard/movies/create"
      className="btn btn-secondary btn-sm text-primary"
    >
      Crear película
    </Link>
  );
}

export function UpdateMovieButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/movies/${id}`}
      className="btn btn-circle btn-ghost btn-sm"
    >
      <HiOutlinePencil className="h-4 w-4" />
    </Link>
  );
}

export function DeleteMovieButton({ id }: { id: string }) {
  const deleteMovieWithId = deleteMovie.bind(null, id);
  const [state, formAction, isPending] = useActionState(
    deleteMovieWithId,
    initialState,
  );
  const { showAlert } = useAlert(state);
  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (
          !window.confirm(
            "¿Seguro que quieres eliminar esta película? No se puede deshacer.",
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
        aria-label="Eliminar esta película"
        className="btn btn-circle btn-ghost btn-sm"
      >
        <HiOutlineTrash className="h-4 w-4" />
      </button>
    </form>
  );
}
