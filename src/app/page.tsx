"use client";

import React, { useEffect, useRef, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLenis } from "lenis/react";

const About = React.lazy(() => import("@/components/About"));
const Skills = React.lazy(() => import("@/components/Skills"));
const Contact = React.lazy(() => import("@/components/Contact"));
const Projects = React.lazy(() => import("@/components/Projects"));
const ParallaxSection = React.lazy(
  () => import("../components/ParallaxSection")
);

const SectionLoader = () => (
  <div className="h-screen w-full flex justify-center items-center bg-zinc-900">
    <p className="text-white">Loading...</p>
  </div>
);

gsap.registerPlugin(ScrollTrigger, SplitText);

const Home = () => {
  const mainContainerRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);
    const unsubscribe = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      unsubscribe();
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      const split = new SplitText(".hero-title", {
        type: "chars",
        charsClass: "char",
      });

      // FIX: Animate the container from invisible to visible first.
      // Then animate the characters inside it.
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
          "<" // Start at the same time as the parent animation
        )
        .from(
          ".hero-subtitle, .hero-description",
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
  }, []);

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
        <p className="hero-description text-xs sm:text-lg text-neutral-400 mt-3 max-w-2xl text-center font-syne invisible">
          Crafting immersive digital experiences with a blend of creativity and
          technology.
        </p>
      </section>

      <Suspense fallback={<SectionLoader />}>
        <ParallaxSection
          id="about"
          imgSrc="/cloud.jpg"
          imgAlt="Mountain landscape"
          imgSpeed={0.15}
        >
          <About />
        </ParallaxSection>
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <section id="skills">
          <Skills />
        </section>
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ParallaxSection
          id="projects"
          imgSrc="/cloud.jpg"
          imgAlt="River through a valley"
          imgSpeed={0.1}
        >
          <Projects />
        </ParallaxSection>
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <section id="contact">
          <Contact />
        </section>
      </Suspense>
    </main>
  );
};

export default Home;
