import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Logo from "../NavBar/Logo";
import { siteLinks } from "../NavBar/links";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/5 bg-ink-900">
      <div className="ms-container py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Logo />
          <nav
            aria-label="Pie de página"
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
          >
            {siteLinks.map(({ name, href }) => (
              <Link key={href} href={href} className="ms-link">
                {name}
              </Link>
            ))}
          </nav>
          <a
            href="https://github.com/SantiagoGarces96/movieseat"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MovieSeat en GitHub"
            className="ms-link w-fit text-muted"
          >
            <FaGithub className="h-6 w-6" aria-hidden />
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs text-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} MovieSeat</p>
          <p>
            Este producto usa la API de TMDB, pero TMDB no lo respalda ni lo
            certifica.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
