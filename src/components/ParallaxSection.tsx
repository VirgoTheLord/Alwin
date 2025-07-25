import React, { ReactNode } from "react";
import ParallaxImage from "./ParallaxImage"; // Assuming it's in the same folder

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
    // The section now acts as a simple container with a parallax background
    <section
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
    >
      <ParallaxImage src={imgSrc} alt={imgAlt} speed={imgSpeed} />
      {/* The content inside is no longer forced to be centered */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </section>
  );
};

export default ParallaxSection;
