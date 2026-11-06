import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/app/ui/customers/login/LoginForm";

export const metadata: Metadata = { title: "Iniciar sesión | MovieSeat" };

interface PageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;
  const registerHref = next
    ? `/register?next=${encodeURIComponent(next)}`
    : "/register";

  return (
    <div className="ms-container flex justify-center py-14 md:py-20">
      <div className="w-full max-w-md rounded-2xl border border-white/5 bg-ink-900 p-6 md:p-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Iniciar sesión
        </h1>
        <p className="mt-2 text-muted">Entra con tu correo y tu contraseña.</p>
        <LoginForm next={next} />
        <p className="mt-6 text-center text-sm text-muted">
          ¿No tienes cuenta?{" "}
          <Link href={registerHref} className="font-semibold text-gold">
            Crea una
          </Link>
        </p>
      </div>
    </div>
  );
}
