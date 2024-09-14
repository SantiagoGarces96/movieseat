import CloseSearchIcon from "../Icons/CloseSearchIcon";
import SearchInput from "../Inputs/SearchInput";
import RecentSearch from "../DataDisplay/RecentSearch";
import { IResultDataDashboard } from "@/interfaces/dasboard";
import ResultsSearchs from "../DataDisplay/ResultsSearch";

export default async function ModalSearch({
  usersData,
  moviesData,
  foodData,
  roomsData,
}: {
  usersData: IResultDataDashboard[];
  moviesData: IResultDataDashboard[];
  foodData: IResultDataDashboard[];
  roomsData: IResultDataDashboard[];
}) {
  return (
    <dialog id="modal_search" className="modal modal-top">
      <div className="absolute h-full w-[98%] overflow-auto rounded-none bg-base-100">
        <div className="grid w-full grid-cols-10 gap-2 p-2">
          <div className="col-span-9 grid">
            <SearchInput />
          </div>
          <CloseSearchIcon />
        </div>
        <RecentSearch />
        <div className="h-[85%] w-full overflow-auto">
          {!!usersData.length && (
            <ResultsSearchs title="Users" resultData={usersData} />
          )}
          {!!moviesData.length && (
            <ResultsSearchs title="Movies" resultData={moviesData} />
          )}
          {!!foodData.length && (
            <ResultsSearchs title="Food" resultData={foodData} />
          )}
          {!!roomsData.length && (
            <ResultsSearchs title="Rooms" resultData={roomsData} />
          )}
        </div>
      </div>
    </dialog>
  );
}
