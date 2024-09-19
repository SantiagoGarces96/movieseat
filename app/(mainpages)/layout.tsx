import Navbar from '@/app/ui/customers/NavBar/Navbar';
import Footer from '@/app/ui/customers/Footer/Footer';
import { Inter } from "next/font/google";
import { ReactNode } from 'react';

export const metadata = {
  title: "Movieseat",
  description: "cine.",
};

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`${inter.className} bg-primary`}>
      <Navbar/>
      <main>{children}</main>
      <Footer />
    </div>
      
  );
}
