import React from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white h-full w-4/5 max-w-xs p-6 shadow-lg">
        <button
          className="text-right w-full mb-4 text-lg"
          onClick={onClose}
        >
          &times;
        </button>
        <ul className="flex flex-col gap-4">
          <li>
            <a href="/releases" className="hover:text-[#0072BB]" onClick={onClose}>Cartelera</a>
          </li>
          <li>
            <a href="/upcoming" className="hover:text-[#0072BB]" onClick={onClose}>Proximos Estrenos</a>
          </li>
          <li>
            <a href="/foods" className="hover:text-[#0072BB]" onClick={onClose}>Comidas</a>
          </li>
          <li>
            <a href="/about" className="hover:text-[#0072BB]" onClick={onClose}>Nosotros</a>
          </li>
        </ul>
        <div className="mt-6">
          <button className="bg-[#0072BB] text-white w-full py-2 rounded" onClick={onClose}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
