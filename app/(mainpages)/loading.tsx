import React from "react";

export default function Loading() {
  return (
    <div className="ms-container py-12" aria-busy="true" aria-label="Cargando">
      <div className="h-9 w-56 animate-pulse rounded-lg bg-ink-800" />
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[2/3] rounded-2xl bg-ink-800" />
            <div className="mt-3 h-4 w-3/4 rounded bg-ink-800" />
            <div className="mt-2 h-3 w-1/2 rounded bg-ink-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
