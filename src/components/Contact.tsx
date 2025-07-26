"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiX } from "react-icons/si";
import MagneticIcon from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const emailWrapperRef = useRef<HTMLDivElement>(null);
  const emailTextRef = useRef<HTMLDivElement>(null);
  const copiedTextRef = useRef<HTMLSpanElement>(null);
  const copyHintRef = useRef<HTMLSpanElement>(null);

  const [emailCopied, setEmailCopied] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const emailAddress = "alwinabyofficial@gmail.com";

  const handleEmailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (emailCopied) return;

    // Use the modern Clipboard API for better security and reliability
    navigator.clipboard.writeText(emailAddress).then(
      () => {
        if (emailTextRef.current) {
          const emailChars =
            emailTextRef.current.querySelectorAll(".email-char");
          gsap.to(emailChars, {
            y: 0,
            color: "#A3A3A3",
            duration: 0.3,
            ease: "power2.out",
          });
        }
        setEmailCopied(true);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate "Let's Connect" title
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

      // Animate the subtitle
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          yPercent: 100,
          opacity: 0,
          ease: "power4.out",
          duration: 1,
          delay: 0.4, // Delay to start after the main title
        });
      }

      // Stagger animation for other contact elements
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

  useEffect(() => {
    const tl = gsap.timeline();
    if (emailCopied) {
      setIsFirstLoad(false);
      tl.to(
        copyHintRef.current,
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        0
      )
        .to(
          emailTextRef.current,
          { y: -20, opacity: 0, duration: 0.5, ease: "power2.in" },
          0
        )
        .fromTo(
          copiedTextRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );

      const timer = setTimeout(() => {
        setEmailCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (!isFirstLoad) {
      tl.to(copiedTextRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      })
        .to(emailTextRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(copyHintRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
    }
  }, [emailCopied, isFirstLoad]);

  useEffect(() => {
    if (!emailCopied && emailTextRef.current) {
      const emailChars = Array.from(
        emailTextRef.current.querySelectorAll(".email-char")
      );

      const mouseEnterHandler = (e: MouseEvent) => {
        gsap.to(e.target as Element, {
          y: -5,
          color: "#FFFFFF",
          duration: 0.3,
          ease: "power2.out",
        });
      };
      const mouseLeaveHandler = (e: MouseEvent) => {
        gsap.to(e.target as Element, {
          y: 0,
          color: "#A3A3A3",
          duration: 0.3,
          ease: "power2.inOut",
        });
      };

      emailChars.forEach((char) => {
        char.addEventListener("mouseenter", mouseEnterHandler as EventListener);
        char.addEventListener("mouseleave", mouseLeaveHandler as EventListener);
      });

      return () => {
        emailChars.forEach((char) => {
          char.removeEventListener(
            "mouseenter",
            mouseEnterHandler as EventListener
          );
          char.removeEventListener(
            "mouseleave",
            mouseLeaveHandler as EventListener
          );
        });
      };
    }
  }, [emailCopied]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen flex flex-col items-center justify-center text-center py-20 md:py-40 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black -z-10"></div>

      <div className="relative z-10 px-4 md:px-20">
        <div className="md:flex items-baseline justify-center gap-3 overflow-hidden">
          <h1
            ref={nameRef}
            className="text-5xl sm:text-6xl md:text-7xl text-white font-almost mb-6"
          >
            Let&apos;s Connect
          </h1>
          <h2
            ref={subtitleRef} // Attach the ref here
            className="skill-title-part font-raleway text-sm md:text-base font-bold uppercase text-neutral-500 mb-10"
          >
            on a professional note, ahem.
          </h2>
        </div>

        <p className="contact-element text-lg md:text-xl text-neutral-400 font-syne max-w-2xl mx-auto mb-16">
          Have a project in mind or just want to say hello? Feel free to reach
          out. I&apos;m always open to discussing new ideas and opportunities.
        </p>
      </div>

      <div
        ref={emailWrapperRef}
        onClick={handleEmailClick}
        className="contact-element text-2xl sm:text-5xl md:text-7xl text-neutral-400 font-raleway font-bold cursor-pointer mb-16 relative z-10 h-24 flex items-center justify-center"
        aria-label="Copy email address to clipboard"
      >
        <span
          ref={copyHintRef}
          className="absolute -top-4 md:-top-2 text-xs text-neutral-500 font-sans pointer-events-none"
        >
          Click to copy
        </span>
        <div ref={emailTextRef}>
          {emailAddress.split("").map((char, index) => (
            <span
              key={index}
              className="email-char inline-block transition-colors duration-300"
            >
              {char}
            </span>
          ))}
        </div>
        <span
          ref={copiedTextRef}
          className="absolute text-white opacity-0 pointer-events-none"
        >
          Copied!
        </span>
      </div>

      <div className="contact-element flex gap-8 relative z-10">
        <MagneticIcon href="https://github.com/VirgoTheLord">
          <FaGithub size={28} />
        </MagneticIcon>
        <MagneticIcon href="https://www.linkedin.com/in/alwin-aby-mathew/">
          <FaLinkedin size={28} />
        </MagneticIcon>
        <MagneticIcon href="https://twitter.com">
          <SiX size={25} />
        </MagneticIcon>
      </div>
    </div>
  );
};

export default Contact;
