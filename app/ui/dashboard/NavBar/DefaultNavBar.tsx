import Image from "next/image";
import { HiBars3CenterLeft, HiMagnifyingGlass } from "react-icons/hi2";

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
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src="https://avatars.githubusercontent.com/u/93413716?v=4&size=256"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 z-[1] mt-3 w-64 rounded-lg shadow-md"
          >
            <div className="flex w-full items-center justify-start gap-3 border-b p-4">
              <div className="avatar placeholder">
                <div className="bg-accent text-primary w-12 rounded-full">
                  <span>FY</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <h3 className="truncate font-bold">Felipe Yepes</h3>
                <div>
                  <div className="overflow-hidden truncate font-normal text-gray-400">
                    yepilef@gmail.com
                  </div>
                  <a className="link link-secondary">Cerrar Sesion</a>
                </div>
              </div>
            </div>
            <ul className="menu menu-md bg-base-100">
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
