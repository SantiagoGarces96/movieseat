"use client";
import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-secondary btn-sm text-primary"
    >
      {pending ? "Guardando..." : "Guardar"}
    </button>
  );
}
