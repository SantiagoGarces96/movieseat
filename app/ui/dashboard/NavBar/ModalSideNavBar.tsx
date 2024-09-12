import SideNav from "./SideNavBar";

export default function ModalSideNavBar() {
  return (
    <dialog id="modal_side_navbar" className="modal modal-top">
      <div className="modal-box h-[90rem] w-[20rem] rounded-none !p-0">
        <SideNav />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
