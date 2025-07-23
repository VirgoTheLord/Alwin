"use client";

import React from "react";
import Navbar from "./Navbar";
import { Twirl as Hamburger } from "hamburger-react";

import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
  const color = isOpen ? "#000000" : "#ffffff";

  return (
    <div>
      <div className="fixed top-0 right-0 z-50 p-2">
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          size={24}
          color={color}
        />
      </div>
      <Navbar isOpen={isOpen} />
    </div>
  );
};

export default Header;
