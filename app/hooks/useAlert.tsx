import { FormState, FormStatus } from "@/types/form";
import { useEffect, useState } from "react";

export default function useAlert(state: FormState) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (state.status === FormStatus.PENDING) return;

    setShowAlert(true);
    const timer = setTimeout(() => setShowAlert(false), 5000);

    return () => clearTimeout(timer);
  }, [state]);

  return { showAlert };
}
