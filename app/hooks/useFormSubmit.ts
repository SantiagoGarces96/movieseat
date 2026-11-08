"use client";
import { FormEvent, useActionState, useTransition } from "react";
import { FormState } from "@/types/form";

// React 19 vacía un formulario cuando termina la acción de <form action>.
// Enviarlo desde onSubmit conserva lo escrito si el servidor responde con un
// error, y isPending permite desactivar el botón mientras se guarda. La acción
// se deja también en el formulario para que funcione aunque la página no haya
// terminado de cargar.
export default function useFormSubmit(
  action: (state: FormState, data: FormData) => Promise<FormState>,
  initialState: FormState,
) {
  const [state, formAction, isActionPending] = useActionState(
    action,
    initialState,
  );
  const [isTransitionPending, startTransition] = useTransition();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  };
  return [
    state,
    onSubmit,
    isActionPending || isTransitionPending,
    formAction,
  ] as const;
}
