"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MagneticIcon = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const magneticRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      gsap.to(el, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={magneticRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-full text-neutral-400 hover:text-white transition-colors duration-300"
    >
      {children}
    </a>
  );
};

export default MagneticIcon;
