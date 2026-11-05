import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "MovieSeat | Cartelera y boletas de cine",
  description:
    "Mira qué hay en cartelera, descubre los próximos estrenos y elige tu película en MovieSeat.",
};

const inter = Inter({ subsets: ["latin"], preload: true });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} overflow-auto bg-primary`}>
        <main className="h-full w-full">{children}</main>
      </body>
    </html>
  );
}
