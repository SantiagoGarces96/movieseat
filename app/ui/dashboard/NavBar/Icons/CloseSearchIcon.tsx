"use client";
import { HiOutlineXMark } from "react-icons/hi2";

export default function CloseSearchIcon() {
  const closeModal = (): void => {
    const modal = document.getElementById(
      "modal_search",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };
  return (
    <button className="btn btn-circle btn-ghost btn-sm" onClick={closeModal}>
      <HiOutlineXMark className="h-5 w-5" />
    </button>
  );
}
