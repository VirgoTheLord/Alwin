import type { Metadata } from "next";
import { Playfair_Display, Raleway, Syne } from "next/font/google";
import localFont from "next/font/local";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
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
  src: "../app/fonts/Xtradex.ttf",
  variable: "--font-xtradex",
});

const almost = localFont({
  src: "../app/fonts/AlmostTextual.ttf",
  variable: "--font-almost",
});

const mark = localFont({
  src: "../app/fonts/Afterclap-PK7ng.otf",
  variable: "--font-mark",
});

export const metadata: Metadata = {
  title: "Alwin Mathew | Software Developer",
  description:
    "A Minimalistic Portfolio showcasing my work as a Software Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClassNames = `${playfair.variable} ${raleway.variable} ${syne.variable} ${xtradex.variable} ${almost.variable} ${tanKulture.variable} ${mark.variable} antialiased`;

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={fontClassNames}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
