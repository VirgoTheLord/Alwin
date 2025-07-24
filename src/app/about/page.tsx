"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Page = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    if (titleRef.current) {
      const ctx = gsap.context(() => {
        const split = new SplitText(titleRef.current, { type: "lines, chars" });
        gsap.set(split.lines, { overflow: "hidden" });

        gsap.from(split.chars, {
          yPercent: 110,
          ease: "power4.out",
          duration: 1,
          stagger: 0.05,
          delay: 0.4,
        });
      }, titleRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="flex items-start min-h-screen w-full flex-col">
      <div className="flex gap-5 items-end">
        <h1 ref={titleRef} className="text-8xl font-tankulture pl-10 pt-10">
          What Drives Me
        </h1>
        <h2 className=" uppercase text-xl font-tankulture text-gray-500">
          Well not Crazy, but for work ey.
        </h2>
      </div>
      <p className="text-2xl font-syne p-10">
        I am a software engineer with a passion for creating innovative
        solutions that make a difference. My journey in tech has been driven by
        curiosity, creativity, and a desire to solve real-world problems.
      </p>
      <p className="text-2xl font-syne p-10">
        I love exploring new technologies and pushing the boundaries of what is
        possible. Whether it's building web applications, diving into machine
        learning, or experimenting with new programming languages, I am always
        eager to learn and grow.
      </p>
      <p className="text-2xl font-syne p-10">
        My goal is to create software that not only meets the needs of users but
        also inspires and empowers them. I believe in the power of technology to
        transform lives and am committed to making a positive impact through my
        work.
      </p>
      <p className="text-2xl font-syne p-10">
        In my free time, I enjoy contributing to open-source projects,
        participating in hackathons, and sharing my knowledge with the
        community. I am excited about the future of technology and look forward
        to being a part of it.
      </p>
      <div className="flex-1"></div>
    </div>
  );
};

export default Page;
