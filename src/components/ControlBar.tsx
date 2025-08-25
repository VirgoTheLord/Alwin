import React, { useState, useRef, useEffect } from "react";
import { BiMinus } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight, FaBars } from "react-icons/fa";
import gsap from "gsap";

const ControlBar = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const morphingContainerRef = useRef(null);
  const controlBarContentRef = useRef(null);
  const detailsPanelContentRef = useRef(null);

  const skills = [
    "PROTOTYPING",
    "MOTION DESIGN",
    "UI/UX",
    "STRATEGY",
    "APP DEVELOPMENT",
    "WEB DEVELOPMENT",
    "DESIGN SYSTEM",
    "BACKEND",
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.7, ease: "power3.inOut" },
    });

    const container = morphingContainerRef.current;
    const controlContent = controlBarContentRef.current;
    const detailsContent = detailsPanelContentRef.current;

    gsap.set(container, { transformOrigin: "center center" });

    if (isDetailsOpen) {
      tl.to(container, {
        width: "50vw",
        height: "50vh",
        y: "0vh",
        borderRadius: "1.5rem",
        backgroundColor: "#171717",
      })
        .to(controlContent, { opacity: 0, duration: 0.2 }, "<")
        .to(
          detailsContent,
          {
            opacity: 1,
            duration: 0.2,
            delay: 0.45,
            onStart: () => {
              gsap.set(detailsContent, { pointerEvents: "auto" });
            },
          },
          "<"
        );
    } else {
      tl.to(detailsContent, {
        opacity: 0,
        duration: 0.2,
        onStart: () => {
          gsap.set(detailsContent, { pointerEvents: "none" });
        },
      })
        .to(controlContent, { opacity: 1, duration: 0.4, delay: 0.2 }, "<")
        .to(
          container,
          {
            width: "auto",
            height: "auto",
            y: 0,
            borderRadius: "1rem",
            backgroundColor: "#000000",
          },
          "<"
        );
    }
  }, [isDetailsOpen]);

  return (
    <div
      ref={morphingContainerRef}
      className="p-1 bg-black rounded-2xl"
      style={{ width: "auto", height: "auto" }}
    >
      <div className="relative">
        <div
          ref={controlBarContentRef}
          className="flex items-center justify-center space-x-2"
        >
          <div className="flex space-x-1">
            <div className="p-3 bg-neutral-900 rounded-xl">
              <button className="text-neutral-600 hover:text-white transition-colors">
                <FaArrowLeft />
              </button>
            </div>
            <div className="p-3 bg-neutral-900 rounded-xl">
              <button className="text-neutral-600 hover:text-white transition-colors">
                <FaArrowRight />
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="flex space-x-3 bg-neutral-900 p-3 items-center rounded-xl cursor-pointer text-neutral-600 hover:text-white transition-colors"
          >
            <FaBars />
            <h3 className="font-raleway">Details</h3>
          </button>
        </div>

        <div
          ref={detailsPanelContentRef}
          className="absolute inset-0 flex flex-col justify-between opacity-0 pointer-events-none"
        >
          <div className="flex flex-col md:flex-row gap-10 p-8">
            <h1 className="font-mark text-5xl">RogueShore</h1>
            <div className="flex flex-col space-y-5">
              <p className="font-raleway text-md text-neutral-400">
                Unreal Estate is reshaping how people buy and sell homes—faster,
                easier, and more affordable. We helped redesign their entire
                digital experience, giving their team the tools to scale and
                their users a smoother journey. A lean team. A bold idea. A
                transformation done right.
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 uppercase bg-neutral-800 rounded-full text-neutral-500 text-xs font-raleway"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-8 pt-0">
            <div className="mx-auto w-full h-[1px] bg-neutral-800"></div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-5">
                <button className="text-neutral-600 hover:text-white transition-colors">
                  <FaArrowLeft />
                </button>
                <button className="text-neutral-600 hover:text-white transition-colors">
                  <FaArrowRight />
                </button>
              </div>
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="text-neutral-600 hover-text-white transition-colors"
              >
                <BiMinus size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
