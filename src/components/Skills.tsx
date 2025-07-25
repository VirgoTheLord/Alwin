"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";

// Register the necessary GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const skillItems = [
    { name: "React", image: "/13.png" },
    { name: "TypeScript", image: "/3.png" },
    { name: "Next.js", image: "/13.png" },
    { name: "GSAP", image: "/3.png" },
    { name: "Three.js", image: "/13.png" },
    { name: "Framer Motion", image: "/3.png" },
    { name: "JavaScript", image: "/13.png" },
    { name: "Tailwind CSS", image: "/3.png" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. "My Skills" heading animation
      if (nameRef.current) {
        const split = new SplitText(nameRef.current, { type: "lines,chars" });
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: nameRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          yPercent: 100,
          opacity: 0,
          ease: "power4.out",
          duration: 1,
          stagger: 0.05,
        });
      }

      // 2. Animate each skill row into view on scroll
      const skillRows = gsap.utils.toArray(".skill-item");
      if (skillRows.length > 0) {
        gsap.from(skillRows, {
          scrollTrigger: {
            trigger: listContainerRef.current,
            start: "top 80%",
            // UPDATED: Removed reversible scroll logic
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-start py-40 bg-black"
    >
      <div className="px-4 md:px-20 text-center">
        <h1 ref={nameRef} className="text-7xl text-white font-almost mb-24">
          My Skills
        </h1>
      </div>

      {/* Main layout container for the list, now full-width */}
      <div ref={listContainerRef} className="w-full">
        <div className="flex flex-col border-t border-zinc-800 bg-white">
          {skillItems.map((skill, index) => (
            <div
              key={index}
              className="skill-item group relative w-full flex justify-between items-center py-8 border-b border-zinc-800 px-4 md:px-20 overflow-hidden"
            >
              {/* Vertical split fill layers for hover effect */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-black transform scale-y-0 origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black transform scale-y-0 origin-top transition-transform duration-500 ease-in-out group-hover:scale-y-100"></div>

              {/* Content layer */}
              <div className="relative z-10 flex justify-between items-center w-full">
                <span className="text-5xl text-neutral-500 font-raleway font-bold transition-colors duration-300 ease-in-out group-hover:text-white">
                  {skill.name}
                </span>
                <span className="text-xl text-neutral-600 font-syne transition-colors duration-300 ease-in-out group-hover:text-neutral-400">
                  Expert
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
