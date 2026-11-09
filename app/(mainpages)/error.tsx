"use client";
import { useEffect } from "react";

export default function PageError({
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
    <div className="ms-container py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Algo salió mal</h1>
      <p className="mt-3 text-muted">
        No pudimos cargar esta página. Intenta de nuevo en un momento.
      </p>
      <button
        type="button"
        onClick={reset}
        className="ms-btn ms-btn-primary mt-6"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
