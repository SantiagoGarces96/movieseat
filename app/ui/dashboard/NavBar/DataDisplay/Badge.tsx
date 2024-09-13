import { IBadgeDashboard } from "@/interfaces/dasboard";

export default function Badge({ label }: IBadgeDashboard) {
  return (
    <div className="badge badge-ghost badge-lg p-3 text-xs font-normal text-gray-500">
      {label}
    </div>
  );
}
