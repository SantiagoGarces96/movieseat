import React from "react";
import { FaGithub, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-8 bg-white">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16">
        {/* Main Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold">MovieSeat</h3>
            <p className="mt-4 text-sm lg:text-base">
              Tu plataforma favorita para descubrir películas, obtener boletos, y disfrutar del mejor entretenimiento.
            </p>
          </div>
          <div>
            <h4 className="text-xl lg:text-2xl font-semibold">Enlaces Útiles</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="/releases" className="hover:text-blue-500 capitalize" >Cartelera Actual</a></li>
              <li><a href="/upcoming" className="hover:text-blue-500 capitalize">Próximos Estrenos</a></li>
              <li><a href="/foods" className="hover:text-blue-500 capitalize">comidas</a></li>
              <li><a href="/about" className="hover:text-blue-500 capitalize">Sobre Nosotros</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl lg:text-2xl font-semibold capitalize">Contáctanos</h4>
            <p className="mt-4 text-sm lg:text-base capitalize">
              Calle 123, Ciudad, País <br />
              Teléfono: +1 234 567 890 <br />
              Email: contacto@movieseat.com
            </p>
          </div>
        </div>

        <div className="border-t mt-8 lg:mt-12"></div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <div className="flex gap-4">
            <a href="https://github.com/" className="hover:text-blue-500">
              <FaGithub className="h-6 w-6" />
            </a>
            <a href="https://facebook.com" className="hover:text-blue-500">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" className="hover:text-blue-500">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" className="hover:text-blue-500">
              <FaTwitter className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm lg:text-base text-center sm:text-right">
            © {new Date().getFullYear()} MovieSeat. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
