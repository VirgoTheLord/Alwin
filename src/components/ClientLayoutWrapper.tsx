"use client";

import React, { useState, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isOpen]);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasLoaded", "true");
    setIsLoading(false);
  };

  return (
    <ReactLenis root>
      {isLoading ? (
        <Loading onComplete={handleLoadingComplete} />
      ) : (
        <>
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <main
            className={`bg-black transition-transform duration-800 ease-in-out ${
              isOpen ? "-translate-x-[40vw]" : "translate-x-0"
            }`}
          >
            {children}
            <Footer />
          </main>
        </>
      )}
    </ReactLenis>
  );
}
