"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loading = ({ onComplete }: { onComplete: () => void }) => {
  const loadingScreenRef = useRef<HTMLDivElement>(null);
  const tensRef = useRef<HTMLDivElement>(null);
  const onesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadingScreen = loadingScreenRef.current;
    const tens = tensRef.current;
    const ones = onesRef.current;
    if (!loadingScreen || !tens || !ones) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      // 1. Reveal the main loader content container
      tl.from(".loader-content", {
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });

      // 2. Animate the lines with a "brush stroke" effect
      tl.from(
        ".loader-line-fill",
        {
          height: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        },
        "<"
      );

      // 3. Animate the numbers scrolling up to 99
      const duration = 4; // Increased duration
      tl.to(tens, {
        y: "-9em", // Scrolls through 0-9
        duration: duration,
        ease: "power2.inOut",
      });
      tl.to(
        ones,
        {
          y: "-99em", // Scrolls through 0-9 ten times, stopping at 99
          duration: duration,
          ease: "power2.inOut",
        },
        "<" // Start at the same time as the tens digit
      );

      // 4. Animate the loader elements out
      tl.to(
        ".loader-content",
        {
          y: -50,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power2.in",
        },
        "-=0.5"
      );

      // 5. Animate the entire screen away
      tl.to(loadingScreen, {
        yPercent: -100,
        duration: 1,
        ease: "power3.inOut",
      });
    }, loadingScreenRef);

    return () => ctx.revert();
  }, [onComplete]);

  const NumberColumn = ({
    digitRef,
    limit,
  }: {
    digitRef: React.RefObject<HTMLDivElement | null>;
    limit: number;
  }) => (
    <div className="number-container text-7xl sm:text-9xl font-almost h-[1em] overflow-hidden">
      <div ref={digitRef} className="flex flex-col">
        {[...Array(limit)].map((_, i) => (
          <span key={i} className="h-[1em] leading-[1em]">
            {i % 10}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div
      ref={loadingScreenRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="loader-content invisible flex flex-col items-center justify-center gap-6">
        <div className="loader-line h-20 w-1 bg-neutral-800 overflow-hidden">
          <div className="loader-line-fill w-full h-full bg-white" />
        </div>

        <div className="flex">
          <NumberColumn digitRef={tensRef} limit={10} />
          <NumberColumn digitRef={onesRef} limit={100} />
        </div>

        <div className="loader-line h-20 w-1 bg-neutral-800 overflow-hidden">
          <div className="loader-line-fill w-full h-full bg-white" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
