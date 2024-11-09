import { FormState, FormStatus } from "@/types/form";
import { cn } from "@/utils/cn";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";

export default function Alert(state: FormState) {
  if (!state.status || state.status === FormStatus.PENDING) {
    return;
  }
  return (
    <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-center">
      <div
        role="alert"
        className={cn("alert max-w-[30rem]", {
          "alert-success": state.success,
          "alert-error": !state.success,
        })}
      >
        {state.success ? (
          <HiOutlineCheckCircle className="h-6 w-6 shrink-0 stroke-current" />
        ) : (
          <HiOutlineXCircle className="h-6 w-6 shrink-0 stroke-current" />
        )}
        <span>{state.message}</span>
      </div>
    </div>
  );
}
