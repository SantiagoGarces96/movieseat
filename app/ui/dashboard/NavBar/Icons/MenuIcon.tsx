"use client";
import { HiBars3CenterLeft } from "react-icons/hi2";

export default function MenuIcon() {
  const openModal = (): void => {
    const modal = document.getElementById(
      "modal_side_navbar",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <button
      className="btn btn-circle btn-ghost btn-sm lg:hidden"
      onClick={openModal}
    >
      <HiBars3CenterLeft className="h-4 w-4" />
    </button>
  );
}
