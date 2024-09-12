import React from "react";
import CloseSearchIcon from "../Icons/CloseSearchIcon";
import SearchInput from "../Inputs/SearchInput";

export default function ModalSearch() {
  return (
    <dialog id="modal_search" className="modal modal-top">
      <div className="absolute h-full w-[98%] rounded-none bg-base-100">
        <div className="grid w-full grid-cols-10 gap-2 p-2">
          <div className="col-span-9 grid">
            <SearchInput />
          </div>
          <CloseSearchIcon />
        </div>
      </div>
    </dialog>
  );
}
