import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-6 text-center text-paper">
      <p className="text-sm font-semibold text-gold">Error 404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
        No encontramos esta página
      </h1>
      <p className="mt-3 text-muted">
        Puede que la dirección esté mal escrita o que ya no exista.
      </p>
      <Link href="/" className="ms-btn ms-btn-primary mt-6">
        Volver al inicio
      </Link>
    </div>
  );
}
