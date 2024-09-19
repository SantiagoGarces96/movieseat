"use client";
import React, { useState } from "react";
import MobileMenu from "./menuNavbar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 w-full p-4 bg-white z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/home">
            <div className="text-2xl font-bold">MovieSeat</div>
          </a>
          <div className="hidden md:flex gap-6">
            <a href="/releases" className="hover:text-[#0072BB] capitalize">Cartelera</a>
            <a href="/upcoming" className="hover:text-[#0072BB] capitalize">Proximos Estrenos</a>
            <a href="/foods" className="hover:text-[#0072BB] capitalize">Comidas</a>
            <a href="/about" className="hover:text-[#0072BB] capitalize">Nosotros</a>
          </div>
          <div className="hidden md:block">
            <button className="bg-[#0072BB] text-[#FFFDF6] px-4 py-2 rounded capitalize">Login</button>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
