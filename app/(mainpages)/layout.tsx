import Head from "next/head";
import Navbar from '@/app/ui/customers/NavBar/Navbar';
import Footer from '@/app/ui/customers/Footer/Footer';
import { Inter } from "next/font/google";
import { ReactNode } from 'react';


export const metadata = {
  title: "Movieseat",
  description:
    "cine.",
};

// interface LayoutProps {
//     children: ReactNode;
//   }
  

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={inter.className}>
        <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  );
}