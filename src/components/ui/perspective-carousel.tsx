"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PerspectiveCarouselItem {
  src: string;
  title: string;
  description?: string;
  alt?: string;
  youtubeUrl?: string;
}

export interface PerspectiveCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: PerspectiveCarouselItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  loop?: boolean;
  slideWidth?: number;
  rotationStep?: number;
  inactiveScale?: number;
  transition?: Transition;
  showControls?: boolean;
  showDots?: boolean;
  viewportClassName?: string;
  slideClassName?: string;
  imageClassName?: string;
  labelClassName?: string;
  controlsClassName?: string;
  aspectClassName?: string;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.14,
  duration: 0.9,
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const YoutubeIcon = ({ isActive, className }: { isActive: boolean; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
      fill={isActive ? "#FFFFFF" : "#FF0000"}
    />
    <polygon
      points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
      fill={isActive ? "#FF0000" : "#FFFFFF"}
    />
  </svg>
);

export function PerspectiveCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  loop = false,
  slideWidth = 350,
  rotationStep = 60,
  inactiveScale = 0.85,
  transition = DEFAULT_TRANSITION,
  showControls = true,
  showDots = true,
  viewportClassName,
  slideClassName,
  imageClassName,
  labelClassName,
  controlsClassName,
  aspectClassName = "aspect-[3/4]",
  className,
  onKeyDown,
  tabIndex,
  ...props
}: PerspectiveCarouselProps) {
  const maxIndex = Math.max(0, items.length - 1);
  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(() =>
    clamp(defaultActiveIndex, 0, maxIndex)
  );
  const currentIndex = clamp(activeIndex ?? uncontrolledIndex, 0, maxIndex);
  const safeSlideWidth = Math.max(96, slideWidth);
  const safeInactiveScale = clamp(inactiveScale, 0.5, 1);

  const selectSlide = React.useCallback(
    (nextIndex: number) => {
      if (!items.length) {
        return;
      }

      const resolvedIndex = loop
        ? (nextIndex + items.length) % items.length
        : clamp(nextIndex, 0, maxIndex);

      if (activeIndex === undefined) {
        setUncontrolledIndex(resolvedIndex);
      }

      onActiveIndexChange?.(resolvedIndex);
    },
    [activeIndex, items.length, loop, maxIndex, onActiveIndexChange]
  );

  if (!items.length) {
    return null;
  }

  const isPreviousDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === maxIndex;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(currentIndex + 1);
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Perspective image carousel"
      tabIndex={tabIndex ?? 0}
      onKeyDown={handleKeyDown}
      className={cn("relative isolate h-full w-full overflow-hidden", className)}
      {...props}
    >
      <div
        className={cn("absolute inset-0 overflow-hidden", viewportClassName)}
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 flex w-fit -translate-y-1/2 items-center"
          animate={{ x: -(currentIndex * safeSlideWidth + safeSlideWidth / 2) }}
          transition={transition}
        >
          {items.map((item, index) => {
            const isActive = currentIndex === index;

            return (
              <div
                key={`${item.src}-${index}`}
                className="shrink-0"
                style={{ width: safeSlideWidth, perspective: "1200px" }}
              >
                <motion.div
                  className={cn(
                    "flex w-full flex-col items-center gap-3 will-change-transform",
                    slideClassName
                  )}
                  animate={{
                    rotateY: (currentIndex - index) * rotationStep,
                    scale: isActive ? 1 : safeInactiveScale,
                  }}
                  transition={transition}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Show ${item.title}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "w-full cursor-pointer relative rounded-2xl overflow-hidden bg-[#0D0D0D]/90 border transition-all duration-500 flex flex-col justify-between select-none shadow-xl",
                      isActive
                        ? "border-2 border-[#F27D26] shadow-[0_0_35px_rgba(242,125,38,0.55)] opacity-100"
                        : "border-white/5 opacity-40 hover:opacity-60",
                      aspectClassName
                    )}
                    onClick={() => selectSlide(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectSlide(index);
                      }
                    }}
                  >
                    {/* First row: Image with 16:9 aspect ratio */}
                    <div className="w-full aspect-video overflow-hidden shrink-0 border-b border-white/5 bg-black/40">
                      <img
                        src={item.src}
                        alt={item.alt ?? item.title}
                        draggable={false}
                        className={cn(
                          "h-full w-full select-none object-cover transition-all duration-500",
                          isActive ? "grayscale-0" : "grayscale-40",
                          imageClassName
                        )}
                      />
                    </div>

                    {/* Second row: Title, Description and redirect button */}
                    <div className="flex-1 flex flex-col justify-between p-2.5 sm:p-3.5 min-h-0 mt-3">
                      <div className="text-center font-sans flex flex-col gap-1">
                        <h4 className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/95 line-clamp-2 tracking-wide leading-tight sm:leading-snug select-text">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-[8px] sm:text-[10px] text-neutral-400 line-clamp-2 font-light leading-normal select-text mt-3">
                            {item.description}
                          </p>
                        )}
                      </div>
 
                      {/* YouTube Redirect Button */}
                      {item.youtubeUrl ? (
                        <a
                          href={item.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className={cn(
                            "mb-8 flex items-center justify-center gap-1 sm:gap-1.5 w-[80%] max-w-[150px] mx-auto text-white font-medium text-[9px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg shadow-md transition-all duration-300 transform active:scale-95",
                            isActive
                              ? "bg-[#FF0000] hover:bg-[#CC0000] cursor-pointer"
                              : "bg-neutral-800/80 text-neutral-400 pointer-events-none opacity-50"
                          )}
                        >
                          <YoutubeIcon isActive={isActive} className="size-3.5 sm:size-4.5 shrink-0" />
                          <span>Watch</span>
                        </a>
                      ) : (
                        <div className="mt-3 flex items-center justify-center gap-1 sm:gap-1.5 w-[80%] max-w-[150px] mx-auto bg-neutral-800/80 text-neutral-400 font-medium text-[9px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg border border-neutral-700/50 pointer-events-none">
                          <YoutubeIcon isActive={false} className="size-3.5 sm:size-4.5 shrink-0" />
                          <span>Watch</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.p
                    className={cn("whitespace-nowrap text-sm h-0 opacity-0 select-none pointer-events-none", labelClassName)}
                    animate={{
                      filter: isActive ? "blur(0px)" : "blur(2px)",
                      opacity: 0,
                    }}
                    transition={transition}
                  />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {showControls && (
        <div
          className={cn(
            "absolute inset-x-4 bottom-5 lg:bottom-[18%] z-10 mx-auto flex w-fit items-center justify-center gap-3 rounded-full border border-neutral-300/80 bg-neutral-200/70 px-2 text-neutral-700 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/70 dark:text-neutral-100",
            controlsClassName
          )}
        >
          <button
            type="button"
            aria-label="Show previous slide"
            disabled={isPreviousDisabled}
            className="inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-35 dark:hover:bg-white/10"
            onClick={() => selectSlide(currentIndex - 1)}
          >
            <ChevronLeft className="size-5" />
          </button>

          {showDots && (
            <div className="flex items-center justify-center gap-2">
              {items.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  aria-label={`Show slide ${index + 1}: ${item.title}`}
                  aria-current={currentIndex === index ? "true" : undefined}
                  className={cn(
                    "h-2 rounded-full bg-current transition-[width,opacity] duration-300",
                    currentIndex === index ? "w-7 opacity-100" : "w-2 opacity-30"
                  )}
                  onClick={() => selectSlide(index)}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            aria-label="Show next slide"
            disabled={isNextDisabled}
            className="inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-35 dark:hover:bg-white/10"
            onClick={() => selectSlide(currentIndex + 1)}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default PerspectiveCarousel;
