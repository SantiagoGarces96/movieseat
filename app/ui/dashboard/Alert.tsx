"use client";
import useParams from "@/app/hooks/useParams";
import { useEffect, useState } from "react";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";

export default function Alert() {
  const { getParam, deleteParam } = useParams();
  const [state, setState] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const formState = getParam("formState");
    if (formState) {
      setState(true);
      setSuccess(formState === "true");
      const timer = setTimeout(() => {
        deleteParam("formState");
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setState(false);
    }
  }, [deleteParam, getParam]);

  if (!state) {
    return;
  }

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
