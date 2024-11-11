"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { HiOutlineUserCircle } from "react-icons/hi2";

const LoginMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button className="btn btn-primary" onClick={toggleDropdown}>
        <HiOutlineUserCircle className="text-2xl" />
        Iniciar sesión
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white shadow-lg">
          <ul className="menu p-2">
            <li>
              <button
                onClick={() => signIn("google")}
                className="block w-full px-4 py-2 text-left text-black"
              >
                Iniciar con Google
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LoginMenu;
