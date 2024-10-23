import Link from "next/link";
import React from "react";
import { HiOutlineFaceFrown } from "react-icons/hi2";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <HiOutlineFaceFrown className="h-40 w-40 text-gray-400" />
      <h2 className="text-xl font-semibold">404 No Encontrado</h2>
      <p>No se ha encontrado la session solicitada.</p>
      <Link
        href="/dashboard/sessions"
        className="btn btn-secondary btn-sm min-w-28 text-primary"
      >
        Volver
      </Link>
    </main>
  );
}
