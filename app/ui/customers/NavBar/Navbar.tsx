import Link from "next/link";
import MobileMenu from "./MobileMenu";
import LoginMenu from "./LoginMenu";

const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="navbar-start">
        <MobileMenu />

        <Link href="/" className="btn btn-ghost text-xl font-bold">
          MovieSeat
        </Link>
      </div>

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

      <div className="navbar-end hidden lg:flex">
        <LoginMenu />
      </div>
    </div>
  );
};

export default Navbar;
