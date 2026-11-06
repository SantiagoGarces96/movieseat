import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { reopenCheckout } from "@/lib/payments/checkout";
import Reservation from "@/models/Reservation";
import { ReservationStatus } from "@/types/reservation";

// Stripe trae a la persona aquí cuando vuelve sin pagar.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const to = (path: string) =>
    NextResponse.redirect(new URL(path, request.url), 303);
  const checkoutPath = `/compra/${id}`;

  const user = await getSession();
  if (!user) {
    return to(`/login?next=${encodeURIComponent(checkoutPath)}`);
  }
  if (!/^[a-f0-9]{24}$/.test(id)) {
    return to("/releases");
  }

  try {
    await dbConnect();
    const reservation = await Reservation.findOne({
      _id: id,
      userId: user.userId,
      status: ReservationStatus.PROCESSING,
    });
    if (reservation) {
      const ticketId = await reopenCheckout(reservation);
      if (ticketId) return to(`/mis-boletas/${ticketId}`);
    }
  } catch (error: any) {
    console.error(`Error in resume route: ${error.message}`);
  }
  return to(checkoutPath);
}
