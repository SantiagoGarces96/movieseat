import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import dbConnect from "@/lib/dbConnect";
import { releaseExpiredReservations } from "@/lib/reservations";
import Movie from "@/models/Movie";
import Room from "@/models/Room";
import Session from "@/models/Session";
import SeatPicker from "@/app/ui/customers/seats/SeatPicker";
import {
  formatShowDate,
  formatShowTime,
  isShowtimeOver,
} from "@/utils/showtime";

export const metadata: Metadata = { title: "Elige tus sillas | MovieSeat" };
export const dynamic = "force-dynamic";

const Unavailable = ({ text }: { text: string }) => (
  <div className="ms-container py-24 text-center">
    <h1 className="text-3xl font-bold tracking-tight">{text}</h1>
    <Link href="/releases" className="ms-btn ms-btn-primary mt-6">
      Ir a la cartelera
    </Link>
  </div>
);

const toSeatList = (seats: Map<string, boolean>) =>
  Array.from(seats.entries()).map(([seat, available]) => ({ seat, available }));

export default async function SeatsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^[a-f0-9]{24}$/.test(id)) {
    return <Unavailable text="No encontramos esta función" />;
  }

  await dbConnect();
  await releaseExpiredReservations(id);

  const session = await Session.findById(id);
  if (!session) {
    return <Unavailable text="No encontramos esta función" />;
  }
  if (isShowtimeOver(session.dateTime)) {
    return <Unavailable text="Esta función ya comenzó" />;
  }

  const [movie, room] = await Promise.all([
    Movie.findById(session.movieId, { title: 1, poster: 1 }),
    Room.findById(session.roomId, { name: 1, room: 1 }),
  ]);
  if (!movie || !room) {
    return <Unavailable text="No encontramos esta función" />;
  }

  return (
    <div className="ms-container pb-36 pt-8 md:pt-10">
      <Link
        href={`/movie/${session.movieId}`}
        className="ms-link mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted"
      >
        <HiArrowLeft aria-hidden />
        Volver a la película
      </Link>

      <div className="flex items-center gap-4">
        <div className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-xl bg-ink-800">
          <Image
            src={movie.poster}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight md:text-3xl">
            {movie.title}
          </h1>
          <p className="mt-1 text-sm text-muted first-letter:uppercase md:text-base">
            {formatShowDate(session.dateTime)} ·{" "}
            {formatShowTime(session.dateTime)} · {room.name} · {room.room}
          </p>
        </div>
      </div>

      <SeatPicker
        sessionId={id}
        general={toSeatList(session.seatsGeneral)}
        preferential={toSeatList(session.seatsPreferential)}
        generalPrice={session.generalPrice}
        preferentialPrice={session.preferentialPrice}
      />
    </div>
  );
}
