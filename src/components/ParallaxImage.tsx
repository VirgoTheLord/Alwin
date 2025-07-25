"use client";

import React, { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  speed = 0.2,
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const bounds = useRef<{ top: number; bottom: number } | null>(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const refId = useRef<number | null>(null);

  useEffect(() => {
    const updateBounds = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        };
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    const animate = () => {
      if (imageRef.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        );
        if (
          Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01
        ) {
          imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.2)`;
        }
      }
      refId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateBounds);
      if (refId.current) cancelAnimationFrame(refId.current);
    };
  }, []);

  useLenis(({ scroll }) => {
    if (!bounds.current) return;
    const relativeScroll = scroll - bounds.current.top;
    targetTranslateY.current = relativeScroll * speed;
  });

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="absolute top-0 left-0 w-full h-full object-fill will-change-transform"
        style={{ transform: "translateY(0) scale(1.2)" }}
      />
    </div>
  );
};

export default ParallaxImage;
