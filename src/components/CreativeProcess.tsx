import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const processItems = [
  {
    tag: "01",
    title: "Starter",
    subtitle: "Normal quality music video and two TikTok contents",
    duration: "2 Weeks Delivery",
    deliverables: ["Thumbnail Included", "4K Music Video"],
    team: "Minimal Camera Production",
    teamLabel: "Production",
    tools: "Color Grading & Max 3 Mins",
    toolsLabel: "Specifications",
    image: "/images/package_starter.png",
    link: "https://wa.me/94766004462?text=Hi!%20I'm%20interested%20in%20booking%20the%20Starter%20Package."
  },
  {
    tag: "02",
    title: "Creator",
    subtitle: "Professional music video production with custom motion graphics",
    duration: "2 Week Delivery",
    deliverables: ["Thumbnail Included", "4K Exports"],
    team: "Standard Production",
    teamLabel: "Production",
    tools: "Cinematic Color Grading & Motion Graphics",
    toolsLabel: "Specifications",
    image: "/images/package_creator.png",
    link: "https://wa.me/94766004462?text=Hi!%20I'm%20interested%20in%20booking%20the%20Creator%20Package."
  },
  {
    tag: "03",
    title: "Professional",
    subtitle: "High-end music video production with advanced cinematic visual styling",
    duration: "1 Weeks Delivery",
    deliverables: ["4K Delivery"],
    team: "Full Cinematic Production",
    teamLabel: "Production",
    tools: "Professional Color Grading, VFX & Transitions",
    toolsLabel: "Specifications",
    image: "/images/package_professional.png",
    link: "https://wa.me/94766004462?text=Hi!%20I'm%20interested%20in%20booking%20the%20Professional%20Package."
  },
  {
    tag: "04",
    title: "Premium",
    subtitle: "High-end brand films & events",
    duration: "Priority Delivery",
    deliverables: ["Brand Film / Doc", "Drone Shots"],
    team: "Multi-Camera / Scalable Production (Based on Budget)",
    teamLabel: "Production",
    tools: "Premium VFX & Dedicated Support",
    toolsLabel: "Specifications",
    image: "/images/package_premium.png",
    link: "https://wa.me/94766004462?text=Hi!%20I'm%20interested%20in%20booking%20the%20Premium%20Package."
  }
];

