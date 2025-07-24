"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface NavLinkProps {
  href: string; // This will now be an ID like "#about"
  label: string;
  setIsOpen: (isOpen: boolean) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, setIsOpen }) => {
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const coloredBgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({ paused: true });
      timeline.current
        .to(coloredBgRef.current, {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.inOut",
        })
        .to(
          textRef.current,
          { color: "#ffffff", duration: 0.4, ease: "power2.inOut" },
          0
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => timeline.current?.play();
  const handleMouseLeave = () => timeline.current?.reverse();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent the default jump-to-anchor behavior
    setIsOpen(false); // Close the menu

    const targetElement = document.querySelector(href);
    if (targetElement) {
      // Wait for the menu to close before scrolling
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 800); // Match this to your menu's transition duration
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative border-b-2 border-black w-full h-1/4 flex items-center justify-center md:justify-start font-almost md:text-6xl text-2xl cursor-pointer"
    >
      <div
        ref={coloredBgRef}
        className="absolute top-0 left-0 w-full h-full bg-green-400 origin-left z-0"
        style={{ transform: "scaleX(0)" }}
      />
      <a
        href={href}
        ref={textRef}
        onClick={handleLinkClick}
        className="nav-link md:pl-10 text-black relative z-10 whitespace-nowrap"
      >
        {label}
      </a>
    </div>
  );
};

export default NavLink;
