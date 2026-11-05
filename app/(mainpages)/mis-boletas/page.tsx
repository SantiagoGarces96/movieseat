import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";
import PageHeader from "@/app/ui/customers/PageHeader";
import { seatLabel } from "@/types/reservation";
import {
  formatShowDate,
  formatShowTime,
  isShowtimeOver,
} from "@/utils/showtime";

export const metadata: Metadata = { title: "Mis boletas | MovieSeat" };
export const dynamic = "force-dynamic";

export default async function TicketsPage() {
  const user = await getSession();
  if (!user) {
    redirect("/login?next=%2Fmis-boletas");
  }

  await dbConnect();
  const tickets = await Ticket.find({
    userId: user.userId,
    code: { $exists: true },
  }).sort({ dateTime: -1 });

  return (
    <div className="ms-container max-w-3xl py-10 md:py-14">
      <PageHeader title="Mis boletas" />

      {tickets.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-ink-900 px-6 py-12 text-center">
          <p className="text-muted">Todavía no has comprado boletas.</p>
          <Link href="/releases" className="ms-btn ms-btn-primary mt-5">
            Ver la cartelera
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {tickets.map((ticket) => {
            const isPast = isShowtimeOver(ticket.dateTime);
            return (
              <li key={String(ticket._id)}>
                <Link
                  href={`/mis-boletas/${ticket._id}`}
                  className={`flex items-center gap-4 rounded-2xl border border-white/5 bg-ink-900 p-3 transition-colors hover:border-gold/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    isPast ? "opacity-60" : ""
                  }`}
                >
                  <div className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-xl bg-ink-800">
                    <Image
                      src={ticket.moviePoster}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{ticket.movieTitle}</p>
                    <p className="mt-0.5 text-sm text-muted first-letter:uppercase">
                      {formatShowDate(ticket.dateTime)} ·{" "}
                      {formatShowTime(ticket.dateTime)}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-muted">
                      {ticket.seats.map(seatLabel).join(", ")}
                      {isPast ? " · Función pasada" : ""}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
