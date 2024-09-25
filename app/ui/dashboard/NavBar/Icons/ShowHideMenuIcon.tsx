"use client";
import { useEffect } from "react";
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

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth > 1024 && closeModal();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <button
      className="btn btn-circle btn-ghost btn-sm lg:hidden"
      onClick={closeModal}
    >
      <HiLogin className="h-5 w-5" />
    </button>
  );
}
