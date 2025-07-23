"use client";

import { useState } from "react";
import { Playfair_Display, Raleway, Syne } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/app/components/Header";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-sub",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
});

const tanKulture = localFont({
  src: "../app/fonts/TanKulture.otf",
  variable: "--font-tankulture",
});

const xtradex = localFont({
  src: "../app/fonts/XtradeX.ttf",
  variable: "--font-xtradex",
});

const almost = localFont({
  src: "../app/fonts/AlmostTextual.ttf",
  variable: "--font-almost",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${raleway.variable} ${syne.variable} ${
          xtradex.variable
        } ${almost.variable} ${tanKulture.variable} font-souvenir antialiased ${
          isOpen ? "menu-open" : ""
        }`}
      >
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <main
          className={`min-h-screen transition-transform duration-800 ease-in-out ${
            isOpen ? "-translate-x-[40vw]" : "translate-x-0"
          }`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
