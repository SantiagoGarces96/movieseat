import { IResultDataDashboard } from "@/interfaces/dasboard";
import Image from "next/image";
import React from "react";

export default function ResultCard({ src, label }: IResultDataDashboard) {
  return (
    <div className="flex items-center justify-start gap-2">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <Image src={src} alt={label} width={100} height={100} />
        </div>
      </div>
      <span className="text-base capitalize">{label}</span>
    </div>
  );
}
