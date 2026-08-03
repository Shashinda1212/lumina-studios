import { useEffect, useRef, ReactNode, useState, Suspense, lazy } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PerspectiveCarousel } from "./ui/perspective-carousel";
import downloadImg from "/thumbnails/maxresdefault.webp";
import { useGSAP } from "@gsap/react";
import { Trophy, Folder, Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const splitText = (text: string, className: string) => {
    return text
        .split(" ")
        .filter(Boolean)
        .map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
                <span className={`inline-block ${className}`}>
                    {word}
                </span>
            </span>
        ))
        .reduce<ReactNode[]>((acc, curr, i) => {
            if (i > 0) acc.push(" ");
            acc.push(curr);
            return acc;
        }, []);
};

// Cache to store fetched YouTube titles so re-renders are instant
const youtubeMetadataCache: Record<string, { title: string; author: string }> = {};

export type YouTubeLinkItem = string | { url: string; title?: string; description?: string; tags?: string[] };

const getYouTubeVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
};

const useYouTubeVideos = (links: YouTubeLinkItem[]) => {
    const [metadata, setMetadata] = useState<Record<string, { title: string; author: string }>>(() => ({
        ...youtubeMetadataCache
    }));

    const linksKey = JSON.stringify(links);

    // react-doctor-disable-next-line react-doctor/no-fetch-in-effect
    useEffect(() => {
        let isMounted = true;

        links.forEach((item) => {
            const url = typeof item === "string" ? item : item.url;
            const videoId = getYouTubeVideoId(url);
            if (!videoId || youtubeMetadataCache[videoId]) return;

            fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    if (isMounted && data && data.title) {
                        const fetchedData = {
                            title: data.title,
                            author: data.author_name ? `${data.author_name} • Official Video` : "YouTube Video"
                        };
                        youtubeMetadataCache[videoId] = fetchedData;
                        setMetadata((prev) => ({ ...prev, [videoId]: fetchedData }));
                    }
                })
                .catch(() => {});
        });

        return () => {
            isMounted = false;
        };
    }, [linksKey, links]);

    return links.map((item) => {
        const url = typeof item === "string" ? item : item.url;
        const customTitle = typeof item === "object" ? item.title : undefined;
        const customDescription = typeof item === "object" ? item.description : undefined;
        const tags = typeof item === "object" ? item.tags : undefined;
        const videoId = getYouTubeVideoId(url);
        const cached = videoId ? metadata[videoId] : undefined;

        return {
            src: videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : downloadImg,
            title: customTitle || cached?.title || "Loading Video...",
            description: customDescription || cached?.author || "YouTube Video",
            youtubeUrl: url,
            tags: tags,
            id: `video-${videoId || url}-${customTitle || ''}`,
        };
    });
};

// Simply put your YouTube video URLs here!
// Thumbnail (16:9 ratio), video title, and channel name are fetched automatically without any layout change.
const youtubeLinks: YouTubeLinkItem[] = [
    {
        url: "https://youtu.be/x3SsWMn1syU?si=qmOpMcW05OBcIIkP",
        tags: ["Director", "DOP"]
    },
    {
        url: "https://youtu.be/yJQf2qDC8Nk?si=suKGj77i0q6jHg8Z",
        tags: ["Director", "DOP"]
    },
    
    {
        url: "https://youtu.be/6HFdc6RPH3M?si=foBBhz9xV5I1DKD9",
        tags: ["Director", "DOP"]
    },
    {
        url: "https://youtu.be/tCut7MoIEq8?si=k6VWsy87fM-_Y37h",
        tags: ["DOP"]
    },
    
    {
        url: "https://youtu.be/DvHq-YSrG50?si=-vwijOP4KAKNSfng",
        tags: ["DOP"]
    },
];

