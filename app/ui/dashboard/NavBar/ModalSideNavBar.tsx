import SideNav from "./SideNavBar";

export default function ModalSideNavBar() {
  return (
    <dialog id="modal_side_navbar" className="modal modal-top">
      <div className="absolute h-full w-[20rem] rounded-none bg-base-100">
        <SideNav />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
