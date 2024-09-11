"use client";
import { Inter } from "next/font/google";
import { SessionProvider } from 'next-auth/react';
import Navbar from './components/layout/Navbar'; 
import Footer from './components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary`}>
      <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
