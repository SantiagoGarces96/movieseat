"use client";
import { useState } from "react";
import Link from "next/link";
import { formatShowDay } from "@/utils/showtime";

export interface IShowtime {
  _id: string;
  date: string;
  dateTime: string;
  time: string;
  room: string;
  format: string;
  availableSeats: number;
}

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "p. m." : "a. m.";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

const Showtimes = ({ showtimes }: { showtimes: IShowtime[] }) => {
  const dates = Array.from(new Set(showtimes.map(({ date }) => date)));
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  if (!dates.length) {
    return (
      <p className="rounded-2xl border border-white/5 bg-ink-900 px-6 py-10 text-center text-muted">
        Por ahora no hay funciones disponibles para esta película.
      </p>
    );
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Fecha de la función"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
      >
        {dates.map((date) => {
          const { weekday, day, month } = formatShowDay(date);
          const isSelected = date === selectedDate;
          return (
            <button
              key={date}
              type="button"
              onClick={() => setSelectedDate(date)}
              aria-pressed={isSelected}
              className={`flex w-16 shrink-0 flex-col items-center rounded-xl py-2 text-sm transition-colors ${
                isSelected
                  ? "bg-gold text-ink-950"
                  : "bg-ink-800 text-muted hover:bg-ink-700 hover:text-paper"
              }`}
            >
              <span className="text-xs capitalize">{weekday}</span>
              <span className="text-xl font-bold">{day}</span>
              <span className="text-xs capitalize">{month}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {showtimes
          .filter(({ date }) => date === selectedDate)
          .map(({ _id, time, room, format, availableSeats }) =>
            availableSeats > 0 ? (
              <Link
                key={_id}
                href={`/funcion/${_id}`}
                className="rounded-xl border border-white/10 bg-ink-900 px-4 py-3 transition-colors hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <span className="block font-bold">{formatTime(time)}</span>
                <span className="mt-0.5 block text-xs text-muted">
                  {room} · {format}
                </span>
              </Link>
            ) : (
              <div
                key={_id}
                className="rounded-xl border border-white/5 bg-ink-900/50 px-4 py-3 text-muted"
              >
                <span className="block font-bold line-through">
                  {formatTime(time)}
                </span>
                <span className="mt-0.5 block text-xs">Agotada</span>
              </div>
            ),
          )}
      </div>
    </div>
  );
};

export default Showtimes;
