"use client";

import React from "react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

const Footer = () => {
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
          /* The animation is applied to a container that holds two sets of the content */
          animation: scroll 150s linear infinite;
          display: flex;
          width: fit-content;
        }
      `}</style>

      <div className="w-full border-t border-b border-neutral-800 py-6 whitespace-nowrap">
        <div className="animate-scroll flex">
          {[...Array(20)].map((_, i) => (
            <div
              key={`item-${i}`}
              className="flex-shrink-0 flex items-center mx-8"
            >
              <span className="text-2xl font-tankulture text-neutral-600">
                ALWIN MATHEW
              </span>
              <span className="mx-4 text-2xl text-neutral-700">&bull;</span>
              <span className="text-2xl font-almost text-neutral-600">
                Software Developer
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-sm text-neutral-600">
          &copy; {new Date().getFullYear()} Alwin Mathew. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <SiGithub size={20} />
          </a>
          <a
            href="https://linkedin.com"
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
