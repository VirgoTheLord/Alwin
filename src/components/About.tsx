"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Animate the "Yup." text in after the title
      gsap.from(".about-aside", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: 20,
        opacity: 0,
        ease: "power4.out",
        duration: 1,
        delay: 0.8, // Delay to have it appear after the main title
      });

      const lines = gsap.utils.toArray(".fill-line-container");
      gsap.to(lines, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom 60%",
          scrub: true,
        },
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const aboutTextLines = [
    "I translate complex problems into elegant and pure",
    "digital solutions, with a strong focus on quality and ",
    "user experience. I believe in the power of simplicity",
    "and clarity, and I strive to create products that are not",
    "only functional but also beautiful and intuitive.",
  ];

  return (
    <div ref={containerRef} className="flex w-full min-h-screen">
      <div className="w-full flex flex-col justify-center items-start text-left px-6 sm:px-10 md:px-20 py-24 md:py-30">
        <div className="flex items-baseline gap-4 mb-12">
          <h1 ref={nameRef} className="text-4xl text-white font-almost">
            About Me
          </h1>
          <h2 className="about-aside font-raleway text-md font-bold uppercase text-neutral-500">
            Yup.
          </h2>
        </div>

        <div className="flex flex-col w-full">
          {aboutTextLines.map((line, index) => (
            <div key={index} className="relative mb-2 md:mb-4">
              <p className="text-5xl sm:text-6xl md:text-7xl text-neutral-500 leading-tight font-xtradex font-medium">
                {line}
              </p>

              <div
                className="fill-line-container absolute top-0 left-0 w-full h-full"
                style={{ clipPath: "inset(0% 100% 0% 0%)" }}
              >
                <p className="text-5xl sm:text-6xl md:text-7xl text-white leading-tight font-xtradex font-medium">
                  {line}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
