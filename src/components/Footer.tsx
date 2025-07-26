"use client";

import React, { useEffect, useRef } from "react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

const Footer = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // This effect will pause the animation when the footer is not in view
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            marquee.style.animationPlayState = "running";
          } else {
            marquee.style.animationPlayState = "paused";
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    observer.observe(marquee);

    return () => {
      if (marquee) {
        observer.unobserve(marquee);
      }
    };
  }, []);

  const MarqueeContent = () => (
    <div className="flex-shrink-0 flex items-center mx-8">
      <span className="text-2xl font-tankulture text-neutral-600">
        ALWIN MATHEW
      </span>
      <span className="mx-4 text-2xl text-neutral-700">&bull;</span>
      <span className="text-2xl font-almost text-neutral-600">
        Software Developer
      </span>
    </div>
  );

  return (
    <footer className="bg-black text-neutral-400 pb-10 overflow-hidden">
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          display: flex;
          width: fit-content;
          will-change: transform; /* Hint for browser optimization */
        }
      `}</style>

      <div
        ref={marqueeRef}
        className="w-full border-t border-b border-neutral-800 py-6 whitespace-nowrap"
        aria-hidden="true"
      >
        <div className="animate-scroll flex">
          <MarqueeContent />
          <MarqueeContent />
          <MarqueeContent />
          <MarqueeContent />
          <MarqueeContent />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-sm text-neutral-600">
          &copy; {new Date().getFullYear()} Alwin Mathew. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/VirgoTheLord"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <SiGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/alwin-aby-mathew/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <SiLinkedin size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter Profile"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <SiX size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
