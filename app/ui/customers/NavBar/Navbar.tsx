import MobileMenu from "./MobileMenu";
import { HiBars3 } from "react-icons/hi2";

const Navbar = () => {
  return (
    <div className="drawer z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <nav className="sticky top-0 w-full bg-white p-4 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <a href="/home">
              <div className="text-2xl font-bold">MovieSeat</div>
            </a>
            <div className="hidden gap-6 md:flex">
              <a href="/releases" className="capitalize hover:text-[#0072BB]">
                Cartelera
              </a>
              <a href="/upcoming" className="capitalize hover:text-[#0072BB]">
                Proximos Estrenos
              </a>
              <a href="/foods" className="capitalize hover:text-[#0072BB]">
                Comidas
              </a>
              <a href="/about" className="capitalize hover:text-[#0072BB]">
                Nosotros
              </a>
            </div>
            <div className="hidden md:block">
              <button className="rounded bg-[#0072BB] px-4 py-2 capitalize text-[#FFFDF6]">
                Login
              </button>
            </div>

            <div className="md:hidden">
              <label htmlFor="my-drawer" className="btn bg-transparent">
                <HiBars3 className="h-6 w-6" />
              </label>
            </div>
          </div>
        </nav>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu min-h-full w-80 bg-white p-4 text-base-content">
          {/* Sidebar content here */}
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
