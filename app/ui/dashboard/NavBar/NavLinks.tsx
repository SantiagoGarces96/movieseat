"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import {
  HiOutlineArrowsRightLeft,
  HiOutlineCake,
  HiOutlineCalendarDays,
  HiOutlineFilm,
  HiOutlineRectangleGroup,
  HiOutlineSquares2X2,
  HiOutlineTicket,
  HiOutlineUser,
  HiOutlineUserGroup,
} from "react-icons/hi2";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="menu menu-sm w-full rounded-box bg-base-100">
      <li className="mb-3">
        <Link
          href="/dashboard"
          className={cn({ active: pathname === "/dashboard" })}
        >
          <HiOutlineRectangleGroup className="h-5 w-5" />
          <span className="text-base font-normal">Dasboard</span>
        </Link>
      </li>
      <li className="menu-title">Pages</li>
      <li className="mb-3">
        <Link
          href="/dashboard/sessions"
          className={cn({
            active: pathname.includes("/dashboard/sessions"),
          })}
        >
          <HiOutlineCalendarDays className="h-5 w-5" />
          <span className="text-base font-normal">Sesiones</span>
        </Link>
      </li>
      <li className="mb-3">
        <Link
          href="/dashboard/movies"
          className={cn({
            active: pathname.includes("/dashboard/movies"),
          })}
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
        >
          <HiOutlineUserGroup className="h-5 w-5" />
          <span className="text-base font-normal">Usuarios</span>
        </Link>
      </li>
      <li className="mb-3">
        <Link
          href="/dashboard/tickets"
          className={cn({
            active: pathname.includes("/dashboard/tickets"),
          })}
        >
          <HiOutlineTicket className="h-5 w-5" />
          <span className="text-base font-normal">Boletos</span>
        </Link>
      </li>
      <li className="mb-3">
        <Link
          href="/dashboard/transactions"
          className={cn({
            active: pathname.includes("/dashboard/transactions"),
          })}
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
        >
          <HiOutlineUser className="h-5 w-5" />
          <span className="text-base font-normal">Perfil</span>
        </Link>
      </li>
    </ul>
  );
}
