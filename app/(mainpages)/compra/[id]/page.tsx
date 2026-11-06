import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Food from "@/models/Food";
import Movie from "@/models/Movie";
import Reservation from "@/models/Reservation";
import Room from "@/models/Room";
import Session from "@/models/Session";
import CheckoutForm from "@/app/ui/customers/checkout/CheckoutForm";
import ReservationHold from "@/app/ui/customers/checkout/ReservationHold";
import { ReservationStatus, seatLabel } from "@/types/reservation";
import { formatShowDate, formatShowTime } from "@/utils/showtime";

export const metadata: Metadata = { title: "Tu compra | MovieSeat" };
export const dynamic = "force-dynamic";

const Closed = ({ text, href }: { text: string; href: string }) => (
  <div className="ms-container py-24 text-center">
    <h1 className="text-3xl font-bold tracking-tight">{text}</h1>
    <Link href={href} className="ms-btn ms-btn-primary mt-6">
      Elegir sillas de nuevo
    </Link>
  </div>
);

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getSession();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/compra/${id}`)}`);
  }
  if (!/^[a-f0-9]{24}$/.test(id)) {
    return <Closed text="No encontramos esta compra" href="/releases" />;
  }

  await dbConnect();
  const reservation = await Reservation.findOne({
    _id: id,
    userId: user.userId,
  });
  if (!reservation) {
    return <Closed text="No encontramos esta compra" href="/releases" />;
  }

  // Volvió con el botón Atrás del navegador sin terminar de pagar en Stripe.
  if (reservation.status === ReservationStatus.PROCESSING) {
    redirect(`/api/reservations/${id}/resume`);
  }

  const seatsHref = `/funcion/${reservation.sessionId}`;
  if (
    reservation.status !== ReservationStatus.PENDING ||
    reservation.expiresAt.getTime() <= Date.now()
  ) {
    return <Closed text="Esta reserva ya no está activa" href={seatsHref} />;
  }

  const session = await Session.findById(reservation.sessionId, {
    movieId: 1,
    roomId: 1,
    dateTime: 1,
  });
  const [movie, room] = await Promise.all([
    Movie.findById(session?.movieId, { title: 1 }),
    Room.findById(session?.roomId, { name: 1, room: 1 }),
  ]);
  if (!session || !movie || !room) {
    return <Closed text="No encontramos esta función" href="/releases" />;
  }

  const foods = await Food.find({ availableAmount: { $gt: 0 } }).sort({
    category: 1,
    name: 1,
  });

  return (
    <div className="ms-container max-w-2xl py-10 md:py-14">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Tu compra
      </h1>

      <ReservationHold
        reservationId={id}
        expiresAt={reservation.expiresAt.toISOString()}
        seatsHref={seatsHref}
      />

      <div className="mt-6 rounded-2xl border border-white/5 bg-ink-900 p-6">
        <h2 className="text-xl font-bold tracking-tight">{movie.title}</h2>
        <p className="mt-1 text-sm text-muted first-letter:uppercase">
          {formatShowDate(session.dateTime)} ·{" "}
          {formatShowTime(session.dateTime)} · {room.name} · {room.room}
        </p>
        <p className="mt-4 border-t border-white/5 pt-4 text-sm">
          <span className="text-muted">Sillas: </span>
          <span className="font-medium">
            {reservation.seats.map(seatLabel).join(", ")}
          </span>
        </p>
      </div>

      <CheckoutForm
        reservationId={id}
        seatsCount={reservation.seats.length}
        seatsTotal={reservation.seatsTotal}
        foods={foods.map((food) => ({
          id: String(food._id),
          name: food.name,
          description: food.description,
          image: food.image,
          price: food.price,
          availableAmount: food.availableAmount,
        }))}
      />
    </div>
  );
}
