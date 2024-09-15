import Head from "next/head";
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
    <html lang="es">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta charSet="UTF-8" /> {/* Ensure correct character encoding */}
      </Head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main> {/* Use <main> for children */}
        <Footer />
      </body>
    </html>
  );
}
