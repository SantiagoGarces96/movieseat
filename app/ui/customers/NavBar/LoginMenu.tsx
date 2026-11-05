import Link from "next/link";
import { HiOutlineUserCircle } from "react-icons/hi2";

const LoginMenu = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link
      href="/login"
      onClick={onClick}
      className="ms-btn ms-btn-secondary w-full lg:w-auto"
    >
      <HiOutlineUserCircle className="h-5 w-5" aria-hidden />
      Iniciar sesión
    </Link>
  );
};

export default LoginMenu;
