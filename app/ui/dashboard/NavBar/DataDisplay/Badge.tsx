"use client";
import { IBadgeDashboard } from "@/interfaces/dasboard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Badge({ label }: IBadgeDashboard) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("query", label);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className="badge badge-ghost badge-lg cursor-pointer p-3 text-xs font-normal text-gray-500 hover:bg-accent hover:text-white"
      onClick={handleClick}
    >
      {label}
    </div>
  );
}
