import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, Instagram, Video as VideoIcon, Youtube, Clapperboard, Box, PlayCircle, Facebook, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavigationMenu } from './NavigationMenu';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
    videoSrc?: string | null;
}

// Words for typewriter animation
const words = ["CRAFTED.", "DIRECTED.", "CAPTURED.", "DESIGNED."];

const TypewriterText = () => {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentWord = words[index];
            if (!isDeleting) {
                setText(currentWord.substring(0, text.length + 1));
                if (text.length === currentWord.length) {
                    setTimeout(() => setIsDeleting(true), 2500); // Wait longer before deleting
                }
            } else {
                setText(currentWord.substring(0, text.length - 1));
                if (text.length === 0) {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? 40 : 120); // Faster delete, slightly slower type
        return () => clearTimeout(timeout);
    }, [text, isDeleting, index]);

    return (
        <span className="text-[#C6904E] relative inline-block pr-4">
            {text}
            <span className="absolute right-0 top-[10%] w-1.5 md:w-2.5 h-[80%] bg-[#C6904E] animate-pulse"></span>
        </span>
    );
};

export const Hero = ({ videoSrc }: HeroProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const collageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            // Full parallax timeline for desktop/tablet screens
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });

            if (contentRef.current) {
                tl.to(contentRef.current, {
                    y: -150,
                    opacity: 0,
                    ease: "none",
                }, 0);
            }

            if (collageRef.current) {
                tl.to(collageRef.current, {
                    y: -150,
                    opacity: 0,
                    ease: "none",
                }, 0);
            }

            if (footerRef.current) {
                tl.to(footerRef.current, {
                    y: -100,
                    opacity: 0,
                    ease: "none",
                }, 0);
            }

            if (videoRef.current) {
                tl.to(videoRef.current, {
                    y: 150,
                    ease: "none",
                }, 0);
            }
        });

        mm.add("(max-width: 768px)", () => {
            // Simplified scroll timeline for mobile screens (removes heavy Y translations on text/video)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            if (contentRef.current) {
                tl.to(contentRef.current, {
                    opacity: 0,
                    ease: "none",
                }, 0);
            }

            if (collageRef.current) {
                tl.to(collageRef.current, {
                    opacity: 0,
                    ease: "none",
                }, 0);
            }

            if (footerRef.current) {
                tl.to(footerRef.current, {
                    opacity: 0,
                    ease: "none",
                }, 0);
            }
        });

        return () => mm.revert();
    }, { scope: sectionRef });
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

    // Text Reveal Animation Variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
        })
    };

    return (
        <motion.section
            id="home"
            ref={sectionRef as any}
            exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="min-h-[100svh] w-full relative flex flex-col justify-between bg-[#050505] text-white overflow-hidden"
        >
            {/* Background Video */}
            <video
                ref={videoRef}
                loop={true}
                muted
                playsInline
                src={videoSrc || '/background2.webm'}
                style={{ willChange: "transform", transform: "translateZ(0)" }}
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-70 mix-blend-screen transform-gpu"
            />
            {/* Gradient Overlay to match the dark left side of the image */}
            <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/60 to-transparent z-0 pointer-events-none"></div>
            {/* Ambient gold glow behind text */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#C6904E]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/4 z-0 pointer-events-none"></div>

            {/* Header */}
            <nav className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-8 md:py-10 relative z-30">
                {/* Desktop Navbar Left (100% original styling preserved) */}
                <div className="hidden md:flex items-center space-x-6 lg:px-23">
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="bg-transparent border-0 p-0 text-left focus:outline-none focus:ring-0 text-xl md:text-2xl font-serif font-light tracking-[0.2em] cursor-pointer hover:text-[#C6904E] transition-colors duration-300 flex items-center"
                    >
                        KV <span className="ml-1 text-2xl md:text-3xl font-thin leading-none -translate-y-[2px]">ᝰ</span> <div className="mx-2 h-4 w-px bg-white/20 shrink-0"></div> <img src="/images/KVLogo.webp" alt="KV Logo" className="inline-block h-[1.1em] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity -translate-y-[1px]" />
                    </button>
                    <div className="h-4 w-px bg-white/20"></div>
                    <span className="text-[9px] md:text-[11px] tracking-[0.3em] uppercase opacity-60 font-medium">
                        Director
                    </span>
                </div>

                {/* Mobile Navbar Left (Wrapping-safe inline styling) */}
                <div className="block md:hidden text-left">
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="bg-transparent border-0 p-0 text-left focus:outline-none focus:ring-0 text-lg font-serif font-light tracking-[0.2em] cursor-pointer hover:text-[#C6904E] transition-colors duration-300 inline-flex items-center align-middle"
                    >
                        KV <span className="ml-1 text-xl font-thin leading-none -translate-y-[1px]">ᝰ</span> <div className="mx-1.5 h-3 w-px bg-white/20 shrink-0"></div> <img src="/images/KVLogo.webp" alt="KV Logo" className="inline-block h-[1.1em] w-auto object-contain opacity-90 -translate-y-[1px]" />
                    </button>
                    <span className="mx-2 h-3 w-px bg-white/20 inline-block align-middle"></span>
                    <span className="text-[9px] tracking-[0.3em] uppercase opacity-60 font-medium inline">
                        Videographer
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => setIsMenuOpen(true)}
                    className="flex items-center gap-4 text-[9px] md:text-[10px] tracking-[0.3em] uppercase opacity-80 hover:opacity-100 transition-opacity"
                >
                    <span className="hidden md:inline">Menu</span>
                    <Menu className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
                </button>
            </nav>

            {/* Sidebar Socials */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-5 z-20 hidden lg:flex">
                <a href="https://www.instagram.com/kv___production/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="p-2 border border-white/10 rounded-full hover:bg-white/20 transition-colors group">
                    <Instagram className="w-3.5 h-3.5 opacity-100 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                </a>
                <a href="https://www.youtube.com/@Film_bykv" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel" className="p-2 border border-white/10 rounded-full hover:bg-white/20 transition-colors group">
                    <Youtube className="w-3.5 h-3.5 opacity-100 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                </a>
                <a href="https://www.facebook.com/film.by.kv.1" target="_blank" rel="noopener noreferrer" aria-label="Facebook Page" className="p-2 border border-white/10 rounded-full hover:bg-white/20 transition-colors group">
                    <Facebook className="w-3.5 h-3.5 opacity-100 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                </a>
                <a href="https://www.linkedin.com/in/kanishka-viduranga-a36990376/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="p-2 border border-white/10 rounded-full hover:bg-white/20 transition-colors group">
                    <Linkedin className="w-3.5 h-3.5 opacity-100 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                </a>
                <div className="mt-16 flex items-center justify-center relative">
                    <div className="absolute top-0 w-px h-10 bg-white/20 -translate-y-12"></div>
                    <span className="rotate-270 text-[8px] uppercase tracking-[0.4em] opacity-40 whitespace-nowrap origin-center translate-y-16">
                        Follow For More
                    </span>
                </div>
            </div>

            {/* Main Hero Content */}
            <main ref={contentRef} style={{ willChange: "transform, opacity", transform: "translateZ(0)" }} className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:pl-43 xl:pl-47 mt-10 lg:mt-0 relative z-10 w-full items-start transform-gpu">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col space-y-4 max-w-3xl"
                >
                    {/* Available badge */}
                    <motion.div custom={1} variants={fadeUpVariants} className="flex items-center space-x-3 mb-6">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/70 font-semibold">Available for projects worldwide</span>
                    </motion.div>

                    <motion.h2 custom={2} variants={fadeUpVariants} className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/80 mb-2 font-medium">
                        Stories aren't told.
                    </motion.h2>

                    <motion.h1 custom={3} variants={fadeUpVariants} className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tight leading-[0.95] uppercase">
                        <span className="text-white block mb-1 drop-shadow-lg">They're</span>
                        <TypewriterText />
                    </motion.h1>

                    <motion.p custom={4} variants={fadeUpVariants} className="mt-8 text-xs sm:text-sm md:text-base text-white/70 max-w-md leading-relaxed font-light">
                        I create cinematic visuals that connect, inspire, and leave a lasting impact.
                    </motion.p>

                    <motion.div custom={5} variants={fadeUpVariants} className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <button
                            type="button"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full sm:w-auto bg-[#C6904E] text-white px-8 py-4 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#a87941] transition-all duration-300 flex items-center justify-center gap-4 group cursor-pointer"
                        >
                            Let's Create Together
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                        </button>

                        {/* <button className="w-full sm:w-auto px-6 py-4 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 text-white/80 hover:text-white transition-all duration-300 group">
                            Play Reel
                            <PlayCircle className="w-6 h-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" strokeWidth={1} />
                        </button> */}
                    </motion.div>
                </motion.div>
            </main>

            {/* Bottom Section */}
            <footer ref={footerRef} style={{ willChange: "transform, opacity", transform: "translateZ(0)" }} className="w-full px-8 md:px-16 pt-10 pb-6 md:pb-10 relative z-20 mt-auto flex justify-center transform-gpu">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 w-full max-w-5xl mx-auto">
                    {[
                        { num: "01", title: "Music Videos", desc: "High-energy visuals that bring your music to life.", icon: Clapperboard },
                        { num: "02", title: "Visual Direction", desc: "Creative vision and storytelling that elevates your brand.", icon: VideoIcon },
                        { num: "03", title: "Creative Production", desc: "End-to-end production with cinematic quality.", icon: Box },
                    ].map((item, i) => (
                        <motion.div
                            key={item.num}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
                            className="flex flex-col gap-4 border-t border-white/10 pt-6 group cursor-pointer hover:border-[#C6904E]/50 transition-colors duration-500"
                        >
                            <div className="flex items-center gap-3 text-white/50 group-hover:text-[#C6904E] transition-colors duration-300">
                                <item.icon className="w-4 h-4" strokeWidth={1.5} />
                                <span className="text-[10px] font-mono">{item.num}</span>
                            </div>
                            <div>
                                <h3 className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 text-white group-hover:text-[#C6904E] transition-colors duration-300">{item.title}</h3>
                                <p className="text-[10px] md:text-[11px] text-white/50 leading-relaxed max-w-[250px] font-light">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute right-12 bottom-16 hidden lg:flex flex-col items-center gap-4"
                >
                    <span className="text-[8px] uppercase tracking-[0.4em] rotate-90 origin-center whitespace-nowrap translate-y-6">Scroll</span>
                </motion.div>
            </footer>

            <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />


        </motion.section>
    );
};