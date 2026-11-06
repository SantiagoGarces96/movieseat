import MobileMenu from "./MobileMenu";
import LoginMenu from "./LoginMenu";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/85 backdrop-blur-md">
      <div className="ms-container flex h-16 items-center justify-between gap-6">
        <Logo />
        <NavLinks />
        <div className="hidden lg:block">
          <LoginMenu />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

export default Navbar;
