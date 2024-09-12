import React from "react";
import { HiMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import CloseSearchIcon from "../Icons/CloseSearchIcon";

export default function ModalSearch() {
  return (
    <dialog id="modal_search" className="modal modal-top">
      <div className="absolute h-full w-[98%] rounded-none bg-base-100">
        <div className="grid w-full grid-cols-10 gap-2 p-2">
          <div className="col-span-9 grid">
            <label className="input input-sm input-bordered flex w-full items-center gap-2">
              <HiMagnifyingGlass className="h-5 w-5" />
              <input type="text" className="grow" placeholder="Search" />
            </label>
          </div>
          <CloseSearchIcon />
        </div>
      </div>
    </dialog>
  );
}
