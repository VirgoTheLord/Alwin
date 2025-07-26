"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { FaChevronLeft, FaChevronRight, FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const projectItems = [
    {
      name: "Project One",
      description:
        "A creative web experience with a focus on user interaction.",
      image: "https://placehold.co/600x800/1a1a1a/ffffff?text=Project+One",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      name: "Project Two",
      description: "An e-commerce platform with a minimalist design system.",
      image: "https://placehold.co/600x800/999999/000000?text=Project+Two",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      name: "Project Three",
      description: "A portfolio for a photographer using parallax effects.",
      image: "https://placehold.co/600x800/1a1a1a/ffffff?text=Project+Three",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      name: "Project Four",
      description: "An interactive 3D product visualizer using Three.js.",
      image: "https://placehold.co/600x800/999999/000000?text=Project+Four",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (nameRef.current) {
        const split = new SplitText(nameRef.current, { type: "lines,chars" });
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: nameRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          yPercent: 100,
          opacity: 0,
          ease: "power4.out",
          duration: 1,
          stagger: 0.05,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const slider = scrollContainerRef.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("active-drag");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove("active-drag");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.querySelector(".project-card");
      if (card) {
        const cardWidth = card.clientWidth;
        const gap = parseInt(window.getComputedStyle(card).marginRight);
        scrollContainerRef.current.scrollBy({
          left: -(cardWidth + gap),
          behavior: "smooth",
        });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.querySelector(".project-card");
      if (card) {
        const cardWidth = card.clientWidth;
        const gap = parseInt(window.getComputedStyle(card).marginRight);
        scrollContainerRef.current.scrollBy({
          left: cardWidth + gap,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .draggable-scroll {
          cursor: grab;
          cursor: -webkit-grab;
        }
        .draggable-scroll.active-drag {
          cursor: grabbing;
          cursor: -webkit-grabbing;
          user-select: none;
        }
      `}</style>
      <div
        ref={containerRef}
        className="w-full min-h-screen flex flex-col items-start justify-center py-20 md:py-24 overflow-hidden"
      >
        <div className="px-6 md:px-20 text-left w-full flex flex-col md:flex-row md:justify-between md:items-center mb-10 md:mb-16">
          <h1
            ref={nameRef}
            className="text-5xl md:text-7xl text-white font-almost"
          >
            Projects
          </h1>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button
              onClick={scrollLeft}
              aria-label="Scroll Left"
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-center"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll Right"
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-center"
            >
              <FaChevronRight size={24} />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-10 scroll-snap-x-mandatory hide-scrollbar draggable-scroll"
        >
          <div className="flex w-max px-6 md:px-20">
            {projectItems.map((project, index) => (
              <div
                key={index}
                className="project-card w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] mr-6 md:mr-8 flex-shrink-0 scroll-snap-center"
              >
                <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden mb-6 bg-zinc-900 group">
                  <img
                    src={project.image}
                    alt={project.name}
                    draggable="false"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x800/ff0000/ffffff?text=Error";
                    }}
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl md:text-3xl text-neutral-200 font-raleway font-bold mb-2">
                      {project.name}
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 font-syne">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-1 flex-shrink-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub repository for ${project.name}`}
                      className="text-neutral-500 hover:text-white transition-colors"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live site for ${project.name}`}
                      className="text-neutral-500 hover:text-white transition-colors"
                    >
                      <FiExternalLink size={24} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
