"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

// Register the necessary GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = "hello@example.com";
    navigator.clipboard.writeText(email);
    setEmailCopied(true);

    setTimeout(() => {
      setEmailCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (nameRef.current) {
        const split = new SplitText(nameRef.current, { type: "lines,chars" });
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

      gsap.from(".contact-element", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen flex flex-col items-center justify-center text-center py-40 bg-black"
    >
      <div className="px-4 md:px-20">
        <h1 ref={nameRef} className="text-7xl text-white font-almost mb-8">
          Contact
        </h1>
        <p className="contact-element text-xl text-neutral-400 font-syne max-w-2xl mx-auto mb-16">
          Have a project in mind or just want to say hello? Feel free to reach
          out. I'm always open to discussing new ideas.
        </p>
      </div>

      <a
        ref={emailRef}
        href="mailto:hello@example.com"
        onClick={handleEmailClick}
        className="contact-element text-5xl md:text-8xl text-neutral-300 font-raleway font-bold transition-colors duration-300 hover:text-white cursor-pointer"
      >
        {emailCopied ? "Copied!" : "alwinabyofficial@gmail.com"}
      </a>
    </div>
  );
};

export default Contact;
