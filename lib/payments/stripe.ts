import Stripe from "stripe";

let client: Stripe | null = null;

export const isStripeConfigured = (): boolean =>
  Boolean(process.env.STRIPE_SECRET_KEY);

// Este proyecto solo cobra de prueba. Con una llave real se niega a funcionar,
// para que nadie pueda hacer un cobro de verdad por accidente.
export const getStripe = (): Stripe => {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  if (!/^(sk|rk)_test_/.test(key)) {
    throw new Error("Stripe necesita una llave de prueba (sk_test_).");
  }
  client ??= new Stripe(key);
  return client;
};
