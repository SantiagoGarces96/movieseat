"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.assign("/login");
  };

  return (
    <button type="button" className="link link-secondary" onClick={handleLogout}>
      Cerrar Sesion
    </button>
  );
}
