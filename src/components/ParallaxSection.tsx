import React, { ReactNode } from "react";
import ParallaxImage from "./ParallaxImage";

interface ParallaxSectionProps {
  children: ReactNode;
  imgSrc: string;
  imgAlt: string;
  imgSpeed?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  imgSrc,
  imgAlt,
  imgSpeed,
  className = "",
}) => {
  return (
    <section
      className={`relative w-full min-h-screen overflow-hidden flex items-center justify-center ${className}`}
    >
      <ParallaxImage src={imgSrc} alt={imgAlt} speed={imgSpeed} />
      <div className="relative z-10 text-white text-center p-8">{children}</div>
    </section>
  );
};

export default ParallaxSection;
