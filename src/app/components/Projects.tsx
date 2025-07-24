import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Projects = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    let split: SplitText | undefined;

    if (nameRef.current) {
      gsap.context(() => {
        split = new SplitText(nameRef.current, { type: "lines,chars" });

        gsap.set(split.lines, { overflow: "hidden" });
        gsap.from(split.chars, {
          yPercent: 100,
          ease: "power4.out",
          duration: 1,
          stagger: 0.05,
        });
      });
    }

    return () => {
      if (split) {
        split.revert();
      }
    };
  }, []);
  return (
    <div>
      <h1 ref={nameRef} className="text-7xl text-black font-almost">
        Projects
      </h1>
    </div>
  );
};

export default Projects;
