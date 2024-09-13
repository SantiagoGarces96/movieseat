import React from "react";
import CloseSearchIcon from "../Icons/CloseSearchIcon";
import SearchInput from "../Inputs/SearchInput";
import RecentSearch from "../DataDisplay/RecentSearch";
import ResultsSearchs from "../DataDisplay/ResultsSearch";
import { IResultDataDashboard } from "@/interfaces/dasboard";

export default function ModalSearch() {
  //TODO this data is getting from API
  const usersData: IResultDataDashboard[] = [
    {
      src: "https://avatars.githubusercontent.com/u/93413716?v=4&size=256",
      label: "felipe yepes",
    },
    {
      src: "https://avatars.githubusercontent.com/u/93413716?v=4&size=256",
      label: "felipe yepes",
    },
    {
      src: "https://avatars.githubusercontent.com/u/93413716?v=4&size=256",
      label: "felipe yepes",
    },
    {
      src: "https://avatars.githubusercontent.com/u/93413716?v=4&size=256",
      label: "felipe yepes",
    },
  ];
  const moviesData: IResultDataDashboard[] = [];
  const foodData: IResultDataDashboard[] = [
    {
      src: "https://avatars.githubusercontent.com/u/93413716?v=4&size=256",
      label: "felipe yepes",
    },
    {
      src: "https://avatars.githubusercontent.com/u/93413716?v=4&size=256",
      label: "felipe yepes",
    },
    {
      src: "https://avatars.githubusercontent.com/u/93413716?v=4&size=256",
      label: "felipe yepes",
    },
    {
      src: "https://avatars.githubusercontent.com/u/93413716?v=4&size=256",
      label: "felipe yepes",
    },
  ];
  const roomsData: IResultDataDashboard[] = [];
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
