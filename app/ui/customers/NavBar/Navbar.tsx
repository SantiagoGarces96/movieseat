import React from "react";

const Navbar = () => {
  return (
    <nav className="p-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">MovieSeat</div>
        <div className="flex gap-6">
          <a href="/home" className="hover:text-[#0072BB]">Home</a>
          <a href="/releases" className="hover:text-[#0072BB]">Releases</a>
          <a href="/upcoming" className="hover:text-[#0072BB]">Upcoming</a>
          <a href="/foods" className="hover:text-[#0072BB]">Snacks</a>
          <a href="/about" className="hover:text-[#0072BB]">About Us</a>
        </div>
        <div>
          <button className="bg-[#0072BB] text-[#FFFDF6] px-4 py-2 rounded">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
