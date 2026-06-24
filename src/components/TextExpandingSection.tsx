import { useEffect, useRef, ReactNode, useState, Suspense, lazy } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiagonalCarousel } from "./ui/diagonal-carousel";
import downloadImg from "../assets/images/download.jpg";
import { useGSAP } from "@gsap/react";
import { Trophy, Folder, Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const splitText = (text: string, className: string) => {
    return text
        .split(" ")
        .filter(Boolean)
        .map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
                <span className={`inline-block ${className}`}>
                    {word}
                </span>
            </span>
        ))
        .reduce<ReactNode[]>((acc, curr, i) => {
            if (i === 0) return [curr];
            return [...acc, " ", curr];
        }, []);
};

export const TextExpandingSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const nextItemRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    const [slideSize, setSlideSize] = useState(210);
    const [verticalStep, setVerticalStep] = useState(50);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setSlideSize(125);
                setVerticalStep(25);
            } else if (window.innerWidth < 1024) {
                setSlideSize(145);
                setVerticalStep(35);
            } else {
                setSlideSize(210);
                setVerticalStep(50);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const items = [
        { src: downloadImg, title: "urban exploration" },
        { src: downloadImg, title: "night scene" },
        { src: downloadImg, title: "yellow wildflowers" },
        { src: downloadImg, title: "street with mount fuji" },
        { src: downloadImg, title: "street with mount fuji" },
        { src: downloadImg, title: "street with mount fuji" },
        { src: downloadImg, title: "street with mount fuji" },
        { src: downloadImg, title: "street with mount fuji" },
        { src: downloadImg, title: "street with mount fuji" },
        { src: downloadImg, title: "street with mount fuji" },
        { src: downloadImg, title: "street with mount fuji" },
    ];



    useGSAP(() => {
        // 1. Initial State for Text Reveal
        gsap.set([text1Ref.current, text2Ref.current], { yPercent: 100 });
        gsap.set(".title-word", { yPercent: 100 });
        gsap.set(".subtitle-word", { yPercent: 100 });
        gsap.set(nextItemRef.current, { scale: 0, autoAlpha: 0 });

        // Text Reveal Timeline
        const entryTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            }
        });

        entryTl.to([text1Ref.current, text2Ref.current], {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
        });


        // 2. Pin and Scroll Animation Setup
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=200%", // Slightly longer scroll track for smooth entry, hold, and exit
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                fastScrollEnd: true,
                preventOverlaps: true,
            }
        });

        // 1. Entrance Phase
        scrollTl.to(text1Ref.current, {
            x: "-40vw",
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut"
        }, 0);

        scrollTl.to(text2Ref.current, {
            x: "40vw",
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut"
        }, 0);

        scrollTl.to(nextItemRef.current, {
            scale: 1,
            autoAlpha: 1,
            ease: "power2.out",
            duration: 0.4,
        }, 0.1);

        scrollTl.to(".title-word", {
            yPercent: 0,
            stagger: 0.005,
            ease: "power2.out",
            duration: 0.3,
        }, 0.25);

        scrollTl.to(".subtitle-word", {
            yPercent: 0,
            stagger: 0.002,
            ease: "power2.out",
            duration: 0.3,
        }, 0.35);

        // 2. Exit Phase (Smoothly animate out content before unpinning)
        scrollTl.to(nextItemRef.current, {
            y: -100,
            opacity: 0,
            scale: 0.95,
            ease: "power2.in",
            duration: 0.4,
        }, 1.2);

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-[radial-gradient(circle_at_center,#22180F_0%,#050505_80%)]">
            
            {/* Inject self-contained premium background animations */}
            <style>{`
                @keyframes float-bokeh {
                    0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0; }
                    10% { opacity: 0.35; }
                    50% { transform: translateY(-70px) translateX(25px) scale(1.25); opacity: 0.65; }
                    90% { opacity: 0.15; }
                    100% { transform: translateY(-140px) translateX(0px) scale(0.9); opacity: 0; }
                }
                @keyframes sweep-light {
                    0% { transform: rotate(-33deg) scaleX(0.95); opacity: 0.25; }
                    50% { transform: rotate(-27deg) scaleX(1.05); opacity: 0.5; }
                    100% { transform: rotate(-33deg) scaleX(0.95); opacity: 0.25; }
                }
                @keyframes waveform-bounce {
                    0% { transform: scaleY(0.12); }
                    100% { transform: scaleY(0.85); }
                }
            `}</style>

            {/* Ambient glows for visual depth */}
            <div className="absolute top-[20%] right-[-10%] w-[550px] h-[550px] bg-[#F27D26]/5 rounded-full blur-[130px] pointer-events-none z-0" />
            <div className="absolute bottom-[10%] left-[-10%] w-[650px] h-[650px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

            {/* 1. Subtle High-Tech Dotted Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(242,125,38,0.02)_1px,transparent_1px)] bg-size-28px_28px pointer-events-none z-0 opacity-80" />
            
            {/* 6. Floating Bokeh Particle Field */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(16)].map((_, i) => {
                    const size = Math.random() * 5 + 3;
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    const delay = Math.random() * 12;
                    const duration = Math.random() * 10 + 15;
                    const isOrange = Math.random() > 0.45;
                    return (
                        <div
                            key={i}
                            className={`absolute rounded-full blur-[1px] opacity-0 animate-[float-bokeh_20s_infinite_ease-in-out] ${
                                isOrange ? "bg-[#F27D26]/25 shadow-[0_0_8px_rgba(242,125,38,0.25)]" : "bg-cyan-500/25 shadow-[0_0_8px_rgba(6,182,212,0.25)]"
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

            {/* 7. Sound Equalizer Neon Audio Waveform (From Sound theme) */}
            <div className="hidden lg:flex absolute bottom-[6%] right-[6%] w-[25%] h-[40px] pointer-events-none z-0 opacity-[0.15] flex items-end justify-between gap-[2.5px]">
                {[...Array(20)].map((_, i) => {
                    const delay = i * 0.12;
                    const height = Math.random() * 70 + 30;
                    return (
                        <div
                            key={i}
                            className="w-[2.5px] bg-linear-to-t from-cyan-500/20 via-[#F27D26]/60 to-[#F27D26] rounded-full"
                            style={{
                                height: '100%',
                                transformOrigin: 'bottom',
                                animation: `waveform-bounce 1.6s infinite ease-in-out alternate`,
                                animationDelay: `${delay}s`,
                                transform: `scaleY(${height}%)`
                            }}
                        />
                    );
                })}
            </div>

            {/* Step 1: Initial centering block */}
            <div className="flex flex-col items-center justify-center z-10 w-full relative">
                <div className="overflow-hidden py-2 px-4 -mb-2 md:-mb-4">
                    <div ref={text1Ref} className="text-2xl sm:text-3xl md:text-4xl lg:text-[5rem] font-jetbrains uppercase text-[#D4AF37] leading-none will-change-[transform,opacity]">
                        From Sound
                    </div>
                </div>
                <div className="overflow-hidden py-2 px-4">
                    <div ref={text2Ref} className="text-2xl sm:text-3xl md:text-4xl lg:text-[5rem] font-jetbrains uppercase text-white leading-none will-change-[transform,opacity]">
                        To Cinema
                    </div>
                </div>
            </div>

            {/* Step 2: The side-by-side component that scales up in the middle */}
            <div ref={nextItemRef} className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-2 xs:gap-4 md:gap-6 lg:justify-between z-20 w-full h-full px-6 md:px-16 lg:px-24 pointer-events-none will-change-[transform,opacity]">
                
                {/* Left Column: Diagonal Carousel Space */}
                <div className="pointer-events-auto w-full lg:w-[58%] h-[320px] xs:h-[335px] md:h-[370px] lg:h-full shrink-0 relative flex items-center justify-center z-10">
                    {/* Glowing trajectory curves behind the carousel */}
                    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                        <svg className="w-[120%] h-[120%] opacity-40" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Cyan glowing curve */}
                            <path d="M 50,450 Q 250,280 650,150" stroke="url(#cyanGlow)" strokeWidth="2" strokeLinecap="round" />
                            {/* Orange glowing curve */}
                            <path d="M 90,480 Q 290,310 690,180" stroke="url(#orangeGlow)" strokeWidth="1.5" strokeLinecap="round" />
                            
                            <defs>
                                <linearGradient id="cyanGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="orangeGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#F27D26" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#F27D26" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#F27D26" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <DiagonalCarousel
                        items={items}
                        loop={true}
                        defaultActiveIndex={3}
                        slideSize={slideSize}
                        rotationStep={15}
                        verticalStep={verticalStep}
                        className="w-full h-full bg-transparent z-10"
                    />
                </div>

                {/* Right Column: Copywriting and Features */}
                <div className="w-full lg:w-[38%] flex flex-col justify-center text-left pointer-events-auto mt-4 md:mt-6 lg:mt-0 z-20">
                    {/* Accent dotted line indicator */}
                    <div className="flex items-center gap-1.5 mb-3 md:mb-4 lg:mb-6 select-none">
                        <span className="text-[#F27D26]/70 tracking-[0.2em] font-semibold text-xs leading-none">•••••••••••••••••</span>
                        <div className="h-[1.5px] w-14 bg-[#F27D26]" />
                    </div>

                    {/* Headline */}
                    <h1 ref={titleRef} className="text-white text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-lora leading-[1.15] tracking-tight">
                        {splitText("Crafting cinematic visuals that transform music into", "title-word")}{" "}
                        <span className="title text-2xl xs:text-3xl md:text-4xl lg:text-5xl text-[#F27D26] font-bold tracking-wide italic leading-none">
                            {splitText("unforgettable stories.", "title-word")}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <h5 ref={subtitleRef} className="text-neutral-400 text-[11px] sm:text-xs lg:text-[13px] leading-relaxed mt-3 mb-4 md:mt-4 md:mb-6 lg:mt-6 lg:mb-8 font-sans max-w-[95%]">
                        {splitText("Where rhythm meets storytelling. We bridge the gap between sound and cinema, crafting bold visuals that transform music into immersive cinematic experiences. Every project is driven by creativity, precision, and a relentless pursuit of visual excellence.", "subtitle-word")}
                    </h5>

                    {/* Features Row */}
                    <div className="grid grid-cols-3 gap-2 xs:gap-3 md:gap-4 border-t border-white/5 pt-3 xs:pt-4 md:pt-6 w-full">
                        {/* Feature 1 */}
                        <div className="flex items-center gap-1.5 xs:gap-2.5">
                            <div className="w-7 h-7 xs:w-8 h-8 md:w-9 md:h-9 border border-[#F27D26]/20 bg-[#F27D26]/5 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(242,125,38,0.08)]">
                                <Trophy className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#F27D26]" strokeWidth={1.5} />
                            </div>
                            <div className="text-[10px] tracking-wide text-neutral-300 font-medium leading-tight font-sans">
                                <div className="text-xs xs:text-sm md:text-lg">5 Years +</div>
                                <div className="text-neutral-500 font-normal lowercase mt-0.5 text-[9px] xs:text-xs md:text-sm">Experience</div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-center gap-1.5 xs:gap-2.5">
                            <div className="w-7 h-7 xs:w-8 h-8 md:w-9 md:h-9 border border-[#F27D26]/20 bg-[#F27D26]/5 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(242,125,38,0.08)]">
                                <Folder className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#F27D26]" strokeWidth={1.5} />
                            </div>
                            <div className="text-[10px] tracking-wide text-neutral-300 font-medium leading-tight font-sans">
                                <div className="text-xs xs:text-sm md:text-lg">200 +</div>
                                <div className="text-neutral-500 font-normal lowercase mt-0.5 text-[9px] xs:text-xs md:text-sm">Projects</div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-center gap-1.5 xs:gap-2.5">
                            <div className="w-7 h-7 xs:w-8 h-8 md:w-9 md:h-9 border border-[#F27D26]/20 bg-[#F27D26]/5 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(242,125,38,0.08)]">
                                <Eye className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#F27D26]" strokeWidth={1.5} />
                            </div>
                            <div className="text-[10px] tracking-wide text-neutral-300 font-medium leading-tight font-sans">
                                <div className="text-xs xs:text-sm md:text-lg">15M +</div>
                                <div className="text-neutral-500 font-normal lowercase mt-0.5 text-[9px] xs:text-xs md:text-sm">Views</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};