import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/NavBar/NavLinks";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { HiLogin, HiOutlineTemplate } from "react-icons/hi";

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
        <button className="btn btn-circle btn-ghost">
          <HiLogin className="h-5 w-5" />
        </button>
      </div>
      <NavLinks />
    </div>
  );
}
