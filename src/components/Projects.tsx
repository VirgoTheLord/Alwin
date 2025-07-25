"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";

// Register the necessary GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const projectItems = [
    {
      name: "Project One",
      description:
        "A creative web experience with a focus on user interaction.",
      image: "/13.png",
    },
    {
      name: "Project Two",
      description: "An e-commerce platform with a minimalist design system.",
      image: "/3.png",
    },
    {
      name: "Project Three",
      description:
        "A portfolio website for a photographer using parallax effects.",
      image: "/13.png",
    },
    {
      name: "Project Four",
      description: "An interactive 3D product visualizer using Three.js.",
      image: "/3.png",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. "Projects" heading animation
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Functions to handle carousel navigation
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.querySelector(".project-card")
          ?.clientWidth || 0;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.querySelector(".project-card")
          ?.clientWidth || 0;
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
      <div
        ref={containerRef}
        className="w-full min-h-screen flex flex-col items-start justify-center py-40  overflow-hidden"
      >
        <div className="px-4 md:px-20 text-left w-full flex justify-between items-center">
          <h1 ref={nameRef} className="text-7xl text-white font-almost mb-24">
            Projects
          </h1>
          {/* Navigation Arrows */}
          <div className="flex gap-4 mb-24">
            <button
              onClick={scrollLeft}
              className="w-14 h-14 rounded-full border border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="w-14 h-14 rounded-full border border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Simple Horizontal Scrolling Carousel */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-10 scroll-snap-x-mandatory hide-scrollbar"
        >
          <div className="flex w-max px-4 md:px-20">
            {projectItems.map((project, index) => (
              <div
                key={index}
                className="project-card w-[70vw] md:w-[40vw] mr-8 flex-shrink-0 scroll-snap-center"
              >
                <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden mb-6 bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-3xl text-neutral-300 font-raleway font-bold mb-2">
                  {project.name}
                </h2>
                <p className="text-lg text-neutral-500 font-syne">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
