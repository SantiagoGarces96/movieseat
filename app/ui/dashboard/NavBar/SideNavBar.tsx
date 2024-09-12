import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/NavBar/NavLinks";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import ShowHideMenu from "./ShowHideMenu";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col">
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
