import { requireAdmin } from "@/lib/auth";
import LogoutButton from "./LogoutButton";
import MenuIcon from "./Icons/MenuIcon";
import SearchIcon from "./Icons/SearchIcon";

const getInitials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

export default async function DefaultNavBar() {
  const { name, email } = await requireAdmin();
  const initials = getInitials(name);

  return (
    <div className="navbar sticky top-0 z-50 border-b bg-base-100">
      <div className="navbar-start">
        <MenuIcon />
        <SearchIcon />
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            aria-label="Cuenta"
            className="avatar placeholder btn btn-circle btn-ghost btn-sm"
          >
            <div className="w-8 rounded-full bg-accent text-primary">
              <span className="text-xs">{initials}</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-64 rounded-lg bg-base-100 shadow-md"
          >
            <div className="flex w-full items-center justify-start gap-3 p-4">
              <div className="avatar placeholder">
                <div className="w-12 rounded-full bg-accent text-primary">
                  <span>{initials}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <h3 className="truncate font-bold">{name}</h3>
                <div>
                  <div className="overflow-hidden truncate font-normal text-gray-400">
                    {email}
                  </div>
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
