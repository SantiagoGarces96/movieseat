"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteLinks } from "./links";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
      {siteLinks.map(({ name, href }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`ms-link text-sm font-medium ${
              isActive ? "text-gold" : "text-muted"
            }`}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;