export const CreativeProcess = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.scrollWidth / processItems.length;
    const index = Math.min(
      processItems.length - 1,
      Math.max(0, Math.round(scrollLeft / itemWidth))
    );
    setActiveIndex(index);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.85; // approximate width of one card (85vw)
    const targetScrollLeft = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
        }
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        if (i !== 0) {
          gsap.set(card, { autoAlpha: 0, y: 50 });
        } else {
          gsap.set(card, { autoAlpha: 1, y: 0 });
        }

        if (i !== 0) {
          tl.to(card, { autoAlpha: 1, y: 0, duration: 1 });

          // Smoothly reveal the new image from left to right (clip-path: inset(0 100% 0 0) -> inset(0 0 0 0))
          if (imageRefs.current[i]) {
            tl.to(imageRefs.current[i], {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "power2.inOut"
            }, "<");
          }
        }

        if (i !== cardsRef.current.length - 1) {
          tl.to(card, { autoAlpha: 0, y: -50, duration: 1 }, "+=0.5");
        }
      });

      tl.to(contentWrapperRef.current, {
        y: -150,
        autoAlpha: 0,
        duration: 3,
        ease: "power2.inOut"
      }, "+=0.5");
    });

    return () => mm.revert();
  }, { scope: sectionRef });




  return (
    <section ref={sectionRef} className="w-full relative h-auto lg:h-screen bg-[#0A0A0A] border-t border-white/5 z-10 overflow-visible lg:overflow-hidden">
      {/* Premium Studio Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop"
          alt="Production Studio Console"
          className="w-full h-full object-cover filter blur-[5px] brightness-[0.22] saturate-[0.75] contrast-[1.1] scale-105"
        />
        {/* Dark radial glow to vignette the image */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0A0A0A_95%)] opacity-85" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0A0A0A] via-transparent to-[#141414] opacity-90" />
      </div>

      {/* Self-contained Keyframe Animations for Live Effects */}
      <style>{`
        @keyframes float-dust-cp {
          0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0; }
          10% { opacity: 0.35; }
          50% { transform: translateY(-70px) translateX(25px) scale(1.3); opacity: 0.65; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-140px) translateX(0px) scale(0.9); opacity: 0; }
        }
        @keyframes ambient-pulse-cp {
          0% { transform: scale(1) translate(0px, 0px); opacity: 0.3; }
          50% { transform: scale(1.06) translate(8px, -12px); opacity: 0.55; }
          100% { transform: scale(1) translate(0px, 0px); opacity: 0.3; }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Warm Ambient Light Leaks / Glowing Flares (Live Effects) */}
      <div className="absolute top-[8%] left-[20%] w-105 h-105 bg-amber-600/5 rounded-full blur-[100px] animate-[ambient-pulse-cp_14s_infinite_ease-in-out] pointer-events-none z-0" />
      <div className="absolute bottom-[12%] right-[8%] w-130 h-130 bg-orange-600/5 rounded-full blur-[120px] animate-[ambient-pulse-cp_18s_infinite_ease-in-out_2.5s] pointer-events-none z-0" />
      <div className="absolute top-[35%] left-[8%] w-90 h-90 bg-yellow-600/5 rounded-full blur-[90px] animate-[ambient-pulse-cp_11s_infinite_ease-in-out_5.5s] pointer-events-none z-0" />

      {/* Floating Bokeh Dust Particles (Live Effects) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 4.5 + 2;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 9;
          const duration = Math.random() * 12 + 13;
          const isOrange = Math.random() > 0.45;
          return (
            <div
              key={i}
              className={`absolute rounded-full blur-[0.5px] opacity-0 animate-[float-dust-cp_20s_infinite_ease-in-out] ${isOrange ? "bg-amber-500/20 shadow-[0_0_6px_rgba(245,158,11,0.18)]" : "bg-[#F27D26]/20 shadow-[0_0_6px_rgba(242,125,38,0.18)]"
                }`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>

      {/* Wrapper for all visible content to slide up and fade out together */}
      <div ref={contentWrapperRef} className="relative lg:absolute lg:inset-0 w-full h-auto lg:h-full z-10 pointer-events-none">
        <div className="h-auto lg:h-full w-full flex flex-col justify-center py-12 sm:py-20 px-6 md:px-16 lg:px-32 overflow-visible lg:overflow-hidden relative z-10 pointer-events-auto">


          {/* Section Header */}
          <div className="flex flex-col mb-12 md:mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-1.5 h-1.5 bg-[#F27D26] rounded-full"></div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#F27D26]/80">Pricing Plans</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-lora text-white tracking-tight max-w-4xl">
              Tailored Packages <br className="hidden md:block" /> Engineered for <span className="text-3xl md:text-5xl lg:text-6xl font-anton-regular font-bold text-[#f27d26]">Impact</span>
            </h2>
            <p className="text-neutral-500 text-xs md:text-sm max-w-xl leading-relaxed mt-6">
              Find the perfect production package for your project. From social starter videos to high-end brand documentaries, we deliver industry-grade results scaled to your needs.
            </p>
          </div>

          {/* Section Content Tracker */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center relative flex-1 w-full min-h-[50vh]">

            {/* Left: Dynamic Viewfinder Image Stack */}
            <div className="w-full lg:w-1/2 h-[45vh] lg:h-full rounded-xl border border-[#F27D26]/20 bg-linear-to-br from-white/5 to-transparent relative overflow-hidden hidden lg:flex items-center justify-center p-8 shadow-[0_0_50px_rgba(242,125,38,0.03)] -mt-20">
              <div className="absolute inset-0 bg-[#F27D26]/5 transition-opacity duration-700"></div>

              {/* Viewfinder Monitor Screen */}
              <div className="w-[85%] h-[90%] bg-[#0f0f0f] border border-white/5 rounded-lg relative shadow-2xl transform -rotate-2 z-10 overflow-hidden aspect-video">

                {/* Stacked Images (Reveal Left to Right) */}
                {processItems.map((item, i) => (
                  <div
                    key={item.tag}
                    ref={(el: HTMLDivElement | null) => { imageRefs.current[i] = el; }}
                    className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
                    style={{
                      zIndex: 10 + i,
                      clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)"
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Cinematic Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />
                  </div>
                ))}

                {/* Static Viewfinder HUD Overlay (Drawn on top of all images) */}
                <div className="absolute inset-3 pointer-events-none z-30 border border-white/10 flex flex-col justify-between p-3">
                  <div className="flex justify-between items-center text-[7px] font-mono tracking-[0.2em] text-white/40 uppercase">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] animate-pulse"></span>
                      <span>REC</span>
                    </div>
                    <span>1080P 24FPS</span>
                  </div>

                  {/* Crosshair Center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-30">
                    <div className="w-3 h-px bg-white"></div>
                    <div className="h-3 w-px bg-white absolute"></div>
                  </div>

                  <div className="flex justify-between items-center text-[7px] font-mono tracking-[0.2em] text-white/40 uppercase">
                    <span>ISO 800</span>
                    <span>STBY [A]</span>
                  </div>
                </div>

              </div>

              {/* Viewfinder Lens Attachment Plate */}
              <div className="absolute bottom-10 right-8 md:right-16 w-32 h-2.5 bg-linear-to-r from-neutral-800 to-black border border-white/10 rounded-full shadow-2xl rotate-35 flex items-center justify-end px-1.5 z-20">
                <div className="w-4 h-1.5 bg-[#F27D26]/70 rounded-full shadow-[0_0_10px_rgba(242,125,38,0.5)]"></div>
              </div>
            </div>

            {/* Right: The Sliding Cards Wrapper */}
            <div className="w-full lg:w-1/2 h-auto lg:h-full relative flex flex-col justify-center mt-8 lg:mt-0">
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="w-full h-auto lg:h-full relative flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar justify-start lg:justify-center gap-6 lg:gap-0 mt-0 lg:-mt-30 pb-4 lg:pb-0"
              >
                {processItems.map((item, i) => {
                  return (
                    <div
                      key={item.tag}
                      ref={(el: HTMLDivElement | null) => { cardsRef.current[i] = el; }}
                      className="snap-center shrink-0 w-[85vw] sm:w-125 lg:w-full relative lg:absolute flex flex-col justify-center bg-[#0A0A0A]/90 backdrop-blur-none sm:bg-[#0A0A0A]/60 sm:backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-0 lg:border-none lg:rounded-none lg:backdrop-blur-none lg:bg-transparent shadow-2xl lg:shadow-none will-change-[transform,opacity]"
                    >
                      <div className="flex items-center mb-4 sm:mb-6 lg:mb-8 -ml-2">
                        <span className="text-[45px] sm:text-[60px] md:text-[80px] lg:text-[120px] leading-[0.8] text-[#F27D26]/40 font-serif mr-3 sm:mr-4 lg:mr-6">{item.tag}</span>
                        <h3 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl text-white font-jetbrains">{item.title}</h3>
                      </div>

                      {/* Inline Image for Mobile/Tablet */}
                      <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/10 mb-6 lg:hidden shadow-[0_0_30px_rgba(242,125,38,0.05)]">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>

                      <p className="text-neutral-500 text-[10px] md:text-xs tracking-widest uppercase mb-8 lg:mb-12">
                        {item.subtitle}
                      </p>

                      <div className="flex flex-col border-t border-white/10">
                        <div className="flex justify-between items-center py-4 lg:py-5 border-b border-white/5">
                          <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Duration</span>
                          <span className="text-[10px] md:text-xs text-[#E5E5E5] font-mono uppercase tracking-widest">{item.duration}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 lg:py-5 border-b border-white/5 gap-4">
                          <span className="text-[10px] text-neutral-500 uppercase tracking-widest whitespace-nowrap">Deliverables</span>
                          <div className="flex flex-wrap gap-2 sm:justify-end">
                            {item.deliverables.map(deliverable => (
                              <span key={deliverable} className="px-3 py-1 text-[9px] uppercase tracking-widest border border-[#F27D26]/40 text-[#F27D26] rounded-full">
                                {deliverable}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 lg:py-5 border-b border-white/5 gap-2">
                          <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{item.teamLabel || "Team"}</span>
                          <span className="text-[10px] text-[#E5E5E5] uppercase tracking-widest sm:text-right">{item.team}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 lg:py-5 border-b border-white/5 gap-2">
                          <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{item.toolsLabel || "Tools"}</span>
                          <span className="text-[10px] text-[#E5E5E5] uppercase tracking-widest sm:text-right">{item.tools}</span>
                        </div>

                        {item.link && (
                          <div className="pt-6">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-linear-to-r from-[#F27D26] to-[#C6904E] text-white py-4 px-6 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3 group/btn cursor-pointer shadow-[0_4px_20px_rgba(242,125,38,0.25)] hover:shadow-[0_4px_30px_rgba(242,125,38,0.45)] text-center pointer-events-auto text-decoration-none"
                            >
                              <span>Book Now</span>
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Carousel Navigation Panel for Mobile */}
              <div className="flex items-center justify-center gap-6 mt-6 lg:hidden">
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  disabled={activeIndex === 0}
                  className="p-2 rounded-full border border-white/10 bg-[#0A0A0A]/85 text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="w-5 h-5 text-[#F27D26]" strokeWidth={2} />
                </button>

                <div className="flex gap-2">
                  {processItems.map((item, i) => (
                    <div
                      key={item.tag}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? "w-6 bg-[#F27D26]" : "w-1.5 bg-white/20"
                        }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  disabled={activeIndex === processItems.length - 1}
                  className="p-2 rounded-full border border-white/10 bg-[#0A0A0A]/85 text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                  aria-label="Next step"
                >
                  <ChevronRight className="w-5 h-5 text-[#F27D26]" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}