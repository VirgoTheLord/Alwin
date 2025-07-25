"use client";

import React, { useState } from "react";
import { ReactLenis } from "lenis/react";
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
      <ReactLenis root>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main
          className={`bg-black transition-transform duration-800 ease-in-out ${
            isOpen ? "-translate-x-[40vw]" : "translate-x-0"
          }`}
        >
          {children}
          <Footer />
        </main>
      </ReactLenis>
    </body>
  );
}
