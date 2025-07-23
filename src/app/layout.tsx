import type { Metadata } from "next";
import { Playfair_Display, Raleway, Syne } from "next/font/google";
import localFont from "next/font/local";
import ClientLayoutWrapper from "@/app/components/ClientLayoutWrapper";
import "./globals.css";

// Font Definitions
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

export const metadata: Metadata = {
  title: "Alwin Mathew | Creative Developer",
  description:
    "A portfolio showcasing beautiful and functional web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClassNames = `${playfair.variable} ${raleway.variable} ${syne.variable} ${xtradex.variable} ${almost.variable} ${tanKulture.variable} antialiased`;

  return (
    <html lang="en">
      <ClientLayoutWrapper fontClassNames={fontClassNames}>
        {children}
      </ClientLayoutWrapper>
    </html>
  );
}
