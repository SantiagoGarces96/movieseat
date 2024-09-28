import Footer from "../ui/customers/Footer/Footer";
import Navbar from "../ui/customers/NavBar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="h-full min-h-screen w-full">{children}</div>
      <Footer />
    </div>
  );
}
