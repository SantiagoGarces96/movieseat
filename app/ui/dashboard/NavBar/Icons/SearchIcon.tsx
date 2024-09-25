"use client";
import { HiMagnifyingGlass } from "react-icons/hi2";
import SearchInput from "../Inputs/SearchInput";
import { useRef } from "react";

export default function SearchIcon() {
  const inputRef = useRef<HTMLInputElement>(null);
  const openModal = (): void => {
    const modal = document.getElementById(
      "modal_search",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <div className="hidden lg:flex">
        <SearchInput inputRef={inputRef} />
      </div>
      <button
        className="btn btn-circle btn-ghost btn-sm lg:hidden"
        onClick={openModal}
      >
        <HiMagnifyingGlass className="h-4 w-4" />
      </button>
    </div>
  );
}
