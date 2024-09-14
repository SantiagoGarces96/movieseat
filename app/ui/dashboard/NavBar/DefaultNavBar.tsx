import Image from "next/image";
import ModalSideNavBar from "./Modals/ModalSideNavBar";
import MenuIcon from "./Icons/MenuIcon";
import SearchIcon from "./Icons/SearchIcon";

export default function DefaultNavBar() {
  return (
    <div className="navbar border-b bg-base-100">
      <ModalSideNavBar />
      <div className="navbar-start">
        <MenuIcon />
        <SearchIcon />
      </div>
      <div className="navbar-end">
        {/* TODO get all data from next-auth */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost btn-md"
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
            className="menu dropdown-content menu-sm z-[1] mt-3 w-64 rounded-lg bg-base-100 shadow-md"
          >
            <div className="flex w-full items-center justify-start gap-3 border-b p-4">
              <div className="avatar placeholder">
                <div className="w-12 rounded-full bg-accent text-primary">
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
