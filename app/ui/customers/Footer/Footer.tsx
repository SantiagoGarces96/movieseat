import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-12 text-white">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16">
        {/* Main Info Section */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* MovieSeat Info */}
          <div>
            <h3 className="text-3xl font-bold text-black">MovieSeat</h3>
            <p className="mt-4 text-lg text-black">
              Tu plataforma favorita para descubrir películas, obtener boletos,
              y disfrutar del mejor entretenimiento.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-xl font-semibold text-black">Enlaces Útiles</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="/releases"
                  className="text-black transition-colors hover:text-blue-400"
                >
                  Cartelera Actual
                </a>
              </li>
              <li>
                <a
                  href="/upcoming"
                  className="text-black transition-colors hover:text-blue-400"
                >
                  Próximos Estrenos
                </a>
              </li>
              <li>
                <a
                  href="/foods"
                  className="text-black transition-colors hover:text-blue-400"
                >
                  Comidas
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-black transition-colors hover:text-blue-400"
                >
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xl font-semibold text-black">Síguenos</h4>
            <div className="mt-4 flex space-x-6">
              <a
                href="https://github.com/SantiagoGarces96/movieseat"
                className="text-black transition-colors hover:text-blue-500"
              >
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="mt-12 border-t border-gray-600"></div>

        {/* Footer Bottom Section */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-black sm:text-right lg:text-base">
            © {new Date().getFullYear()} MovieSeat.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
