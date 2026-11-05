"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBars3, HiOutlineXMark } from "react-icons/hi2";
import LoginMenu from "./LoginMenu";
import { siteLinks } from "./links";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú"
        aria-expanded={isOpen}
        className="ms-link flex h-11 w-11 items-center justify-center text-paper"
      >
        <HiBars3 className="h-6 w-6" aria-hidden />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 h-dvh bg-black/60"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col bg-ink-900 p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar menú"
              className="ms-link mb-4 flex h-11 w-11 items-center justify-center self-end text-paper"
            >
              <HiOutlineXMark className="h-6 w-6" aria-hidden />
            </button>

            <nav aria-label="Principal" className="flex flex-col gap-1">
              {siteLinks.map(({ name, href }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-white/5 text-gold"
                        : "text-paper hover:bg-white/5"
                    }`}
                  >
                    {name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6">
              <LoginMenu />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
