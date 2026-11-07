import { NextResponse } from "next/server";
import type Stripe from "stripe";
import dbConnect from "@/lib/dbConnect";
import {
  completeCheckout,
  expireCheckoutBySession,
} from "@/lib/payments/checkout";
import { getStripe } from "@/lib/payments/stripe";

// Si la persona cierra la pestaña justo después de pagar, este aviso de Stripe
// genera la boleta igual. La firma comprueba que el aviso venga de Stripe.
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("Webhook not configured", { status: 503 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      request.headers.get("stripe-signature") ?? "",
      secret,
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    await dbConnect();
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await completeCheckout(event.data.object);
    } else if (event.type === "checkout.session.expired") {
      await expireCheckoutBySession(event.data.object.id);
    }
    return NextResponse.json({ received: true });
  } catch (error: any) {
    // Un error hace que Stripe vuelva a intentarlo más tarde.
    console.error(`Error in Stripe webhook: ${error.message}`);
    return new Response("Webhook error", { status: 500 });
  }
}
