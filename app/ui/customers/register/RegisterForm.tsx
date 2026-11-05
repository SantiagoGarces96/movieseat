"use client";
import { FormEvent, useState } from "react";
import { getSafeNext } from "@/utils/safeNext";

const fields = [
  { name: "name", label: "Nombre", type: "text", autoComplete: "given-name" },
  {
    name: "lastName",
    label: "Apellido",
    type: "text",
    autoComplete: "family-name",
  },
  { name: "email", label: "Correo", type: "email", autoComplete: "email" },
];

const RegisterForm = ({ next }: { next?: string }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(new FormData(event.currentTarget)),
        ),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        setIsSubmitting(false);
        return;
      }
      window.location.assign(getSafeNext(next) ?? "/");
    } catch {
      setError("No pudimos conectarnos. Intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {fields.map(({ name, label, type, autoComplete }) => (
        <div key={name}>
          <label htmlFor={name} className="text-sm font-medium">
            {label}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            required
            autoComplete={autoComplete}
            className="ms-input"
          />
        </div>
      ))}
      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          aria-describedby="password-hint"
          className="ms-input"
        />
        <p id="password-hint" className="mt-1.5 text-xs text-muted">
          Al menos 8 caracteres.
        </p>
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
        {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
};

export default RegisterForm;
