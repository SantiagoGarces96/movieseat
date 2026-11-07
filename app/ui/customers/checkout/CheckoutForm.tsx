"use client";
import { useState } from "react";
import Image from "next/image";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { MAX_UNITS_PER_FOOD } from "@/schema/checkout";
import { formatPrice } from "@/utils/format";

export interface ICheckoutFood {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  availableAmount: number;
}

interface CheckoutFormProps {
  reservationId: string;
  seatsCount: number;
  seatsTotal: number;
  foods: ICheckoutFood[];
}

const CheckoutForm = ({
  reservationId,
  seatsCount,
  seatsTotal,
  foods,
}: CheckoutFormProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const changeQuantity = (food: ICheckoutFood, change: number) => {
    const limit = Math.min(MAX_UNITS_PER_FOOD, food.availableAmount);
    setQuantities((current) => ({
      ...current,
      [food.id]: Math.max(0, Math.min(limit, (current[food.id] ?? 0) + change)),
    }));
  };

  const selectedFoods = foods.filter((food) => quantities[food.id] > 0);
  const foodTotal = selectedFoods.reduce(
    (total, food) => total + food.price * quantities[food.id],
    0,
  );

  const handlePay = async () => {
    setError("");
    setIsPaying(true);
    try {
      const response = await fetch(`/api/reservations/${reservationId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foods: selectedFoods.map((food) => ({
            id: food.id,
            quantity: quantities[food.id],
          })),
        }),
      });
      const data = await response.json();
      if (response.status === 410) {
        window.location.reload();
        return;
      }
      if (!response.ok) {
        setError(data.message);
        setIsPaying(false);
        return;
      }
      window.location.assign(data.url ?? `/mis-boletas/${data.ticketId}`);
    } catch {
      setError("No pudimos conectarnos. Intenta de nuevo.");
      setIsPaying(false);
    }
  };

  return (
    <>
      {foods.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">
            ¿Quieres agregar comida?
          </h2>
          <p className="mt-1 text-sm text-muted">
            Es opcional. Puedes seguir sin agregar nada.
          </p>
          <ul className="mt-4 space-y-3">
            {foods.map((food) => {
              const quantity = quantities[food.id] ?? 0;
              return (
                <li
                  key={food.id}
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-ink-900 p-3"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ink-800">
                    <Image
                      src={food.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{food.name}</p>
                    <p className="text-sm text-muted">
                      {formatPrice(food.price)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => changeQuantity(food, -1)}
                      disabled={quantity === 0}
                      aria-label={`Quitar ${food.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-700 transition-colors hover:bg-ink-600 disabled:opacity-40"
                    >
                      <HiMinus aria-hidden />
                    </button>
                    <span
                      className="w-6 text-center font-semibold tabular-nums"
                      aria-live="polite"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQuantity(food, 1)}
                      disabled={
                        quantity >=
                        Math.min(MAX_UNITS_PER_FOOD, food.availableAmount)
                      }
                      aria-label={`Agregar ${food.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-700 transition-colors hover:bg-ink-600 disabled:opacity-40"
                    >
                      <HiPlus aria-hidden />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">Pago</h2>
        <p className="mt-3 text-sm text-muted">
          Al continuar irás a la página segura de Stripe. Aquí no guardamos
          datos de tarjeta.
        </p>
        <div className="mt-3 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm">
          <p>
            <strong className="font-semibold">Modo de prueba.</strong> No se
            hace ningún cobro real. Usa estos datos en Stripe:
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              Aprobada: <code className="font-mono">4242 4242 4242 4242</code>
            </li>
            <li>
              Rechazada: <code className="font-mono">4000 0000 0000 0002</code>
            </li>
            <li>Cualquier fecha futura y cualquier código de 3 dígitos.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/5 bg-ink-900 p-6">
        <h2 className="text-xl font-bold tracking-tight">Resumen</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">
              {seatsCount} {seatsCount === 1 ? "silla" : "sillas"}
            </dt>
            <dd>{formatPrice(seatsTotal)}</dd>
          </div>
          {selectedFoods.map((food) => (
            <div key={food.id} className="flex justify-between gap-4">
              <dt className="min-w-0 truncate text-muted">
                {quantities[food.id]} × {food.name}
              </dt>
              <dd>{formatPrice(food.price * quantities[food.id])}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 border-t border-white/5 pt-3 text-lg font-bold">
            <dt>Total</dt>
            <dd>{formatPrice(seatsTotal + foodTotal)}</dd>
          </div>
        </dl>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={handlePay}
          disabled={isPaying}
          className="ms-btn ms-btn-primary mt-5 w-full disabled:opacity-60"
        >
          {isPaying ? "Abriendo Stripe..." : "Pagar con Stripe"}
        </button>
      </section>
    </>
  );
};

export default CheckoutForm;
