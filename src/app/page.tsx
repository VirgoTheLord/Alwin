"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Home = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    let split: SplitText | undefined; // Define split in the outer scope

    if (nameRef.current) {
      const ctx = gsap.context(() => {
        split = new SplitText(nameRef.current, { type: "lines,chars" });

        gsap.set(split.lines, { overflow: "hidden" });
        gsap.from(split.chars, {
          yPercent: 100,
          ease: "power4.out",
          duration: 1.5,
          stagger: 0.05,
        });
      }, nameRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      {/* Hero Section (Your new, updated version) */}
      <section className="flex flex-col justify-center items-center h-screen px-5">
        <h1
          ref={nameRef}
          className="pl-5 text-[10vh] font-tankulture sm:text-[25vh] "
        >
          Alwin.
        </h1>
        <h2 className="text-2xl sm:text-4xl font-almost text-neutral-400">
          Creative Developer.
        </h2>
        <p className="text-lg sm:text-xl text-neutral-500 mt-3 max-w-2xl text-center font-syne">
          I build beautiful and functional web experiences that engage users and
          elevate brands.
        </p>
        <div className="mt-8">
          <a
            href="#projects" // Changed to scroll to the projects section
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-syne"
          >
            View Projects
          </a>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen w-full flex items-center justify-center"
      >
        <h2 className="text-6xl font-tankulture">About Me</h2>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen w-full flex items-center justify-center"
      >
        <h2 className="text-6xl font-tankulture">My Skills</h2>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen w-full flex items-center justify-center"
      >
        <h2 className="text-6xl font-tankulture">Projects</h2>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen w-full flex items-center justify-center"
      >
        <h2 className="text-6xl font-tankulture">Contact</h2>
      </section>
    </>
  );
};

export default Home;
