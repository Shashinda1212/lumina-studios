"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt?: string;
  id?: string;
}

export interface CylinderCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[];
  containerClassName?: string;
  cardClassName?: string;
  animationDuration?: number; // in seconds
  cardWidth?: number; // in pixels
}

export const CylinderCarousel = React.forwardRef<HTMLDivElement, CylinderCarouselProps>(
  (
    {
      images,
      className,
      containerClassName,
      cardClassName,
      animationDuration = 32,
      cardWidth = 250,
      style,
      ...props
    },
    ref
  ) => {
    const N = images.length;
    
    // We compute the CSS variables here instead of polluting the global CSS
    const customStyle = {
      "--n": N,
      "--w": `${cardWidth}px`,
      "--ba": `calc(1turn / var(--n))`,
      "--anim-dur": `${animationDuration}s`,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full h-full min-h-[500px] grid place-items-center overflow-hidden",
          className
        )}
        style={{
          perspective: "35em",
          ...style // This allows overriding perspective from the parent!
        }}
        {...props}
      >
        <div className="w-full h-full" style={{ transform: "translateZ(var(--translate-z, 0px))", transformStyle: "preserve-3d", willChange: "transform" }}>
          <div
            className={cn(
              "grid place-items-center [transform-style:preserve-3d] motion-reduce:!animate-[ry_128s_linear_infinite]",
              containerClassName
            )}
          style={{
            ...customStyle,
            animation: "ry var(--anim-dur) linear infinite",
            willChange: "transform",
          }}
        >
          {/* We define the keyframes inline via a style block to ensure it works without global CSS config */}
          <style>
            {`
              @keyframes ry {
                to { transform: rotateY(1turn); }
              }
            `}
          </style>
          
          {images.map((img, i) => (
            <img
              key={img.id}
              src={img.src}
              alt={img.alt || `Carousel image ${i}`}
              loading="eager"
              decoding="async"
              className={cn(
                "[grid-area:1/1] object-cover rounded-2xl [backface-visibility:hidden]",
                cardClassName
              )}
              style={{
                width: "var(--w)",
                aspectRatio: "7/10",
                "--i": i,
                willChange: "transform",
                // Negative translateZ creates a concave carousel (we look at the inside back wall)
                transform: "rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / tan(0.5 * var(--ba))))",
              } as React.CSSProperties}
            />
          ))}
          </div>
        </div>
      </div>
    );
  }
);

CylinderCarousel.displayName = "CylinderCarousel";
