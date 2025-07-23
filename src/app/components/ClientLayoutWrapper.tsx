"use client";

import { useState } from "react";
import Header from "./Header";

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
      <main
        className={`min-h-screen transition-transform duration-800 ease-in-out ${
          isOpen ? "-translate-x-[40vw]" : "translate-x-0"
        }`}
      >
        {children}
      </main>
    </body>
  );
}
