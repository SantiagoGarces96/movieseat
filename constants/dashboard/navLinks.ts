import { INavLinks } from "@/interfaces/dasboard";
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

export const navLinks: INavLinks[] = [
  { name: "Dasboard", href: "/dashboard", icon: HiOutlineRectangleGroup },
  { name: "Pages" },
  {
    name: "Sesiones",
    href: "/dashboard/sessions",
    icon: HiOutlineCalendarDays,
  },
  {
    name: "Películas",
    href: "/dashboard/movies",
    icon: HiOutlineFilm,
  },
  {
    name: "Salas",
    href: "/dashboard/rooms",
    icon: HiOutlineSquares2X2,
  },
  {
    name: "Comida",
    href: "/dashboard/food",
    icon: HiOutlineCake,
  },
  {
    name: "Usuarios",
    href: "/dashboard/users",
    icon: HiOutlineUserGroup,
  },
  {
    name: "Boletos",
    href: "/dashboard/tickets",
    icon: HiOutlineTicket,
  },
  {
    name: "Transacciones",
    href: "/dashboard/transactions",
    icon: HiOutlineArrowsRightLeft,
  },
  {
    name: "Perfil",
    href: "/dashboard/profile",
    icon: HiOutlineUser,
  },
];
