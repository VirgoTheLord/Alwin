"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
      // Animate the title parts
      gsap.from(".skill-title-part", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        yPercent: 100,
        opacity: 0,
        ease: "power4.out",
        duration: 1,
        stagger: 0.1,
      });

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
      className="w-full flex flex-col items-start justify-end pt-20 md:pt-20 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black -z-10"></div>
      <div className="px-6 sm:px-10 md:px-20 w-full">
        <div className="flex items-baseline md:justify-end gap-3 md:gap-4 mb-16 md:mb-15">
          <h1 className="skill-title-part text-4xl md:text-4xl text-white font-almost">
            MY
          </h1>
          <h2 className="skill-title-part font-raleway text-sm md:text-base font-bold uppercase text-neutral-500">
            not so perfect
          </h2>
          <h1 className="skill-title-part text-4xl md:text-4xl text-white font-almost">
            SKILLS
          </h1>
        </div>
      </div>

      <div ref={listContainerRef} className="w-full">
        <div className="flex flex-col border-t border-zinc-800 bg-black">
          {skillItems.map((skill, index) => (
            <div
              key={index}
              className="skill-item group relative w-full flex justify-between items-center py-6 md:py-8 border-b border-zinc-800 px-6 sm:px-10 md:px-20 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white transform scale-y-0 origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white transform scale-y-0 origin-top transition-transform duration-500 ease-in-out group-hover:scale-y-100"></div>

              <div className="relative z-10 flex justify-between items-center w-full">
                <span className="text-4xl sm:text-5xl text-neutral-400 font-raleway font-bold transition-colors duration-300 ease-in-out group-hover:text-black">
                  {skill.name}
                </span>
                <span className="text-lg md:text-xl text-neutral-500 font-syne transition-colors duration-300 ease-in-out group-hover:text-neutral-700">
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
