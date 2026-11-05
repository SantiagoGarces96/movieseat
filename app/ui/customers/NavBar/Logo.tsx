import Link from "next/link";
import { MdEventSeat } from "react-icons/md";

const Logo = () => (
  <Link
    href="/"
    className="ms-link inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-paper"
  >
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-ink-950">
      <MdEventSeat className="h-5 w-5" aria-hidden />
    </span>
    MovieSeat
  </Link>
);

export default Logo;
