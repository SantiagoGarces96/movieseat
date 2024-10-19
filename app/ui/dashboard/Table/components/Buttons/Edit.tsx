"use client";
import useParams from "@/app/hooks/useParams";
import { IFormInputData } from "@/interfaces/Form";
import { useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import Form from "../../../Form";
import { updateSession } from "@/services/sessions";

function Edit({ id, inputData }: { id: string; inputData: IFormInputData[] }) {
  const { updateParam } = useParams();
  const [modal, setModal] = useState<HTMLDialogElement | null>(null);

  const handleClick = () => {
    updateParam("sessionId", id);
    if (modal) {
      modal.showModal();
    }
  };

  useEffect(() => {
    setModal(document.getElementById("modal_edit") as HTMLDialogElement | null);
  }, []);

  return (
    <div>
      <button className="btn btn-circle btn-ghost btn-sm" onClick={handleClick}>
        <HiOutlinePencil className="h-4 w-4" />
      </button>
      <Form
        title="Editar sesion"
        modalName="modal_edit"
        inputData={inputData}
        handle={updateSession}
      />
    </div>
  );
}

export default Edit;
