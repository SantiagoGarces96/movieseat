"use client";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchIcon() {
  const openModal = (): void => {
    const modal = document.getElementById(
      "modal_search",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <button className="btn btn-circle btn-ghost" onClick={openModal}>
      <HiMagnifyingGlass className="h-5 w-5" />
    </button>
  );
}
