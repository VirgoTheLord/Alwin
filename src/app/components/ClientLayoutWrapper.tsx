"use client";

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayoutWrapper({
  children,
  fontClassNames,
}: {
  children: React.ReactNode;
  fontClassNames: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <body className={`${fontClassNames} ${isOpen ? "menu-open" : ""}`}>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* The main content area is now simpler and will contain all sections */}
      <main
        className={` transition-transform duration-800 ease-in-out ${
          isOpen ? "-translate-x-[40vw]" : "translate-x-0"
        }`}
      >
        {children}
        <Footer />
      </main>
    </body>
  );
}
