import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

interface NavbarProps {
  isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen }) => {
  const menuRef = useRef(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    let context = gsap.context(() => {
      const links = gsap.utils.toArray(".nav-link");

      timeline.current = gsap.timeline({ paused: true });

      links.forEach((link) => {
        let split: SplitText;

        split = new SplitText(link as HTMLElement, {
          type: "lines, chars",
        });
        gsap.set(split.lines, {
          overflow: "hidden",
        });

        timeline.current!.from(
          split.chars,
          {
            yPercent: 100,
            ease: "power4.out",
            duration: 1,
            stagger: 0.05,
            delay: 0.4,
          },
          0
        );
      });
    }, menuRef);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      timeline.current?.restart();
    } else {
      timeline.current?.reverse();
    }
  }, [isOpen]);
  return (
    <div
      ref={menuRef}
      className={`z-1 w-[40vw] h-[100vh] fixed top-0 right-0 bg-white flex flex-col items-center justify-around transition-transform duration-800 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } `}
    >
      <div className="border-b border-black w-full h-1/4 flex items-center justify-start font-almost text-6xl">
        <Link href="/about" className="nav-link text-center pl-10 text-black">
          About
        </Link>
      </div>
      <div className="border-b border-black w-full h-1/4 flex items-center justify-start font-almost text-6xl">
        <Link href="/skills" className=" nav-link text-center pl-10 text-black">
          Skills
        </Link>
      </div>
      <div className="border-b border-black w-full h-1/4 flex items-center justify-start font-almost text-6xl">
        <Link
          href="/projects"
          className=" nav-link text-center pl-10 text-black"
        >
          Projects
        </Link>
      </div>
      <div className="border-b border-black w-full h-1/4 flex items-center justify-start font-almost text-6xl">
        <Link
          href="/contact"
          className=" nav-link text-center pl-10 text-black"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
