import Link from "next/link";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import ShowHideMenu from "./Icons/ShowHideMenuIcon";
import NavLinks from "@/app/ui/dashboard/NavBar/NavLinks";

// FIXME validate when section is selected in URL
export default function SideNav() {
  return (
    <div className="flex h-full min-w-80 flex-col border-r p-2 lg:min-w-60">
      <div className="flex w-full items-center justify-between px-2 py-4">
        <Link
          className="flex items-center justify-center gap-2"
          href="/dashboard"
        >
          <HiOutlineVideoCamera className="h-9 w-9" />
          <h1 className="text-xl font-bold">MoviesSeat</h1>
        </Link>
        <ShowHideMenu />
      </div>
      <div className="overflow-auto">
        <NavLinks />
      </div>
    </div>
  );
}
