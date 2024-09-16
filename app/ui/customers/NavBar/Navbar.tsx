import React from "react";

const Navbar = () => {
  return (
    <nav className="p-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
      <a href="/home"><div className="text-2xl font-bold">MovieSeat</div></a>
        <div className="flex gap-6">
          <a href="/releases" className="hover:text-[#0072BB] capitalize">Cartelera</a>
          <a href="/upcoming" className="hover:text-[#0072BB] capitalize">Proximos Estrenos</a>
          <a href="/foods" className="hover:text-[#0072BB] capitalize">Comidas</a>
          <a href="/about" className="hover:text-[#0072BB] capitalize">Nosotros</a>
        </div>
        <div>
          <button className="bg-[#0072BB] text-[#FFFDF6] px-4 py-2 rounded capitalize">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
