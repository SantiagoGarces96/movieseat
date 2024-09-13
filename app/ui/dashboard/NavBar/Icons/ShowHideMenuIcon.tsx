"use client";
import { HiLogin } from "react-icons/hi";

export default function ShowHideMenu() {
  const closeModal = (): void => {
    const modal = document.getElementById(
      "modal_side_navbar",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  return (
    <button className="btn btn-circle btn-ghost btn-sm" onClick={closeModal}>
      <HiLogin className="h-5 w-5" />
    </button>
  );
}
