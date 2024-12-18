import { IResultDataDashboard } from "@/interfaces/dasboard";
import Image from "next/image";
import Link from "next/link";

export default function ResultCard({ src, label, href }: IResultDataDashboard) {
  const handleClick = () => {
    const modal = document.getElementById(
      "modal_search",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };
  return (
    <li className="">
      <Link href={href} onClick={handleClick}>
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
