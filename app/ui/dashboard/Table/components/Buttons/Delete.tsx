"use client";
import useParams from "@/app/hooks/useParams";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle, HiOutlineTrash } from "react-icons/hi2";

function Delete({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<{
    success: boolean;
  }>;
}) {
  const { updateParam } = useParams();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<HTMLDialogElement | null>(null);

  const openModal = (): void => {
    if (modal) {
      modal.showModal();
    }
  };

  const handleDelete = async (): Promise<void> => {
    setLoading(true);
    const { success } = await action(id);
    if (!success) {
      updateParam("formState", "false");
    }
    setLoading(false);
    if (modal) {
      modal.close();
    }
  };

  useEffect(() => {
    setModal(
      document.getElementById("confirm_alert") as HTMLDialogElement | null,
    );
  }, []);

  return (
    <div>
      <button
        type="submit"
        className="btn btn-circle btn-ghost btn-sm"
        onClick={openModal}
      >
        <HiOutlineTrash className="h-4 w-4" />
      </button>
      <dialog id="confirm_alert" className="modal">
        <div className="modal-box flex max-w-[30rem] flex-col items-center justify-center gap-3 bg-primary">
          <HiOutlineExclamationCircle className="h-20 w-20 text-accent" />
          <h3 className="text-3xl font-semibold">¿Estas seguro?</h3>
          <span className="text-xl font-normal">No podrás revertirlo.</span>
          <div className="flex gap-3 p-1">
            <button
              className="btn btn-secondary btn-sm text-primary"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Si, eliminar"}
            </button>
            <form method="dialog">
              <button
                className="btn btn-error btn-sm text-primary"
                disabled={loading}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Delete;
