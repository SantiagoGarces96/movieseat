"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MAX_SEATS_PER_RESERVATION } from "@/schema/reservation";
import { ISeatSelection, seatLabel, SeatType } from "@/types/reservation";
import { formatPrice } from "@/utils/format";

interface ISeat {
  seat: string;
  available: boolean;
}

interface SeatPickerProps {
  sessionId: string;
  general: ISeat[];
  preferential: ISeat[];
  generalPrice: number;
  preferentialPrice: number;
}

const groupByRow = (seats: ISeat[]) => {
  const rows = new Map<string, ISeat[]>();
  for (const seat of seats) {
    const row = seat.seat[0];
    rows.set(row, [...(rows.get(row) ?? []), seat]);
  }
  return Array.from(rows.entries()).map(([row, rowSeats]) => ({
    row,
    seats: rowSeats.sort(
      (a, b) => Number(a.seat.slice(1)) - Number(b.seat.slice(1)),
    ),
  }));
};

const SeatPicker = ({
  sessionId,
  general,
  preferential,
  generalPrice,
  preferentialPrice,
}: SeatPickerProps) => {
  const router = useRouter();
  const storageKey = `movieseat:seats:${sessionId}`;
  const [selected, setSelected] = useState<ISeatSelection[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const available = useMemo(
    () =>
      new Set([
        ...general
          .filter((seat) => seat.available)
          .map((seat) => `${SeatType.GENERAL}:${seat.seat}`),
        ...preferential
          .filter((seat) => seat.available)
          .map((seat) => `${SeatType.PREFERENTIAL}:${seat.seat}`),
      ]),
    [general, preferential],
  );

  // Recupera la selección de quien tuvo que iniciar sesión antes de continuar.
  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (!saved) return;
    sessionStorage.removeItem(storageKey);
    try {
      const seats: ISeatSelection[] = JSON.parse(saved);
      setSelected(
        seats.filter(({ type, seat }) => available.has(`${type}:${seat}`)),
      );
    } catch {
      setSelected([]);
    }
  }, [available, storageKey]);

  const isSelected = (type: SeatType, seat: string) =>
    selected.some((item) => item.type === type && item.seat === seat);

  const toggle = (type: SeatType, seat: string) => {
    setError(
      !isSelected(type, seat) && selected.length >= MAX_SEATS_PER_RESERVATION
        ? `Puedes elegir hasta ${MAX_SEATS_PER_RESERVATION} sillas.`
        : "",
    );
    setSelected((current) => {
      const withoutSeat = current.filter(
        (item) => item.type !== type || item.seat !== seat,
      );
      if (withoutSeat.length !== current.length) return withoutSeat;
      return current.length >= MAX_SEATS_PER_RESERVATION
        ? current
        : [...current, { type, seat }];
    });
  };

  const total = selected.reduce(
    (sum, { type }) =>
      sum + (type === SeatType.PREFERENTIAL ? preferentialPrice : generalPrice),
    0,
  );

  const handleContinue = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, seats: selected }),
      });
      const data = await response.json();
      if (response.status === 401) {
        sessionStorage.setItem(storageKey, JSON.stringify(selected));
        router.push(
          `/login?next=${encodeURIComponent(`/funcion/${sessionId}`)}`,
        );
        return;
      }
      if (!response.ok) {
        setError(data.message);
        setSelected([]);
        setIsSubmitting(false);
        router.refresh();
        return;
      }
      router.push(`/compra/${data.id}`);
    } catch {
      setError("No pudimos conectarnos. Intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  const renderSection = (
    title: string,
    price: number,
    type: SeatType,
    seats: ISeat[],
  ) => (
    <section className="w-full">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        <span className="text-sm text-muted">{formatPrice(price)}</span>
      </div>
      <div className="space-y-1.5">
        {groupByRow(seats).map(({ row, seats: rowSeats }) => (
          <div key={row} className="flex items-center justify-center gap-1">
            <span
              className="w-4 shrink-0 text-center text-xs text-muted"
              aria-hidden
            >
              {row}
            </span>
            {rowSeats.map(({ seat, available: isAvailable }, index) => {
              const chosen = isSelected(type, seat);
              const label = seatLabel({ type, seat });
              return (
                <button
                  key={seat}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => toggle(type, seat)}
                  aria-pressed={chosen}
                  aria-label={`Silla ${label}${isAvailable ? "" : ", ocupada"}`}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-b rounded-t-lg text-[10px] font-semibold transition-colors sm:h-8 sm:w-8 md:h-9 md:w-9 md:text-xs ${
                    index === Math.floor(rowSeats.length / 2)
                      ? "ml-2 md:ml-4"
                      : ""
                  } ${
                    !isAvailable
                      ? "cursor-not-allowed bg-ink-800 text-ink-600"
                      : chosen
                        ? "bg-gold text-ink-950"
                        : type === SeatType.PREFERENTIAL
                          ? "bg-gold/15 text-gold ring-1 ring-gold/40 hover:bg-gold/30"
                          : "bg-ink-700 text-paper ring-1 ring-white/10 hover:bg-ink-600"
                  }`}
                >
                  {seat.slice(1)}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <div className="mx-auto mt-10 max-w-2xl">
        <div
          className="mx-auto mb-10 h-1.5 w-4/5 rounded-full bg-gold/70 shadow-[0_8px_30px_rgba(242,181,68,0.45)]"
          aria-hidden
        />
        <p className="-mt-7 mb-8 text-center text-xs text-muted">Pantalla</p>

        <div className="space-y-8">
          {renderSection("General", generalPrice, SeatType.GENERAL, general)}
          {renderSection(
            "Preferencial",
            preferentialPrice,
            SeatType.PREFERENTIAL,
            preferential,
          )}
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted">
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-ink-700 ring-1 ring-white/10" />
            General
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-gold/15 ring-1 ring-gold/40" />
            Preferencial
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-gold" />
            Tu selección
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-ink-800" />
            Ocupada
          </li>
        </ul>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink-900/95 backdrop-blur">
        <div className="ms-container py-3">
          {error && (
            <p role="alert" className="mb-2 text-sm text-red-300">
              {error}
            </p>
          )}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0" aria-live="polite">
              <p className="truncate text-sm text-muted">
                {selected.length
                  ? selected.map(seatLabel).join(", ")
                  : "Elige tus sillas"}
              </p>
              <p className="text-lg font-bold">{formatPrice(total)}</p>
            </div>
            <button
              type="button"
              disabled={!selected.length || isSubmitting}
              onClick={handleContinue}
              className="ms-btn ms-btn-primary shrink-0 disabled:opacity-50"
            >
              {isSubmitting ? "Apartando..." : "Continuar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatPicker;
