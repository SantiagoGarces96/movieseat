"use client";
import { FormEvent, useState } from "react";
import { userRole } from "@/types/user";

const inputClass =
  "mt-1.5 min-h-11 w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-2.5 text-paper outline-none transition-colors focus:border-gold";

// Solo se aceptan rutas internas, para que el enlace de login no pueda
// llevar a la persona a otro sitio después de entrar.
const getSafeNext = (next?: string): string | null =>
  next && next.startsWith("/") && !/^\/[/\\]/.test(next) ? next : null;

const LoginForm = ({ next }: { next?: string }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        setIsSubmitting(false);
        return;
      }
      const fallback = data.role === userRole.ADMIN ? "/dashboard" : "/";
      window.location.assign(getSafeNext(next) ?? fallback);
    } catch {
      setError("No pudimos conectarnos. Intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="ms-btn ms-btn-primary w-full disabled:opacity-60"
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};

export default LoginForm;
