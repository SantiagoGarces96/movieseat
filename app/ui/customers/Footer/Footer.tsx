import React from "react";
import { FaGithub, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-16 bg-white">
      <div className="container mx-auto flex flex-col gap-12">
        {/* Main Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold">MovieSeat</h3>
            <p className="mt-4 text-sm">
              Tu plataforma favorita para descubrir películas, obtener boletos, y disfrutar del mejor entretenimiento.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Enlaces Útiles</h4>
            <ul className="mt-4">
              <li><a href="/releases" className="hover:text-#0072BB">Cartelera Actual</a></li>
              <li><a href="/upcoming" className="hover:text-#0072BB">Próximos Estrenos</a></li>
              <li><a href="/foods" className="hover:text-#0072BB">Snacks & Bebidas</a></li>
              <li><a href="/about" className="hover:text-#0072BB">Sobre Nosotros</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold ">Contáctanos</h4>
            <p className="mt-4 text-sm">
              Calle 123, Ciudad, País <br />
              Teléfono: +1 234 567 890 <br />
              Email: contacto@movieseat.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t"></div>

        {/* Social Links & Copyright */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <a href="https://github.com/" className="hover:text-#0072BB">
              <FaGithub className="h-6 w-6" />
            </a>
            <a href="https://facebook.com" className="hover:text-#0072BB">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" className="hover:text-#0072BB">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" className="hover:text-#0072BB">
              <FaTwitter className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} MovieSeat. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
