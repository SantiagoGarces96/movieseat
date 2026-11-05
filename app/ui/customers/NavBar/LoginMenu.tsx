"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { userRole } from "@/types/user";

interface SessionInfo {
  name: string;
  email: string;
  role: userRole;
}

const LoginMenu = ({ onClick }: { onClick?: () => void }) => {
  const [user, setUser] = useState<SessionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.assign("/");
  };

  if (isLoading) {
    return (
      <div className="h-11 w-full animate-pulse rounded-full bg-white/10 lg:w-36" />
    );
  }

  if (!user) {
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
  }

  return (
    <div ref={container} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="ms-btn ms-btn-secondary w-full lg:w-auto"
      >
        <HiOutlineUserCircle className="h-5 w-5 shrink-0" aria-hidden />
        <span className="max-w-40 truncate">{user.name.split(" ")[0]}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 z-50 mb-2 w-64 rounded-2xl border border-white/10 bg-ink-800 p-2 shadow-2xl lg:bottom-auto lg:top-full lg:mb-0 lg:mt-2">
          <div className="border-b border-white/5 px-3 py-2">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>
          {user.role === userRole.ADMIN && (
            <Link
              href="/dashboard"
              className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-white/5"
            >
              Panel de administración
            </Link>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium hover:bg-white/5"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginMenu;
