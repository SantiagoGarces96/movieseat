import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { completeCheckout } from "@/lib/payments/checkout";
import { getStripe } from "@/lib/payments/stripe";

// Stripe trae a la persona aquí después de pagar. La boleta solo se genera si el
// propio Stripe confirma el pago: el dato de esta dirección no basta.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const to = (path: string) => NextResponse.redirect(new URL(path, url), 303);

  const sessionId = url.searchParams.get("session_id") ?? "";
  if (!/^cs_test_[A-Za-z0-9]+$/.test(sessionId)) {
    return to("/mis-boletas");
  }

  try {
    await dbConnect();
    const checkout = await getStripe().checkout.sessions.retrieve(sessionId);
    const ticketId = await completeCheckout(checkout);
    return to(ticketId ? `/mis-boletas/${ticketId}` : "/mis-boletas");
  } catch (error: any) {
    console.error(`Error in checkout return: ${error.message}`);
    return to("/mis-boletas");
  }
}
