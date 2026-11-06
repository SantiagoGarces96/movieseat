import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import QRCode from "qrcode";
import { HiArrowLeft } from "react-icons/hi2";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";
import { seatLabel } from "@/types/reservation";
import { formatPrice } from "@/utils/format";
import { formatShowDate, formatShowTime } from "@/utils/showtime";

export const metadata: Metadata = { title: "Tu boleta | MovieSeat" };
export const dynamic = "force-dynamic";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getSession();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/mis-boletas/${id}`)}`);
  }

  await dbConnect();
  const ticket = /^[a-f0-9]{24}$/.test(id)
    ? await Ticket.findOne({
        _id: id,
        userId: user.userId,
        code: { $exists: true },
      })
    : null;

  if (!ticket) {
    return (
      <div className="ms-container py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          No encontramos esta boleta
        </h1>
        <Link href="/mis-boletas" className="ms-btn ms-btn-primary mt-6">
          Ver mis boletas
        </Link>
      </div>
    );
  }

  const qrCode = await QRCode.toString(ticket.code, {
    type: "svg",
    margin: 1,
    width: 240,
    color: { dark: "#0B0D12", light: "#FFFFFF" },
  });
  const foods = ticket.foods ?? [];

  return (
    <div className="ms-container max-w-md py-10 md:py-14">
      <Link
        href="/mis-boletas"
        className="ms-link mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted"
      >
        <HiArrowLeft aria-hidden />
        Mis boletas
      </Link>

      <article className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900">
        <div className="p-6">
          <div className="flex items-center gap-4">
            {ticket.moviePoster && (
              <div className="relative aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-xl bg-ink-800">
                <Image
                  src={ticket.moviePoster}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gold">
                Compra confirmada
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">
                {ticket.movieTitle}
              </h1>
            </div>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div className="col-span-2">
              <dt className="text-muted">Fecha</dt>
              <dd className="mt-0.5 font-semibold first-letter:uppercase">
                {formatShowDate(ticket.dateTime)}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Hora</dt>
              <dd className="mt-0.5 font-semibold">
                {formatShowTime(ticket.dateTime)}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Sala</dt>
              <dd className="mt-0.5 font-semibold">
                {ticket.roomName} · {ticket.roomFormat}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">Sillas</dt>
              <dd className="mt-0.5 font-semibold">
                {ticket.seats.map(seatLabel).join(", ")}
              </dd>
            </div>
            {foods.length > 0 && (
              <div className="col-span-2">
                <dt className="text-muted">Comida</dt>
                <dd className="mt-0.5 font-semibold">
                  {foods
                    .map(({ quantity, name }) => `${quantity} × ${name}`)
                    .join(", ")}
                </dd>
              </div>
            )}
            <div className="col-span-2">
              <dt className="text-muted">Total (pago de prueba)</dt>
              <dd className="mt-0.5 font-semibold">
                {formatPrice(ticket.totalPrice)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="border-t border-dashed border-white/20 bg-white p-6 text-center text-ink-950">
          <div
            role="img"
            aria-label={`Código QR de la boleta ${ticket.code}`}
            className="mx-auto w-52 [&>svg]:h-auto [&>svg]:w-full"
            dangerouslySetInnerHTML={{ __html: qrCode }}
          />
          <p className="mt-3 font-mono text-sm font-semibold tracking-wider">
            {ticket.code}
          </p>
          <p className="mt-1 text-xs text-ink-600">
            Muestra este código al entrar a la sala.
          </p>
        </div>
      </article>
    </div>
  );
}
