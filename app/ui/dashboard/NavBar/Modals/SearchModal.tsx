import CloseSearchIcon from "../Icons/CloseSearchIcon";
import SearchInput from "../Inputs/SearchInput";
import RecentSearch from "../DataDisplay/RecentSearch";
import ResultsSearchs from "../DataDisplay/ResultsSearch";
import { Suspense } from "react";

export default async function SearchModal() {
  return (
    <dialog id="modal_search" className="modal modal-top">
      <div className="absolute h-full w-full overflow-auto rounded-none bg-base-100">
        <div className="grid w-full grid-cols-10 gap-2 p-2">
          <div className="col-span-9 grid">
            <Suspense>
              <SearchInput />
            </Suspense>
          </div>
          <CloseSearchIcon />
        </div>
        <RecentSearch />
        <Suspense>
          <ResultsSearchs />
        </Suspense>
      </div>
    </dialog>
  );
}
