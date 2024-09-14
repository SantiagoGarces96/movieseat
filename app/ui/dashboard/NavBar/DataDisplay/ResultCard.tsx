import { IResultDataDashboard } from "@/interfaces/dasboard";
import Image from "next/image";
import Link from "next/link";

export default function ResultCard({ src, label, href }: IResultDataDashboard) {
  return (
    <li className="">
      <Link href={href}>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <Image src={src} alt={label} width={100} height={100} />
          </div>
        </div>
        <span className="text-base capitalize">{label}</span>
      </Link>
    </li>
  );
}
