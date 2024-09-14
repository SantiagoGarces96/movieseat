"use client";
import { useEffect, useRef } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchIcon() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const openModal = (): void => {
    const modal = document.getElementById(
      "modal_search",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        focusInput();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className="hidden lg:flex">
        <label className="input input-sm input-bordered flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <kbd className="kbd kbd-sm">CTRL</kbd>+
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
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
