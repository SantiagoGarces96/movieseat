"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navLinks } from "@/constants/dashboard/navLinks";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="menu menu-md w-full rounded-box bg-base-100">
      {navLinks.map((link) => {
        if (link.icon && link.href) {
          const LinkIcon = link.icon;
          return (
            <li key={link.name} className="mb-3">
              <Link
                href={link.href}
                className={clsx("", { "bg-accent/50": pathname === link.href })}
              >
                <LinkIcon className="h-6 w-6" />
                <span className="text-lg font-light">{link.name}</span>
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
