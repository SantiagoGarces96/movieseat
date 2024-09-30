"use client";

export default function OpenModal({ label }: { label: string }) {
  const openModal = (): void => {
    const modal = document.getElementById(
      "modal_create",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <button
      className="btn btn-secondary btn-sm text-primary"
      onClick={openModal}
    >
      {label}
    </button>
  );
}
