"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useLenis } from "lenis/react";
import ParallaxSection from "../components/ParallaxSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Home = () => {
  const mainContainerRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const lenis = useLenis();

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

  useEffect(() => {
    const loadFonts = async () => {
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }

        await new Promise((resolve) => requestAnimationFrame(resolve));

        await new Promise((resolve) => setTimeout(resolve, 50));

        setFontsLoaded(true);
      } catch (error) {
        setTimeout(() => setFontsLoaded(true), 200);
      }
    };

    loadFonts();
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(".hero-title", {
        type: "chars",
        charsClass: "char",
      });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".hero-title", { autoAlpha: 0, duration: 0.01 })
        .from(
          split.chars,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.05,
          },
          "<"
        )
        .from(
          ".hero-subtitle, .hero-button",
          {
            y: 30,
            autoAlpha: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
          },
          "-=1.2"
        );
    }, mainContainerRef);

    return () => ctx.revert();
  }, [fontsLoaded]);

  return (
    <main ref={mainContainerRef}>
      <section className="relative flex flex-col justify-center items-center h-screen px-5 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black -z-1"></div>
        <h1 className="hero-title pl-5 text-[10vh] font-tankulture sm:text-[25vh] invisible">
          Alwin.
        </h1>
        <h2 className="hero-subtitle text-2xl sm:text-4xl font-almost text-neutral-300 invisible">
          Software Developer.
        </h2>
        <p className="hero-button text-xs sm:text-lg text-neutral-400 mt-3 max-w-2xl text-center font-syne invisible">
          Crafting immersive digital experiences with a blend of creativity and
          technology.
        </p>
      </section>

      <ParallaxSection
        id="about"
        imgSrc="/cloud.jpg"
        imgAlt="Mountain landscape"
        imgSpeed={0.15}
      >
        <About />
      </ParallaxSection>

      <ParallaxSection
        id="skills"
        imgSrc="/3.png"
        imgAlt="Abstract architecture"
        imgSpeed={0.25}
      >
        <Skills />
      </ParallaxSection>

      <ParallaxSection
        id="projects"
        imgSrc="/cloud.jpg"
        imgAlt="River through a valley"
        imgSpeed={0.1}
      >
        <Projects />
      </ParallaxSection>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
};

export default Home;
