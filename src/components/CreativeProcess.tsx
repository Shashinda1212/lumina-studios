import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const processItems = [
  {
    tag: "01",
    title: "Conceptualization",
    subtitle: "Defining the visual language and structural narrative.",
    duration: "24-48 Hours",
    deliverables: ["Mood Boards", "Storyboards", "Technical Specs"],
    team: "Creative Directors, Visual Strategists",
    tools: "AI-Powered Concept Generation",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    tag: "02",
    title: "Pre-Production",
    subtitle: "Orchestrating logistics and securing essential assets for the shoot.",
    duration: "1-2 Weeks",
    deliverables: ["Location Scouting", "Casting", "Shot Lists"],
    team: "Producers, Location Managers",
    tools: "Resource Scheduling Software",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop"
  },
  {
    tag: "03",
    title: "Production",
    subtitle: "Executing the vision with cinematic precision and advanced capabilities.",
    duration: "Varies",
    deliverables: ["Raw Footage", "On-Set Photography", "Audio Captures"],
    team: "Directors, Cinematographers, Crews",
    tools: "8K RAW Cinema Cameras",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop"
  },
  {
    tag: "04",
    title: "Post-Production",
    subtitle: "Refining the narrative through editing, color grading, and comprehensive VFX.",
    duration: "2-4 Weeks",
    deliverables: ["Final Cut", "Color Grading", "Sound Design"],
    team: "Editors, Colorists, VFX Artists",
    tools: "Advanced Editing Suites, Coloring Panels",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop"
  }
];

export const CreativeProcess = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    const animateTimeline = (trigger: HTMLElement | null, start: string) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
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
    };

    // Desktop Behavior (min-width: 768px)
    mm.add("(min-width: 768px)", () => {
      animateTimeline(sectionRef.current, "top top");
    });

    // Mobile Behavior (max-width: 767px)
    mm.add("(max-width: 767px)", () => {
      animateTimeline(interactiveRef.current, "top 10%");

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: bgRef.current,
        pinSpacing: false
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });




  return (
    <section id="services" ref={sectionRef} className="w-full relative bg-[#0A0A0A] overflow-clip">
      {/* Premium Studio Background Image */}
      <div ref={bgRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
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
      `}</style>

      {/* Warm Ambient Light Leaks / Glowing Flares (Live Effects) */}
      <div className="absolute top-[8%] left-[20%] w-[420px] h-[420px] bg-amber-600/5 rounded-full blur-[100px] animate-[ambient-pulse-cp_14s_infinite_ease-in-out] pointer-events-none z-0" />
      <div className="absolute bottom-[12%] right-[8%] w-[520px] h-[520px] bg-orange-600/5 rounded-full blur-[120px] animate-[ambient-pulse-cp_18s_infinite_ease-in-out_2.5s] pointer-events-none z-0" />
      <div className="absolute top-[35%] left-[8%] w-[360px] h-[360px] bg-yellow-600/5 rounded-full blur-[90px] animate-[ambient-pulse-cp_11s_infinite_ease-in-out_5.5s] pointer-events-none z-0" />

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

      {/* BLOCK A (The Header) */}
      <div className="pt-24 pb-12 px-6 md:px-16 lg:px-32 relative z-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-1.5 h-1.5 bg-[#F27D26] rounded-full"></div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#F27D26]/80">Creative Process</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-lora text-white tracking-tight max-w-4xl">
          Every Frame <br className="hidden md:block" /> Engineered for <span className="text-3xl md:text-5xl lg:text-6xl font-anton-regular font-bold text-[#f27d26]">Impact</span>
        </h2>
        <p className="text-neutral-500 text-xs md:text-sm max-w-xl leading-relaxed mt-6">
          We meticulously construct visual narratives using advanced technology and timeless cinematic principles, ensuring your message resonates authentically.
        </p>
      </div>

      {/* BLOCK B (The Interactive Area) */}
      <div ref={interactiveRef} className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-24 items-start lg:items-center lg:justify-between w-full px-6 md:px-16 lg:px-32 relative z-10 min-h-[85svh] lg:min-h-[85vh] pb-12 md:pb-24 lg:pb-32">
        {/* Left: Dynamic Viewfinder Image Stack */}
        <div className="w-full lg:w-[50%] h-[25vh] md:h-[35vh] lg:h-auto lg:aspect-[3/2] lg:max-h-[55vh] xl:max-h-[60vh] rounded-xl border border-[#F27D26]/20 bg-linear-to-br from-white/5 to-transparent relative overflow-hidden flex items-center justify-center p-2 md:p-8 shadow-2xl shadow-black/80 md:shadow-[0_0_50px_rgba(242,125,38,0.03)] -mt-10 lg:-mt-50 mb-10 lg:mb-0" >
          <div className="absolute inset-0 bg-[#F27D26]/5 transition-opacity duration-700"></div>

          {/* Viewfinder Monitor Screen */}
          <div className="w-[95%] h-[95%] md:w-[85%] md:h-[90%] bg-[#0f0f0f] border border-white/5 rounded-lg relative shadow-2xl transform -rotate-2 z-10 overflow-hidden aspect-video">

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

        {/* Right: The Sliding Cards */}
        <div className="w-full lg:w-[40%] h-full flex-1 relative flex items-center lg:-mt-45 md:-mt-20 ">
          {processItems.map((item, i) => {
            return (
              <div
                key={item.tag}
                ref={(el: HTMLDivElement | null) => { cardsRef.current[i] = el; }}
                className="absolute w-full flex flex-col justify-center bg-transparent px-4 sm:px-6 lg:px-0 will-change-[transform,opacity]"
              >
                <div className="flex items-center mb-6 lg:mb-8 -ml-2">
                  <span className="text-5xl md:text-[80px] lg:text-[120px] leading-[0.8] text-[#F27D26]/40 font-serif mr-4 lg:mr-6">{item.tag}</span>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl text-white font-jetbrains">{item.title}</h3>
                </div>

                <p className="text-neutral-500 text-[10px] md:text-xs tracking-widest uppercase mb-8 lg:mb-12">
                  {item.subtitle}
                </p>

                <div className="flex flex-col border-t border-white/10">
                  <div className="flex justify-between items-center py-3 lg:py-5 border-b border-white/5">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Duration</span>
                    <span className="text-[10px] md:text-xs text-[#E5E5E5] font-mono uppercase tracking-widest">{item.duration}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 lg:py-5 border-b border-white/5 gap-4">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest whitespace-nowrap">Deliverables</span>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {item.deliverables.map(deliverable => (
                        <span key={deliverable} className="px-3 py-1 text-[9px] uppercase tracking-widest border border-[#F27D26]/40 text-[#F27D26] rounded-full">
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 lg:py-5 border-b border-white/5 gap-2">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Team</span>
                    <span className="text-[10px] text-[#E5E5E5] uppercase tracking-widest sm:text-right">{item.team}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 lg:py-5 border-b border-white/5 gap-2">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Tools</span>
                    <span className="text-[10px] text-[#E5E5E5] uppercase tracking-widest sm:text-right">{item.tools}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}