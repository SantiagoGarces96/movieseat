import { randomBytes } from "node:crypto";
import { TestCard } from "@/types/payment";

// Pasarela simulada: no cobra, no se conecta a ningún servicio y no recibe datos
// de tarjeta. Para usar una pasarela real, reemplaza chargeOrder conservando el
// mismo resultado.
export const TEST_PAYMENT_METHOD = "test";

export type ChargeResult =
  | { approved: true; reference: string }
  | { approved: false; reason: string };

export const chargeOrder = async (card: TestCard): Promise<ChargeResult> => {
  if (card === TestCard.APPROVED) {
    return {
      approved: true,
      reference: `TEST-${randomBytes(6).toString("hex").toUpperCase()}`,
    };
  }
  return {
    approved: false,
    reason: "El pago fue rechazado. Prueba con otra tarjeta.",
  };
};