export const TextExpandingSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const nextItemRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    const [slideSize, setSlideSize] = useState(330);
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth < 768;
        }
        return false;
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            if (width < 640) {
                setSlideSize(Math.max(120, Math.min(165, Math.round(width * 0.45))));
            } else if (width < 1024) {
                setSlideSize(265);
            } else {
                setSlideSize(330);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const items = useYouTubeVideos(youtubeLinks);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            if (!containerRef.current || !text1Ref.current || !text2Ref.current || !nextItemRef.current) return;

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
                    end: "+=100%", // Shorter scroll track — removes dead-zone hold in the middle
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
                duration: 0.3,
            }, 0.7);
        });

        return () => mm.revert();
    }, { scope: containerRef, dependencies: [isMobile] });

    if (isMobile) {
        return (
            <section id="projects" className="min-h-screen w-full flex flex-col justify-center py-16 px-6 relative overflow-hidden bg-[radial-gradient(circle_at_center,#22180F_0%,#050505_80%)]">
                {/* Style block for animations */}
                <style>{`
                    @keyframes float-bokeh {
                        0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0; }
                        10% { opacity: 0.35; }
                        50% { transform: translateY(-70px) translateX(25px) scale(1.25); opacity: 0.65; }
                        90% { opacity: 0.15; }
                        100% { transform: translateY(-140px) translateX(0px) scale(0.9); opacity: 0; }
                    }
                `}</style>

                {/* Ambient glows for visual depth */}
                <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-[#F27D26]/5 rounded-full blur-[100px] pointer-events-none z-0" />
                <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

                {/* Subtle High-Tech Dotted Grid Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(242,125,38,0.02)_1px,transparent_1px)] bg-size-28px_28px pointer-events-none z-0 opacity-80" />

                {/* Floating Bokeh Particle Field */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => {
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

                <div className="flex flex-col gap-5 xs:gap-8 z-10 w-full relative">
                    {/* Right Column details showing on top for better hierarchy on mobile */}
                    <div className="w-full flex flex-col justify-center text-left">
                        {/* Accent dotted line indicator */}
                        <div className="flex items-center gap-1.5 mb-4 select-none">
                            <span className="text-[#F27D26]/70 tracking-[0.2em] font-semibold text-xs leading-none">•••••••••••••••••</span>
                            <div className="h-[1.5px] w-14 bg-[#F27D26]" />
                        </div>

                        {/* Headline */}
                        <h1 className="text-white text-2xl xs:text-3xl font-lora leading-[1.2] tracking-tight">
                            Crafting cinematic visuals that transform music into{" "}
                            <span className="text-[#F27D26] font-bold tracking-wide italic leading-none">
                                unforgettable stories.
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <h5 className="text-neutral-400 text-xs leading-relaxed mt-3 mb-5 font-sans">
                            Where rhythm meets storytelling. We bridge the gap between sound and cinema, crafting bold visuals that transform music into immersive cinematic experiences. Every project is driven by creativity, precision, and a relentless pursuit of visual excellence.
                        </h5>

                        {/* Features Row */}
                        <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4 w-full">
                            {/* Feature 1 */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 border border-[#F27D26]/20 bg-[#F27D26]/5 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(242,125,38,0.08)]">
                                    <Trophy className="w-4 h-4 text-[#F27D26]" strokeWidth={1.5} />
                                </div>
                                <div className="text-[10px] tracking-wide text-neutral-300 font-medium leading-tight font-sans">
                                    <div className="text-xs xs:text-sm">5 Years +</div>
                                    <div className="text-neutral-500 font-normal lowercase mt-0.5 text-[9px] xs:text-xs">Experience</div>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 border border-[#F27D26]/20 bg-[#F27D26]/5 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(242,125,38,0.08)]">
                                    <Folder className="w-4 h-4 text-[#F27D26]" strokeWidth={1.5} />
                                </div>
                                <div className="text-[10px] tracking-wide text-neutral-300 font-medium leading-tight font-sans">
                                    <div className="text-xs xs:text-sm">200 +</div>
                                    <div className="text-neutral-500 font-normal lowercase mt-0.5 text-[9px] xs:text-xs">Projects</div>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 border border-[#F27D26]/20 bg-[#F27D26]/5 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(242,125,38,0.08)]">
                                    <Eye className="w-4 h-4 text-[#F27D26]" strokeWidth={1.5} />
                                </div>
                                <div className="text-[10px] tracking-wide text-neutral-300 font-medium leading-tight font-sans">
                                    <div className="text-xs xs:text-sm">15M +</div>
                                    <div className="text-neutral-500 font-normal lowercase mt-0.5 text-[9px] xs:text-xs">Views</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Left Column: Diagonal Carousel Space directly below */}
                    <div className="w-full h-[380px] xs:h-[400px] shrink-0 relative flex items-center justify-center z-10">
                        <PerspectiveCarousel
                            items={items}
                            loop={true}
                            defaultActiveIndex={Math.floor(items.length / 2)}
                            slideWidth={slideSize}
                            rotationStep={30}
                            aspectClassName="aspect-[3/4.4] xs:aspect-[3/4.2] sm:aspect-[3/4]"
                            className="w-full h-full bg-transparent z-10"
                        />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-[radial-gradient(circle_at_center,#22180F_0%,#050505_80%)]">
            
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
                <div className="pointer-events-auto w-full lg:w-[58%] h-[360px] md:h-[470px] lg:h-full shrink-0 relative flex items-center justify-center z-10">
                    <PerspectiveCarousel
                        items={items}
                        loop={true}
                        defaultActiveIndex={Math.floor(items.length / 2)}
                        slideWidth={slideSize}
                        rotationStep={30}
                        aspectClassName="aspect-[3/4.4] xs:aspect-[3/4.2] sm:aspect-[3/4]"
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
                                <div className="text-xs xs:text-sm md:text-lg">4 Years +</div>
                                <div className="text-neutral-500 font-normal lowercase mt-0.5 text-[9px] xs:text-xs md:text-sm">Experience</div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-center gap-1.5 xs:gap-2.5">
                            <div className="w-7 h-7 xs:w-8 h-8 md:w-9 md:h-9 border border-[#F27D26]/20 bg-[#F27D26]/5 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(242,125,38,0.08)]">
                                <Folder className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#F27D26]" strokeWidth={1.5} />
                            </div>
                            <div className="text-[10px] tracking-wide text-neutral-300 font-medium leading-tight font-sans">
                                <div className="text-xs xs:text-sm md:text-lg">50 +</div>
                                <div className="text-neutral-500 font-normal lowercase mt-0.5 text-[9px] xs:text-xs md:text-sm">Projects</div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-center gap-1.5 xs:gap-2.5">
                            <div className="w-7 h-7 xs:w-8 h-8 md:w-9 md:h-9 border border-[#F27D26]/20 bg-[#F27D26]/5 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(242,125,38,0.08)]">
                                <Eye className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#F27D26]" strokeWidth={1.5} />
                            </div>
                            <div className="text-[10px] tracking-wide text-neutral-300 font-medium leading-tight font-sans">
                                <div className="text-xs xs:text-sm md:text-lg">10M +</div>
                                <div className="text-neutral-500 font-normal lowercase mt-0.5 text-[9px] xs:text-xs md:text-sm">Views</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};