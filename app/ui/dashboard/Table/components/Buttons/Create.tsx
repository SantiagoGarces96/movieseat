"use client";

import { useEffect, useState } from "react";
import Form from "../../../form";
import { IFormInputData } from "@/interfaces/Form";

function Create({
  label,
  createInputData,
  handleCreate,
}: {
  label: string;
  createInputData: IFormInputData[];
  handleCreate: (prevState: any, formData: FormData) => Promise<any>;
}) {
  const [modal, setModal] = useState<HTMLDialogElement | null>(null);
  const openModal = (): void => {
    if (modal) {
      modal.showModal();
    }
  };

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
      <Form
        title="Crear sesion"
        modalName="modal_create"
        inputData={createInputData}
        handle={handleCreate}
      />
    </div>
  );
}

export default Create;
