"use client";
import useParams from "@/app/hooks/useParams";
import { ISessionFormInput } from "@/interfaces/session";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import FormInput from "./components/FormInput";
import Submit from "./components/Submit";

export default function Form({
  label,
  title,
  inputData,
  handle,
}: {
  label: string;
  title: string;
  inputData: ISessionFormInput[];
  handle: (prevState: any, formData: FormData) => Promise<any>;
}) {
  const { updateParam } = useParams();
  const updateParamRef = useRef(updateParam);
  const [modal, setModal] = useState<HTMLDialogElement | null>(null);
  const [state, formAction] = useFormState(handle, {
    status: "pending",
    success: false,
  });
  const [resetKey, setResetKey] = useState(0);

  const openModal = (): void => {
    if (modal) {
      modal.showModal();
    }
  };

  useEffect(() => {
    if (state.status === "completed") {
      if (state.success) {
        updateParamRef.current("formState", "true");
        if (modal) {
          setResetKey((prev) => prev + 1);
          modal.close();
        }
      } else {
        updateParamRef.current("formState", "true");
      }
    }
  }, [state, modal]);

  useEffect(() => {
    setModal(
      document.getElementById("modal_create") as HTMLDialogElement | null,
    );
  }, []);

  return (
    <div>
      <button
        className="btn btn-secondary btn-sm text-primary"
        onClick={openModal}
      >
        {label}
      </button>
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
                <Submit />
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
