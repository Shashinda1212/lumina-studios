"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiagonalCarouselItem {
  src: string;
  title: string;
  alt?: string;
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
          className="absolute left-1/2 top-[25%] flex w-fit"
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
                <div className="flex flex-col items-center min-h-[40px] justify-center">
                  <motion.p
                    className={cn(
                      "whitespace-nowrap text-xs tracking-wider font-mono font-medium lowercase transition-colors duration-300",
                      isActive ? "text-[#E5E5E5]" : "text-neutral-500",
                      labelClassName
                    )}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.title}
                  </motion.p>
                  {isActive && (
                    <motion.div
                      layoutId="activeLine"
                      className="h-[2px] w-8 bg-[#F27D26] mt-1.5 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>

                <button
                  type="button"
                  aria-label={`Show ${item.title}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn("w-full cursor-pointer relative", aspectClassName)}
                  onClick={() => selectSlide(index)}
                >
                  <img
                    src={item.src}
                    alt={item.alt ?? item.title}
                    draggable={false}
                    className={cn(
                      "h-full w-full select-none rounded-2xl object-cover shadow-xl transition-all duration-500 border border-white/5",
                      isActive
                        ? "border-2 border-[#F27D26] shadow-[0_0_35px_rgba(242,125,38,0.55)] opacity-100 grayscale-0"
                        : "opacity-40 grayscale-40 hover:opacity-60",
                      imageClassName
                    )}
                  />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {showControls && (
        <div
          className={cn(
            "absolute inset-x-4 bottom-8 z-10 mx-auto flex w-fit items-center justify-center gap-3 rounded-full border border-white/10 bg-[#0A0A0A]/85 px-3 py-1 text-neutral-100 shadow-2xl backdrop-blur-md",
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
