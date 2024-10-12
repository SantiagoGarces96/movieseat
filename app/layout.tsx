import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Movieseat",
  description: "cine.",
};

const inter = Inter({ subsets: ["latin"], preload: true });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-auto bg-primary`}>
        <main className="h-full w-full">{children}</main>
      </body>
    </html>
  );
}
