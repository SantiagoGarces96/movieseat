import Image from "next/image";
import {
  HiBars3CenterLeft,
  HiMagnifyingGlass,
  HiOutlineBell,
} from "react-icons/hi2";

export default function DefaultNavBar() {
  return (
    <div className="navbar bg-base-100 border-b">
      <div className="navbar-start">
        <button className="btn btn-ghost btn-circle">
          <HiBars3CenterLeft className="h-5 w-5" />
        </button>
        <button className="btn btn-ghost btn-circle">
          <HiMagnifyingGlass className="h-5 w-5" />
        </button>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <HiOutlineBell className="h-5 w-5" />
            <span className="badge badge-xs badge-secondary indicator-item"></span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 z-[1] mt-3 w-52 rounded-lg p-2 shadow"
          >
            <div>
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                  <span>FY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
