"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { IBillboardResult } from "@/lib/billboard";
import { updateBillboard } from "@/services/billboard";

export default function BillboardManager({ current }: { current: string[] }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [response, setResponse] = useState<{
    success: boolean;
    message: string;
    results?: IBillboardResult[];
  } | null>(null);

  const handleUpdate = async () => {
    setIsBusy(true);
    setResponse(null);
    const result = await updateBillboard(text).catch(() => ({
      success: false,
      message: "Algo salió mal. Intenta de nuevo.",
    }));
    setResponse(result);
    setIsBusy(false);
    if (result.success) {
      setText("");
      router.refresh();
    }
  };

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      <div>
        <label htmlFor="billboard-text" className="font-bold">
          Pega la cartelera
        </label>
        <p className="mb-2 text-sm text-gray-500">
          Copia el texto de la página de películas de Cine Colombia, o escribe
          un título por línea. Cada título se revisa contra TMDB y entra solo si
          coincide la mayoría de sus datos. Lo marcado como Preventa se omite.
        </p>
        <textarea
          id="billboard-text"
          className="textarea textarea-bordered h-44 w-full"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button
          type="button"
          className="btn btn-secondary btn-sm mt-2 text-primary"
          disabled={isBusy || !text.trim()}
          onClick={handleUpdate}
        >
          {isBusy ? "Actualizando..." : "Actualizar cartelera"}
        </button>
      </div>

      {response && (
        <div
          role="alert"
          className={`alert ${response.success ? "alert-success" : "alert-error"}`}
        >
          {response.message}
        </div>
      )}

      {response?.results && (
        <div>
          <h3 className="font-bold">Resultado de la revisión</h3>
          <ul className="mt-2 divide-y rounded-lg border text-sm">
            {response.results.map(
              ({ title, movieTitle, year, passed, total }) => (
                <li
                  key={title}
                  className="flex items-center justify-between gap-3 p-2"
                >
                  <span className="min-w-0 truncate">
                    {title}
                    {movieTitle
                      ? ` → ${movieTitle} (${year || "sin año"})`
                      : ""}
                  </span>
                  <span
                    className={`shrink-0 font-medium ${
                      movieTitle ? "text-success" : "text-error"
                    }`}
                  >
                    {movieTitle ? "Entró" : "Por fuera"} · {passed}/{total}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
      )}

      <div>
        <h3 className="font-bold">Cartelera actual ({current.length})</h3>
        <p className="mt-1 text-sm text-gray-600">
          {current.length
            ? current.join(" · ")
            : "Aún no hay lista. Se muestran las más populares de TMDB para Colombia, actualizadas cada día."}
        </p>
      </div>
    </div>
  );
}
