import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TextExpandingSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const nextItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial State for Text Reveal
            gsap.set([text1Ref.current, text2Ref.current], { yPercent: 100 });
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
                    end: "+=150%", // Scroll distance
                    pin: true,
                    scrub: 1,
                }
            });

            scrollTl.to(text1Ref.current, {
                x: "-40vw",
                opacity: 0,
                ease: "power1.inOut"
            }, 0);

            scrollTl.to(text2Ref.current, {
                x: "40vw",
                opacity: 0,
                ease: "power1.inOut"
            }, 0);

            scrollTl.to(nextItemRef.current, {
                scale: 1,
                autoAlpha: 1,
                ease: "power2.out"
            }, 0.2);

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-[radial-gradient(circle_at_center,#2A1F14_0%,#0A0A0A_70%)]">
            <div className="flex flex-col items-center justify-center z-10 w-full relative">
                <div className="overflow-hidden py-2 px-4 -mb-2 md:-mb-4">
                    <div ref={text1Ref} className="text-2xl sm:text-3xl md:text-4xl lg:text-[5rem] font-jetbrains uppercase text-[#D4AF37] leading-none">
                        Where Sound
                    </div>
                </div>
                <div className="overflow-hidden py-2 px-4">
                    <div ref={text2Ref} className="text-2xl sm:text-3xl md:text-4xl lg:text-[5rem] font-jetbrains uppercase text-white leading-none">
                        Becomes Cinema
                    </div>
                </div>
            </div>

            {/* The next component that scales up in the middle */}
            <div ref={nextItemRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div>
                    
                </div>
            </div>
        </section>
    );
};