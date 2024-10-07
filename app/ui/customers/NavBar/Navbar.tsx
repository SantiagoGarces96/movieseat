import Link from "next/link";
import { HiBars3 } from "react-icons/hi2";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="navbar-start">
        {/* Menú para móvil */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <HiBars3 className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/releases">Cartelera</Link>
            </li>
            <li>
              <Link href="/upcoming">Próximos Estrenos</Link>
            </li>
            <li>
              <Link href="/foods">Comidas</Link>
            </li>
            <li>
              <Link href="/about">Nosotros</Link>
            </li>
            <li>
              <Link href="/login">
                <button className="btn btn-primary w-full">Login</button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="btn btn-ghost text-xl normal-case">
          MovieSeat
        </Link>
      </div>

      {/* Menú para escritorio */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/releases">Cartelera</Link>
          </li>
          <li>
            <Link href="/upcoming">Próximos Estrenos</Link>
          </li>
          <li>
            <Link href="/foods">Comidas</Link>
          </li>
          <li>
            <Link href="/about">Nosotros</Link>
          </li>
        </ul>
      </div>

      {/* Botón de Login */}
      <div className="navbar-end hidden lg:flex">
        <Link href="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
