import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchInput() {
  return (
    <label className="input input-sm input-bordered flex w-full items-center gap-2">
      <HiMagnifyingGlass className="h-5 w-5" />
      <input type="text" className="grow" placeholder="Search" />
    </label>
  );
}
