"use client";

import { useEffect } from "react";
//@ts-ignore
import barba from "@barba/core";
import gsap from "gsap";

const PageTransition = () => {
  useEffect(() => {
    const panels = gsap.utils.toArray(".transition-panel");

    barba.init({
      sync: true,
      transitions: [
        {
          name: "default-transition",
          // This is the EXIT animation (covering the old page)
          leave(data: { current: { container: HTMLElement } }) {
            const tl = gsap.timeline();
            tl.set(panels, { transformOrigin: "bottom" });
            tl.to(panels, {
              scaleY: 1,
              stagger: 0.1,
              duration: 0.5,
              ease: "power2.inOut",
            });
            return tl;
          },
          // This hook runs BEFORE the new page is added to the DOM
          beforeEnter(data: { next: { container: HTMLElement } }) {
            // THE FIX: Set the initial state of the new page to be invisible
            gsap.set(data.next.container, { opacity: 0 });
          },
          // This is the ENTRY animation (revealing the new page)
          enter(data: { next: { container: HTMLElement } }) {
            const tl = gsap.timeline();
            tl.set(panels, { transformOrigin: "top" });
            // Animate the panels away to reveal the new page
            tl.to(panels, {
              scaleY: 0,
              stagger: -0.1,
              duration: 0.5,
              ease: "power2.inOut",
            });
            // Animate the new page content to be visible
            tl.to(
              data.next.container,
              {
                opacity: 1,
                duration: 0.5,
              },
              "-=0.3" // Overlap the animations for a smoother effect
            );
            return tl;
          },
        },
      ],
    });

    return () => {
      barba.destroy();
    };
  }, []);

  return (
    <div className="transition-overlay fixed top-0 left-0 w-full h-screen pointer-events-none z-[100] flex">
      <div
        className="transition-panel flex-1 bg-neutral-900"
        style={{ transform: "scaleY(0)" }}
      />
      <div
        className="transition-panel flex-1 bg-neutral-900"
        style={{ transform: "scaleY(0)" }}
      />
      <div
        className="transition-panel flex-1 bg-neutral-900"
        style={{ transform: "scaleY(0)" }}
      />
      <div
        className="transition-panel flex-1 bg-neutral-900"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
};

export default PageTransition;
