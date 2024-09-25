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
    name: "Sessions",
    href: "/dashboard/sessions",
    icon: HiOutlineCalendarDays,
  },
  {
    name: "Movies",
    href: "/dashboard/movies",
    icon: HiOutlineFilm,
  },
  {
    name: "Rooms",
    href: "/dashboard/rooms",
    icon: HiOutlineSquares2X2,
  },
  {
    name: "Food",
    href: "/dashboard/food",
    icon: HiOutlineCake,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: HiOutlineUserGroup,
  },
  {
    name: "Tickets",
    href: "/dashboard/tickets",
    icon: HiOutlineTicket,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: HiOutlineArrowsRightLeft,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: HiOutlineUser,
  },
];
