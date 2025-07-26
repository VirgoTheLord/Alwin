"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useLenis } from "lenis/react";
import ParallaxSection from "../components/ParallaxSection"; // Adjust path as needed
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, SplitText);

const Home = () => {
  const mainContainerRef = useRef(null);
  const lenis = useLenis();

  // Sync Lenis and GSAP
  useEffect(() => {
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      const unsubscribe = gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
      return () => {
        unsubscribe();
        lenis.off("scroll", ScrollTrigger.update);
      };
    }
  }, [lenis]);

  // GSAP Animations for Hero Section
  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(".hero-title", {
        type: "chars",
        charsClass: "char",
      });

      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.05,
      }).from(
        ".hero-subtitle, .hero-button",
        {
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=1.2"
      );
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainContainerRef} className="bg-black">
      <section className="flex flex-col justify-center items-center h-screen px-5 text-white bg-black">
        <h1 className="hero-title pl-5 text-[10vh] font-tankulture sm:text-[25vh]">
          Alwin.
        </h1>
        <h2 className="hero-subtitle text-2xl sm:text-4xl font-almost text-neutral-300">
          Creative Developer.
        </h2>
        <p className="hero-button text-xs sm:text-lg text-neutral-400 mt-3 max-w-2xl text-center font-syne">
          I craft seamless digital journeys. By integrating polished front-end
          design with powerful back-end functionality, I build beautiful web
          experiences that convert users and elevate brands.
        </p>
      </section>

      <ParallaxSection
        id="about"
        imgSrc="cloud.jpg"
        imgAlt="Mountain landscape"
        imgSpeed={0.15}
      >
        <About />
      </ParallaxSection>

      <ParallaxSection
        id="skills"
        imgSrc="3.png"
        imgAlt="Abstract architecture"
        imgSpeed={0.25}
      >
        <Skills />
      </ParallaxSection>
      <ParallaxSection
        id="projects"
        imgSrc="cloud.jpg"
        imgAlt="River through a valley"
        imgSpeed={0.1}
      >
        <Projects />
      </ParallaxSection>

      <ParallaxSection
        id="contact"
        imgSrc="3.png"
        imgAlt="River through a valley"
        imgSpeed={0.1}
      >
        <Contact />
      </ParallaxSection>
    </main>
  );
};

export default Home;
