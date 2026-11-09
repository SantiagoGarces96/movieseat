"use client";
import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 py-24 text-center">
      <h2 className="text-xl font-semibold">Algo salió mal</h2>
      <p className="text-gray-400">
        No pudimos cargar esta sección. Intenta de nuevo en un momento.
      </p>
      <button
        type="button"
        onClick={reset}
        className="btn btn-secondary btn-sm min-w-28 text-primary"
      >
        Intentar de nuevo
      </button>
    </main>
  );
}
