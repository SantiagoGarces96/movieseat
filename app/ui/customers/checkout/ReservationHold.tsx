"use client";
import { useEffect, useState } from "react";
import { HiOutlineClock } from "react-icons/hi2";

interface ReservationHoldProps {
  reservationId: string;
  expiresAt: string;
  seatsHref: string;
}

const ReservationHold = ({
  reservationId,
  expiresAt,
  seatsHref,
}: ReservationHoldProps) => {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const update = () => {
      const seconds = Math.max(
        0,
        Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 1000),
      );
      setSecondsLeft(seconds);
      if (seconds === 0) window.location.reload();
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleCancel = async () => {
    setIsCancelling(true);
    await fetch(`/api/reservations/${reservationId}/cancel`, {
      method: "POST",
    }).catch(() => null);
    window.location.assign(seatsHref);
  };

  const minutes = Math.floor((secondsLeft ?? 0) / 60);
  const seconds = String((secondsLeft ?? 0) % 60).padStart(2, "0");

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4">
      <p className="flex items-center gap-2 text-sm">
        <HiOutlineClock className="h-5 w-5 shrink-0 text-gold" aria-hidden />
        <span>
          Te guardamos las sillas por{" "}
          <strong className="font-bold tabular-nums">
            {secondsLeft === null ? "--:--" : `${minutes}:${seconds}`}
          </strong>
        </span>
      </p>
      <button
        type="button"
        onClick={handleCancel}
        disabled={isCancelling}
        className="ms-link text-sm font-semibold text-muted underline disabled:opacity-50"
      >
        Cambiar sillas
      </button>
    </div>
  );
};

export default ReservationHold;
