"use client";
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  // const { data: session } = useSession();

  // if (status === 'loading') {
  //   return null; // O bien, un placeholder para evitar cambios entre el servidor y el cliente
  // }

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-white font-bold text-xl">
        <a href="/">MovieSeat</a>
      </div>

      {/* Links */}
      <ul className="flex space-x-4 text-white">
        <li><a href="/releases">Estrenos</a></li>
        <li><a href="/upcoming">Proximos a estrenar</a></li>
        <li><a href="/foods">Comidas</a></li>
        <li><a href="/about">Acerca de</a></li>
      </ul>

      {/* Login / Logout */}
      <div>
        {/* {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 px-4 py-2 text-white rounded-md"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 px-4 py-2 text-white rounded-md"
          >
            Login
          </button>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
