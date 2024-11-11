"use client";
import { useState } from "react";
import Link from "next/link";
import {
  HiBars3,
  HiOutlineXMark,
  HiHome,
  HiCalendar,
  HiFilm,
  HiUserGroup,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { usePathname } from "next/navigation";
import LoginMenu from "./LoginMenu"; // Asegúrate de importar el LoginMenu

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Cartelera", href: "/releases", icon: <HiHome /> },
    { name: "Próximos Estrenos", href: "/upcoming", icon: <HiCalendar /> },
    { name: "Comidas", href: "/foods", icon: <HiUserGroup /> },
    { name: "Nosotros", href: "/about", icon: <HiFilm /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <input
        type="checkbox"
        id="menu-toggle"
        className="hidden"
        checked={isOpen}
        onChange={toggleMenu}
      />

      <div className="lg:hidden">
        <label htmlFor="menu-toggle" className="btn btn-ghost lg:hidden">
          <HiBars3 className="h-6 w-6" />
        </label>

        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex bg-black bg-opacity-50"
            onClick={toggleMenu}
          >
            <div
              className="fixed left-0 top-0 h-full w-[250px] bg-base-100 p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()} // Evita cerrar el menú al hacer clic dentro
            >
              {/* Botón de cierre */}
              <button
                onClick={toggleMenu}
                className="absolute right-4 top-4 text-xl"
              >
                <HiOutlineXMark />
              </button>

              {/* Logo */}
              <div className="mb-6 flex items-center space-x-2">
                <HiFilm className="h-6 w-6" />
                <span className="text-xl font-bold">MovieSeat</span>
              </div>

              {/* Enlaces del menú */}
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-md p-2 ${
                        pathname === item.href
                          ? "bg-blue-200 text-blue-900"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={toggleMenu} // Cierra el menú al hacer clic
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}

                {/* Integrando el LoginMenu aquí */}
                <li>
                  <LoginMenu />
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
