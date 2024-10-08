import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";

export default function Alert({ success }: { success: boolean }) {
  return (
    <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-center">
      <div
        role="alert"
        className={`alert ${success ? "alert-success" : "alert-error"} max-w-[30rem]`}
      >
        {success ? (
          <HiOutlineCheckCircle className="h-6 w-6 shrink-0 stroke-current" />
        ) : (
          <HiOutlineXCircle className="h-6 w-6 shrink-0 stroke-current" />
        )}

        <span>
          {success
            ? "Operacion completada con exito."
            : "Algo salio mal, intenta nuevamente."}
        </span>
      </div>
    </div>
  );
}
