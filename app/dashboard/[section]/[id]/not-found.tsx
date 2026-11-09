"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineFaceFrown } from "react-icons/hi2";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <HiOutlineFaceFrown className="h-40 w-40 text-gray-400" />
      <h2 className="text-xl font-semibold">No encontramos esta página</h2>
      <p>
        Puede que la dirección esté mal escrita o que el elemento ya no exista.
      </p>
      <button
        type="button"
        onClick={router.back}
        className="btn btn-secondary btn-sm min-w-28 text-primary"
      >
        Volver
      </button>
    </main>
  );
}
