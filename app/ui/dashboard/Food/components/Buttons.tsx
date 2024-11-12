"use client";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi2";
import Link from "next/link";
import { useFormState } from "react-dom";
import { initialState } from "@/constants/dashboard/form";
import useAlert from "@/app/hooks/useAlert";
import Alert from "../../Alert";
import { deleteFood } from "@/services/food";

export function CreateFoodButton() {
  return (
    <Link
      href="/dashboard/food/create"
      className="btn btn-secondary btn-sm text-primary"
    >
      Crear comida
    </Link>
  );
}

export function UpdateFoodButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/food/${id}`}
      className="btn btn-circle btn-ghost btn-sm"
    >
      <HiOutlinePencil className="h-4 w-4" />
    </Link>
  );
}

export function DeleteFoodButton({ id }: { id: string }) {
  const deleteFoodWithId = deleteFood.bind(null, id);
  const [state, formAction] = useFormState(deleteFoodWithId, initialState);
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
