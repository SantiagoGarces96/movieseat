import SideNav from "../SideNavBar";

export default function SideNavBarModal() {
  return (
    <dialog id="modal_side_navbar" className="modal modal-top">
      <div className="absolute h-full w-full rounded-none bg-base-100">
        <SideNav />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
