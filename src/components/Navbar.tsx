"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import NavLink from "./NavLink";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, setIsOpen }) => {
  const menuRef = useRef(null);
  const openTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    const ctx = gsap.context(() => {
      const links = gsap.utils.toArray(".nav-link");
      openTimeline.current = gsap.timeline({ paused: true });

      links.forEach((link) => {
        const split = new SplitText(link as HTMLElement, {
          type: "lines, chars",
        });
        gsap.set(split.lines, { overflow: "hidden" });

        openTimeline.current!.from(
          split.chars,
          {
            yPercent: 100,
            ease: "power4.out",
            duration: 1,
            stagger: 0.05,
            delay: 0.4,
          },
          0
        );
      });
    }, menuRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      openTimeline.current?.restart();
    } else {
      openTimeline.current?.reverse();
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`z-10 w-[40vw] h-[100vh] fixed top-0 right-0 bg-white flex flex-col items-center justify-around transition-transform duration-800 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <NavLink href="#about" label="About" setIsOpen={setIsOpen} />
      <NavLink href="#skills" label="Skills" setIsOpen={setIsOpen} />
      <NavLink href="#projects" label="Projects" setIsOpen={setIsOpen} />
      <NavLink href="#contact" label="Contact" setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;
