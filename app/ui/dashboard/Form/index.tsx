"use client";
import useParams from "@/app/hooks/useParams";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import FormInput from "./components/FormInput";
import Submit from "./components/Submit";
import { IFormInputData } from "@/interfaces/Form";

// TODO validate available Date by each session depends of date.

export default function Form({
  title,
  modalName,
  inputData,
  handle,
}: {
  title: string;
  modalName: string;
  inputData: IFormInputData[];
  handle: (prevState: any, formData: FormData) => Promise<any>;
}) {
  const { updateParam, deleteParam } = useParams();
  const updateParamRef = useRef(updateParam);
  const [modal, setModal] = useState<HTMLDialogElement | null>(null);
  const [state, formAction] = useFormState(handle, {
    status: "pending",
    success: false,
  });
  const [resetKey, setResetKey] = useState(0);

  const handleClick = () => {
    inputData.forEach(({ type, name }) => {
      type === "select" && name && deleteParam(name);
    });
    setResetKey((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("hello");

    if (state.status === "completed") {
      if (state.success) {
        updateParamRef.current("formState", "true");
        if (modal) {
          setResetKey((prev) => prev + 1);
          modal.close();
        }
      } else {
        updateParamRef.current("formState", "false");
      }
    }
  }, [state, modal]);

  useEffect(() => {
    setModal(document.getElementById(modalName) as HTMLDialogElement | null);
  }, [modalName]);

  return (
    <dialog id={modalName} className="modal">
      <div className="modal-box !max-w-full lg:w-1/2">
        <form method="dialog">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={handleClick}
          >
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
  );
}
