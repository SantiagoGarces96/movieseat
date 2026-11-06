import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/app/ui/customers/register/RegisterForm";

export const metadata: Metadata = { title: "Crear cuenta | MovieSeat" };

interface PageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function RegisterPage({ searchParams }: PageProps) {
  const { next } = await searchParams;
  const loginHref = next ? `/login?next=${encodeURIComponent(next)}` : "/login";

  return (
    <div className="ms-container flex justify-center py-14 md:py-20">
      <div className="w-full max-w-md rounded-2xl border border-white/5 bg-ink-900 p-6 md:p-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Crear cuenta
        </h1>
        <p className="mt-2 text-muted">
          Solo necesitas tu nombre, tu correo y una contraseña.
        </p>
        <RegisterForm next={next} />
        <p className="mt-6 text-center text-sm text-muted">
          ¿Ya tienes cuenta?{" "}
          <Link href={loginHref} className="font-semibold text-gold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
