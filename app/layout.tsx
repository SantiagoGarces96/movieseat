import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/customers/NavBar/Navbar";
import Footer from "./ui/customers/Footer/Footer";

export const metadata = {
  title: "Movieseat",
  description: "cine.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-auto bg-primary`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
