"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ReactLenis, useLenis } from "lenis/react";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const Home = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    let split: SplitText | undefined;

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
            href="#projects"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-syne"
          >
            View Projects
          </a>
        </div>
      </section>

      <section
        id="about"
        className="min-h-screen w-full flex items-center justify-center bg-amber-200"
      >
        <About />
      </section>

      <section
        id="skills"
        className="min-h-screen w-full flex items-center justify-center bg-green-200"
      >
        <Skills />
      </section>

      <section
        id="projects"
        className="min-h-screen w-full flex items-center justify-center bg-blue-200"
      >
        <Projects />
      </section>

      <section
        id="contact"
        className="min-h-screen w-full flex items-center justify-center bg-red-200"
      >
        <Contact />
      </section>
    </>
  );
};

export default Home;
