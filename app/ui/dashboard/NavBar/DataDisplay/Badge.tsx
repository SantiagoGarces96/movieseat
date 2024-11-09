"use client";
import useParams from "@/app/hooks/useParams";
import { IBadgeDashboard } from "@/interfaces/dasboard";

export default function Badge({ label }: IBadgeDashboard) {
  const { updateParam } = useParams();

  const handleClick = () => {
    updateParam("query", label);
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
