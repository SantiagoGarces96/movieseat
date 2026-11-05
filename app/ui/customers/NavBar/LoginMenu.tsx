"use client";

import { signIn } from "next-auth/react";
import { HiOutlineUserCircle } from "react-icons/hi2";

const LoginMenu = () => {
  return (
    <button
      type="button"
      className="ms-btn ms-btn-secondary w-full lg:w-auto"
      onClick={() => signIn("google")}
    >
      <HiOutlineUserCircle className="h-5 w-5" aria-hidden />
      Iniciar sesión
    </button>
  );
};

export default LoginMenu;
