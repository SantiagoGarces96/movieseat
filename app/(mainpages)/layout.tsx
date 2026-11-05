import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "../ui/customers/Footer/Footer";
import Navbar from "../ui/customers/NavBar/Navbar";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-theme="mytheme"
      className={`${jakarta.className} flex min-h-screen w-full flex-col bg-ink-950 text-paper antialiased`}
    >
      <Navbar />
      <div className="w-full flex-1">{children}</div>
      <Footer />
    </div>
  );
}
