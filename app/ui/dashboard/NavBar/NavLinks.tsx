"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navLinks } from "@/constants/dashboard/navLinks";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="menu menu-sm w-full rounded-box bg-base-100">
      {navLinks.map((link) => {
        if (link.icon && link.href) {
          const LinkIcon = link.icon;
          return (
            <li key={link.name} className="mb-3">
              <Link
                href={link.href}
                className={clsx("", { "bg-accent/50": pathname === link.href })}
              >
                <LinkIcon className="h-5 w-5" />
                <span className="text-base font-normal">{link.name}</span>
              </Link>
            </li>
          );
        }
        return (
          <li key={link.name} className="menu-title">
            {link.name}
          </li>
        );
      })}
    </ul>
  );
}
