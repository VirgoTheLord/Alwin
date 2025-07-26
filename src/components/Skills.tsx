"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const skillItems = [
    { name: "React" },
    { name: "TypeScript" },
    { name: "Next.js" },
    { name: "GSAP" },
    { name: "MERN" },
    { name: "WebSockets" },
    { name: "JavaScript" },
    { name: "Tailwind CSS" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const skillRows = gsap.utils.toArray(".skill-item");
      if (skillRows.length > 0) {
        gsap.from(skillRows, {
          scrollTrigger: {
            trigger: listContainerRef.current,
            start: "top 80%",
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
      className="w-full flex flex-col items-center justify-start pt-16 md:pt-20 bg-black"
    >
      <div className="px-4 md:px-20 text-center">
        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl text-white font-almost mb-16 md:mb-24"
        >
          My Skills
        </h1>
      </div>

      <div ref={listContainerRef} className="w-full">
        <div className="flex flex-col border-t border-zinc-800 bg-neutral-100">
          {skillItems.map((skill, index) => (
            <div
              key={index}
              className="skill-item group relative w-full flex justify-between items-center py-6 md:py-8 border-b border-zinc-800 px-4 md:px-20 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1/2 bg-black transform scale-y-0 origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black transform scale-y-0 origin-top transition-transform duration-500 ease-in-out group-hover:scale-y-100"></div>

              <div className="relative z-10 flex justify-between items-center w-full">
                <span className="text-4xl sm:text-5xl text-neutral-500 font-raleway font-bold transition-colors duration-300 ease-in-out group-hover:text-white">
                  {skill.name}
                </span>
                <span className="text-lg md:text-xl text-neutral-600 font-syne transition-colors duration-300 ease-in-out group-hover:text-neutral-400">
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
