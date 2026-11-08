"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import {
  HiOutlineArrowsRightLeft,
  HiOutlineCake,
  HiOutlineCalendarDays,
  HiOutlineFilm,
  HiOutlineListBullet,
  HiOutlineRectangleGroup,
  HiOutlineSquares2X2,
  HiOutlineTicket,
  HiOutlineUser,
  HiOutlineUserGroup,
} from "react-icons/hi2";

export default function NavLinks() {
  const pathname = usePathname();

  const handleClick = () => {
    const modal = document.getElementById(
      "modal_side_navbar",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  return (
    <ul className="menu menu-sm w-full rounded-box bg-base-100">
      <li className="mb-3">
        <Link
          href="/dashboard"
          className={cn({ active: pathname === "/dashboard" })}
          onClick={handleClick}
        >
          <HiOutlineRectangleGroup className="h-5 w-5" />
          <span className="text-base font-normal">Resumen</span>
        </Link>
      </li>
      <li className="menu-title">Secciones</li>
      <li className="mb-3">
        <Link
          href="/dashboard/sessions"
          className={cn({
            active: pathname.includes("/dashboard/sessions"),
          })}
          onClick={handleClick}
        >
          <HiOutlineCalendarDays className="h-5 w-5" />
          <span className="text-base font-normal">Funciones</span>
        </Link>
      </li>
      <li className="mb-3">
        <Link
          href="/dashboard/movies"
          className={cn({
            active: pathname.includes("/dashboard/movies"),
          })}
          onClick={handleClick}
        >
          <HiOutlineFilm className="h-5 w-5" />
          <span className="text-base font-normal">Películas</span>
        </Link>
      </li>
      <li className="mb-3">
        <Link
          href="/dashboard/rooms"
          className={cn({
            active: pathname.includes("/dashboard/rooms"),
          })}
          onClick={handleClick}
        >
          <HiOutlineSquares2X2 className="h-5 w-5" />
          <span className="text-base font-normal">Salas</span>
        </Link>
      </li>
      <li className="mb-3">
        <Link
          href="/dashboard/food"
          className={cn({
            active: pathname.includes("/dashboard/food"),
          })}
          onClick={handleClick}
        >
          <HiOutlineCake className="h-5 w-5" />
          <span className="text-base font-normal">Comida</span>
        </Link>
      </li>
      <li className="mb-3">
        <Link
          href="/dashboard/users"
          className={cn({
            active: pathname.includes("/dashboard/users"),
          })}
          onClick={handleClick}
        >
          <HiOutlineUserGroup className="h-5 w-5" />
          <span className="text-base font-normal">Usuarios</span>
        </Link>
      </li>
      <li className="mb-3">
        <Link
          href="/dashboard/cartelera"
          className={cn({
            active: pathname.includes("/dashboard/cartelera"),
          })}
          onClick={handleClick}
        >
          <HiOutlineListBullet className="h-5 w-5" />
          <span className="text-base font-normal">Cartelera</span>
        </Link>
      </li>
      <li className="mb-3">
        <Link
          href="/dashboard/tickets"
          className={cn({
            active: pathname.includes("/dashboard/tickets"),
          })}
          onClick={handleClick}
        >
          <HiOutlineTicket className="h-5 w-5" />
          <span className="text-base font-normal">Boletas</span>
        </Link>
      </li>
      <li className="mb-3">
        <Link
          href="/dashboard/transactions"
          className={cn({
            active: pathname.includes("/dashboard/transactions"),
          })}
          onClick={handleClick}
        >
          <HiOutlineArrowsRightLeft className="h-5 w-5" />
          <span className="text-base font-normal">Transacciones</span>
        </Link>
      </li>
      <li className="mb-3">
        <Link
          href="/dashboard/profile"
          className={cn({
            active: pathname.includes("/dashboard/profile"),
          })}
          onClick={handleClick}
        >
          <HiOutlineUser className="h-5 w-5" />
          <span className="text-base font-normal">Perfil</span>
        </Link>
      </li>
    </ul>
  );
}
