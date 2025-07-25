"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
// Import the ParallaxImage component
import ParallaxImage from "@/components/ParallaxImage"; // Assuming path from your project structure

// Register the necessary GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null); // Ref for the "About Me" heading

  useEffect(() => {
    // We use a GSAP context for proper cleanup.
    const ctx = gsap.context(() => {
      // 1. "About Me" heading animation
      if (nameRef.current) {
        const split = new SplitText(nameRef.current, {
          type: "lines,chars",
        });
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          yPercent: 100,
          opacity: 0,
          ease: "power4.out",
          duration: 1,
          stagger: 0.05,
        });
      }

      // 2. Line-by-line paragraph fill animation
      const lines = gsap.utils.toArray(".fill-line-container");
      gsap.to(lines, {
        clipPath: "inset(0% 0% 0% 0%)", // Reveal from left to right
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom 60%",
          scrub: true,
        },
        stagger: 0.2, // Stagger the animation for each line
      });
    }, containerRef); // Scope the context to our component's container

    // Cleanup function to revert all animations and ScrollTriggers
    return () => ctx.revert();
  }, []);

  // Break the text into an array of strings, one for each line
  const aboutTextLines = [
    "I'm a selectively skilled product",
    "designer with a strong focus on",
    "producing high quality & impactful",
    "digital experiences.",
  ];

  return (
    // Main container is now a flex row that takes up the full screen height
    <div ref={containerRef} className="flex w-full min-h-screen">
      {/* Left Column for Text */}
      <div className="w-1/2 flex flex-col justify-center items-start text-left px-4 md:px-20 py-40">
        <h1 ref={nameRef} className="text-7xl text-white font-almost mb-16">
          About Me
        </h1>

        {/* Map over the lines to create the layered effect for each */}
        <div className="flex flex-col">
          {aboutTextLines.map((line, index) => (
            <div key={index} className="relative">
              {/* Bottom Layer: Default color text */}
              <p className="text-5xl md:text-4xl text-gray-600 leading-tight font-raleway font-bold">
                {line}
              </p>

              {/* Top Layer: Fill color text that gets revealed */}
              <div
                className="fill-line-container absolute top-0 left-0 w-full h-full"
                style={{ clipPath: "inset(0% 100% 0% 0%)" }} // Initially hidden from the left
              >
                <p className="text-5xl md:text-4xl text-white leading-tight font-raleway font-bold">
                  {line}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column for the Parallax Image */}
      <div className="w-1/2 relative overflow-hidden">
        <ParallaxImage
          src="/13.png"
          alt="Abstract decorative image"
          speed={-0.1} // A subtle negative speed creates a nice counter-scroll effect
        />
      </div>
    </div>
  );
};

export default About;
