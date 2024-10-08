"use client";
import { ISessionFormInput } from "@/interfaces/session";
import FormInput from "../components/FormInput";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useMemo, useState } from "react";

export default function CreateForm({
  title,
  inputData,
  handle,
}: {
  title: string;
  inputData: ISessionFormInput[];
  handle: (prevState: any, formData: FormData) => Promise<any>;
}) {
  const { pending } = useFormStatus();

  const [state, formAction] = useFormState(handle, {
    success: false,
    message: "",
  });

  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (state.success) {
      const modal = document.getElementById(
        "modal_create",
      ) as HTMLDialogElement | null;
      if (modal) {
        setResetKey((prev) => prev + 1);
        modal.close();
      }
    }
  }, [state]);

  return (
    <dialog id="modal_create" className="modal">
      <div className="modal-box !max-w-full lg:w-1/2">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">{title}</h3>
        <form
          className="grid grid-cols-12 gap-4 py-4"
          action={formAction}
          key={resetKey}
        >
          {inputData.map((input, index) => (
            <FormInput
              key={title + "_form" + index}
              {...input}
              autofocus={index === 0 ? true : false}
            />
          ))}
          <div className="col-span-12 grid">
            <div className="flex w-full items-center justify-center gap-4 lg:justify-end">
              <button
                className="btn btn-secondary btn-sm text-primary"
                type="submit"
                disabled={pending}
              >
                {pending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
      {state?.message && (
        <div className="toast toast-center toast-top">
          <div
            className={`alert ${state.success ? "alert-success" : "alert-error"}`}
          >
            <span>{state.message}</span>
          </div>
        </div>
      )}
    </dialog>
  );
}
