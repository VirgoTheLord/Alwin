"use client";

import React from "react";
import NavLink from "./NavLink";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div
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
