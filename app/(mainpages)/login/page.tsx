import type { Metadata } from "next";
import LoginForm from "@/app/ui/customers/login/LoginForm";

export const metadata: Metadata = { title: "Iniciar sesión | MovieSeat" };

interface PageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;

  return (
    <div className="ms-container flex justify-center py-14 md:py-20">
      <div className="w-full max-w-md rounded-2xl border border-white/5 bg-ink-900 p-6 md:p-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Iniciar sesión
        </h1>
        <p className="mt-2 text-muted">Entra con tu correo y tu contraseña.</p>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
