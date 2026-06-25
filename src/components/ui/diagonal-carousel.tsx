"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { ChevronLeft, ChevronRight, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiagonalCarouselItem {
  src: string;
  title: string;
  alt?: string;
  youtubeUrl?: string;
}

export interface DiagonalCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: DiagonalCarouselItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  loop?: boolean;
  slideSize?: number;
  rotationStep?: number;
  verticalStep?: number;
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
  bounce: 0.16,
  duration: 0.85,
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function DiagonalCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  loop = false,
  slideSize = 260,
  rotationStep = 30,
  verticalStep = 120,
  inactiveScale = 0.6,
  transition = DEFAULT_TRANSITION,
  showControls = true,
  showDots = true,
  viewportClassName,
  slideClassName,
  imageClassName,
  labelClassName,
  controlsClassName,
  aspectClassName = "aspect-[2/3]",
  className,
  onKeyDown,
  tabIndex,
  ...props
}: DiagonalCarouselProps) {
  const maxIndex = Math.max(0, items.length - 1);
  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(() =>
    clamp(defaultActiveIndex, 0, maxIndex)
  );
  const currentIndex = clamp(activeIndex ?? uncontrolledIndex, 0, maxIndex);
  const safeSlideSize = Math.max(120, slideSize);
  const safeInactiveScale = clamp(inactiveScale, 0.35, 1);

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

  if (!items.length) {
    return null;
  }

  const isPreviousDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === maxIndex;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Diagonal image carousel"
      tabIndex={tabIndex ?? 0}
      onKeyDown={handleKeyDown}
      className={cn("relative isolate h-full w-full overflow-hidden", className)}
      {...props}
    >
      <div className={cn("absolute inset-0 overflow-hidden", viewportClassName)}>
        <motion.div
          className="absolute left-1/2 top-3 md:top-3 lg:top-[25%] flex w-fit"
          animate={{ x: -(currentIndex * safeSlideSize + safeSlideSize / 2) }}
          transition={transition}
        >
          {items.map((item, index) => {
            const isActive = currentIndex === index;
            const distance = index - currentIndex;

            return (
              <motion.div
                key={`${item.src}-${index}`}
                className={cn(
                  "flex shrink-0 flex-col items-center gap-2 will-change-transform",
                  slideClassName
                )}
                style={{ width: safeSlideSize }}
                animate={{
                  rotate: distance * rotationStep,
                  scale: isActive ? 1 : safeInactiveScale,
                  y: distance * verticalStep,
                }}
                transition={transition}
              >
                <div className="flex flex-col items-center min-h-[40px] justify-center" />

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

                  {/* Second row: Title and redirect button */}
                  <div className="flex-1 flex flex-col justify-between p-2.5 sm:p-3.5 min-h-0">
                    <div className="text-left font-sans">
                      <h4 className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/95 line-clamp-2 tracking-wide leading-tight sm:leading-snug select-text">
                        {item.title}
                      </h4>
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
                          "mt-2 flex items-center justify-center gap-1 sm:gap-1.5 w-full text-white font-medium text-[9px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg shadow-md transition-all duration-300 transform active:scale-95",
                          isActive
                            ? "bg-[#FF0000] hover:bg-[#CC0000] cursor-pointer"
                            : "bg-neutral-800/80 text-neutral-400 pointer-events-none opacity-50"
                        )}
                      >
                        <Youtube className="size-3 sm:size-4 shrink-0 fill-current" />
                        <span>Watch</span>
                      </a>
                    ) : (
                      <div className="mt-2 flex items-center justify-center gap-1 sm:gap-1.5 w-full bg-neutral-800/80 text-neutral-400 font-medium text-[9px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg border border-neutral-700/50 pointer-events-none">
                        <Youtube className="size-3 sm:size-4 shrink-0" />
                        <span>Watch</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {showControls && (
        <div
          className={cn(
            "absolute inset-x-4 bottom-0 md:bottom-0 lg:bottom-12 z-10 mx-auto flex w-fit items-center justify-center gap-3 rounded-full border border-white/10 bg-[#0A0A0A]/85 px-3 py-1 text-neutral-100 shadow-2xl backdrop-blur-md",
            controlsClassName
          )}
        >
          <button
            type="button"
            aria-label="Show previous slide"
            disabled={isPreviousDisabled}
            className="inline-flex size-8 items-center justify-center rounded-full transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-20"
            onClick={() => selectSlide(currentIndex - 1)}
          >
            <ChevronLeft className="size-4 text-white" />
          </button>

          {showDots && (
            <div className="flex items-center justify-center gap-1.5 px-1">
              {items.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  aria-label={`Show slide ${index + 1}: ${item.title}`}
                  aria-current={currentIndex === index ? "true" : undefined}
                  className={cn(
                    "h-1.5 rounded-full bg-white transition-all duration-300",
                    currentIndex === index ? "w-6 bg-[#F27D26] opacity-100" : "w-1.5 opacity-25 hover:opacity-40"
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
            className="inline-flex size-8 items-center justify-center rounded-full transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-20"
            onClick={() => selectSlide(currentIndex + 1)}
          >
            <ChevronRight className="size-4 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}

export default DiagonalCarousel;
