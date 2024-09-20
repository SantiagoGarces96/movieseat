const MobileMenu = () => {
  return (
    <div className="h-full w-full max-w-xs bg-white p-6 shadow-lg">
      <button className="mb-4 w-full text-right text-lg">&times;</button>
      <ul className="flex flex-col gap-4">
        <li>
          <a href="/releases" className="hover:text-[#0072BB]">
            Cartelera
          </a>
        </li>
        <li>
          <a href="/upcoming" className="hover:text-[#0072BB]">
            Proximos Estrenos
          </a>
        </li>
        <li>
          <a href="/foods" className="hover:text-[#0072BB]">
            Comidas
          </a>
        </li>
        <li>
          <a href="/about" className="hover:text-[#0072BB]">
            Nosotros
          </a>
        </li>
      </ul>
      <div className="mt-6">
        <button className="w-full rounded bg-[#0072BB] py-2 text-white">
          Login
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
