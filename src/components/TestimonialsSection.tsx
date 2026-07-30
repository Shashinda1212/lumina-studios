import React, { useRef, useState } from 'react';
import { FlipCard } from '@/components/animate-ui/components/community/flip-card';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialItem {
  id: number;
  name: string;
  username: string;
  image: string;
  bio: string;
  stats: {
    following: number;
    followers: number;
    posts?: number;
  };
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  glow: 'purple' | 'orange' | 'blue';
  // Desktop layout positions
  position: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    rotate: string;
  };
}

const testimonials: TestimonialItem[] = [
  {
    id: 6,
    name: 'Smokio',
    username: 'Kevinsmokio',
    image: '/images/smokio.webp',
    bio: 'Label Manager. Handled everything from pre-production casting to final delivery with unmatched style.',
    stats: { following: 95, followers: 11000 },
    socialLinks: { twitter: 'https://twitter.com' },
    glow: 'orange',
    position: { left: '28%', top: '6%', rotate: '-5deg' }
  },
  {
    id: 7,
    name: 'Reezy',
    username: 'Ramessesreezy',
    image: '/images/reezy.webp',
    bio: 'Musician. The narrative arc they constructed for our song visual was breathtaking. Highly recommend.',
    stats: { following: 120, followers: 7200, posts: 84 },
    socialLinks: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
    glow: 'orange',
    position: { right: '28%', top: '6%', rotate: '5deg' }
  },
  {
    id: 5,
    name: 'Whitecapper',
    username: 'Whitecapper',
    image: '/images/whitecapper.webp',
    bio: 'Film Director. Exceptional grading, seamless VFX, and editing. Truly understood our film\'s core message.',
    stats: { following: 154, followers: 9800, posts: 310 },
    glow: 'blue',
    position: { left: '14%', bottom: '26%', rotate: '3deg' }
  },
  {
    id: 3,
    name: 'Manasick',
    username: 'Manasickwestnahira',
    image: '/images/manasick.webp',
    bio: 'Marketing Lead at Velo. Creative vision and storytelling that elevated our brand presence globally.',
    stats: { following: 201, followers: 3500, posts: 95 },
    socialLinks: { linkedin: 'https://linkedin.com' },
    glow: 'orange',
    position: { left: '6%', top: '10%', rotate: '6deg' }
  },
  {
    id: 10,
    name: 'Mater D',
    username: 'MasterD',
    image: '/images/masterd.webp',
    bio: 'Content Creator. Kanishka\'s sound integration with lighting cues was spot on. A dynamic experience.',
    stats: { following: 430, followers: 24000, posts: 720 },
    socialLinks: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    glow: 'orange',
    position: { right: '6%', top: '10%', rotate: '-6deg' }
  },
  {
    id: 8,
    name: 'Keefa',
    username: 'Keefa',
    image: '/images/keefa.webp',
    bio: 'Creative Producer. Blown away by the speed of execution and conceptual depth. Absolute professional.',
    stats: { following: 280, followers: 16500, posts: 512 },
    socialLinks: { twitter: 'https://twitter.com' },
    glow: 'purple',
    position: { right: '14%', bottom: '26%', rotate: '-3deg' }
  },
  {
    id: 1,
    name: 'Jens Roger',
    username: 'Jensroger',
    image: '/images/jenesroger.webp',
    bio: 'Producer at Neon Edge Media. Kanishka has an exceptional eye for visual direction. His work transformed our campaign.',
    stats: { following: 142, followers: 12500, posts: 480 },
    socialLinks: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    glow: 'purple',
    position: { left: '2%', bottom: '15%', rotate: '-4deg' }
  },
  {
    id: 12,
    name: 'Suwahas',
    username: 'Suwahas',
    image: '/images/suwahas.webp',
    bio: 'Visual Artist. Masterful pacing, transitions, and framing. A beautiful translation of abstract sound to video.',
    stats: { following: 195, followers: 8900, posts: 140 },
    socialLinks: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
    glow: 'orange',
    position: { right: '2%', bottom: '15%', rotate: '4deg' }
  }
];

const glowClasses = {
  purple: 'shadow-[0_0_15px_rgba(139,92,246,0.12)] border-purple-500/25 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:border-purple-500/50',
  orange: 'shadow-[0_0_15px_rgba(242,125,38,0.12)] border-orange-500/25 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent hover:shadow-[0_0_25px_rgba(242,125,38,0.3)] hover:border-orange-500/50',
  blue: 'shadow-[0_0_15px_rgba(6,182,212,0.12)] border-cyan-500/25 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:border-cyan-500/50',
};

const backGlowClasses = {
  purple: 'bg-purple-600/10 group-hover:bg-purple-600/20',
  orange: 'bg-[#F27D26]/10 group-hover:bg-[#F27D26]/20',
  blue: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
};

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop/Tablet layout animations
    mm.add("(min-width: 1024px)", () => {
      // 1. Central copy animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        }
      });

      tl.fromTo(".testimonial-badge", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      tl.fromTo(".testimonial-title", 
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.55"
      );

      tl.fromTo(".testimonial-desc", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.55"
      );

      // 2. Desktop scattered cards layout entrance (fanning out and rotating from the center)
      gsap.fromTo(".testimonial-card-wrapper",
        {
          opacity: 0,
          scale: 0.45,
          x: (i) => {
            return i % 2 === 0 ? -150 : 150;
          },
          y: (i) => {
            return i < 6 ? -100 : 100;
          },
          rotation: (i) => {
            const targetRot = parseFloat(testimonials[i].position.rotate.replace('deg', '')) || 0;
            return targetRot * 2.5;
          }
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: (i) => {
            return parseFloat(testimonials[i].position.rotate.replace('deg', '')) || 0;
          },
          duration: 1.6,
          ease: "power4.out",
          stagger: {
            amount: 0.8,
            from: "center",
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          }
        }
      );
    });

    // Mobile layout animations are disabled for better scrolling performance

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section id="testimonials" ref={sectionRef} className="relative w-full min-h-[750px] lg:h-screen lg:min-h-[900px] flex flex-col justify-center items-center overflow-hidden bg-[#050505] text-white py-16 lg:py-0 border-t border-white/5">
      {/* Self-contained styling for animations */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Live orb drift animations */
        @keyframes orb-drift-a {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(30px, -50px) scale(1.05); }
          66%  { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes orb-drift-b {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(-40px, 40px) scale(1.1); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes orb-drift-c {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(40px, -40px) scale(0.98); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes ray-sweep {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes float-bokeh-ts {
          0%   { transform: translateY(0px)   translateX(0px)  scale(1);    opacity: 0; }
          8%   { opacity: 0.4; }
          50%  { transform: translateY(-65px) translateX(18px) scale(1.2);  opacity: 0.55; }
          92%  { opacity: 0.15; }
          100% { transform: translateY(-130px) translateX(0px) scale(0.9); opacity: 0; }
        }
        @media (max-width: 1023px) {
          .mobile-reduce-motion {
            animation: none !important;
          }
        }
      `}</style>

      {/* Live Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

        {/* 1. Slow-drifting ambient orbs — orange (primary brand) */}
        <div
          style={{ animation: 'orb-drift-a 22s ease-in-out infinite' }}
          className="absolute left-[8%] top-[20%] w-[500px] h-[500px] bg-[#F27D26]/7 rounded-full blur-[130px] mobile-reduce-motion"
        />
        {/* orange secondary — bottom right */}
        <div
          style={{ animation: 'orb-drift-b 28s ease-in-out infinite 4s' }}
          className="absolute right-[6%] bottom-[18%] w-[420px] h-[420px] bg-[#C6904E]/6 rounded-full blur-[110px] mobile-reduce-motion"
        />
        {/* purple accent — top right */}
        <div
          style={{ animation: 'orb-drift-c 18s ease-in-out infinite 2s' }}
          className="absolute right-[20%] top-[10%] w-[340px] h-[340px] bg-purple-600/5 rounded-full blur-[100px] mobile-reduce-motion"
        />
        {/* purple accent — bottom left */}
        <div
          style={{ animation: 'orb-drift-a 25s ease-in-out infinite 8s' }}
          className="absolute left-[18%] bottom-[12%] w-[300px] h-[300px] bg-purple-500/4 rounded-full blur-[90px] mobile-reduce-motion"
        />

        {/* 2. Cinematic diagonal light ray — sweeps slowly left to right every 14s */}
        <div
          style={{ animation: 'ray-sweep 14s ease-in-out infinite 3s' }}
          className="absolute inset-y-0 left-0 w-[180px] bg-gradient-to-r from-transparent via-[#F27D26]/8 to-transparent mobile-reduce-motion"
        />
        {/* second subtler ray, offset timing */}
        <div
          style={{ animation: 'ray-sweep 18s ease-in-out infinite 9s' }}
          className="absolute inset-y-0 left-0 w-[120px] bg-gradient-to-r from-transparent via-purple-400/5 to-transparent mobile-reduce-motion"
        />

        {/* 3. Floating bokeh particles — site's signature live background effect */}
        {[
          { left: '7%',  top: '70%', size: 3.5, delay: 0,    dur: 18, orange: true  },
          { left: '18%', top: '55%', size: 2.5, delay: 3.2,  dur: 22, orange: false },
          { left: '31%', top: '80%', size: 4,   delay: 1.5,  dur: 16, orange: true  },
          { left: '45%', top: '65%', size: 2,   delay: 5.8,  dur: 20, orange: false },
          { left: '58%', top: '75%', size: 3,   delay: 2.4,  dur: 19, orange: true  },
          { left: '70%', top: '60%', size: 2.5, delay: 7.1,  dur: 24, orange: true  },
          { left: '82%', top: '72%', size: 3.5, delay: 0.8,  dur: 17, orange: false },
          { left: '12%', top: '40%', size: 2,   delay: 4.6,  dur: 21, orange: true  },
          { left: '62%', top: '45%', size: 3,   delay: 6.3,  dur: 23, orange: false },
          { left: '90%', top: '50%', size: 2.5, delay: 1.9,  dur: 15, orange: true  },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-0 blur-[0.5px]"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.orange ? '#F27D26' : '#C6904E',
              boxShadow: p.orange
                ? '0 0 6px rgba(242,125,38,0.35)'
                : '0 0 5px rgba(198,144,78,0.3)',
              animation: `float-bokeh-ts ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* 4. Scanline film-grain overlay — 2px lines, extremely subtle, cinematic feel */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.12) 2px, rgba(255,255,255,0.12) 4px)',
            backgroundSize: '100% 4px',
            animation: 'scanline-scroll 0.18s steps(1) infinite',
          }}
        />

        {/* 4. Radial vignette to keep edges very dark */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_95%)]" />
      </div>

      {/* Desktop scattered layout (lg and up) */}
      <div className="hidden lg:block absolute inset-0 w-full h-full z-10 pointer-events-none">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="testimonial-card-wrapper absolute pointer-events-auto hover:z-50 opacity-0"
            style={{
              left: item.position.left,
              right: item.position.right,
              top: item.position.top,
              bottom: item.position.bottom,
            }}
          >
            {/* Outer custom-glowing frame wrapper */}
            <div className="relative scale-65 xl:scale-80 2xl:scale-95 group origin-center">
              {/* Backglow blur */}
              <div className={`absolute -inset-2 rounded-lg blur-xl opacity-20 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none ${backGlowClasses[item.glow]}`} />
              
              {/* Glowing border ring */}
              <div className={`p-[1px] rounded-lg border transition-all duration-500 ${glowClasses[item.glow]}`}>
                <FlipCard data={item} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Central Content */}
      <div ref={textContainerRef} className="relative z-20 flex flex-col items-center text-center max-w-xl px-6 pointer-events-auto">
        {/* Testimonials Badge */}
        <div
          className="testimonial-badge lg:opacity-0 flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-mono tracking-widest uppercase mb-8 mt-8 md:mt-60 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
        >
          <Quote className="w-3.5 h-3.5 rotate-180" />
          <span>Testimonials</span>
        </div>

        {/* Title */}
        <h2
          className="testimonial-title lg:opacity-0 text-4xl sm:text-5xl font-lora font-bold leading-tight tracking-tight text-white mb-6"
        >
          Trusted by<br />
          <span className="text-[#F27D26] font-sans italic font-extrabold tracking-wide">
          various artists
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className="testimonial-desc lg:opacity-0 text-neutral-400 text-sm md:text-base leading-relaxed mb-10 max-w-md font-light"
        >
          Proud to collaborate with artists who push boundaries and inspire culture.
        </p>
      </div>

      {/* Mobile/Tablet card carousel layout (less than lg) */}
      <div className="testimonial-carousel-container lg:hidden w-full flex flex-col items-center gap-6 mt-16 relative z-10 px-4">
        {/* Main Slider Wrapper */}
        <div className="relative w-full max-w-md flex items-center justify-center">
          {/* Left Arrow */}
          <button 
            type="button"
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 z-30 p-2.5 rounded-full border border-white/10 bg-black/60 text-white hover:bg-black/80 hover:scale-105 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Track */}
          <div 
            className="w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex w-full transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {testimonials.map((item) => (
                <div 
                  key={`carousel-${item.id}`} 
                  className="w-full flex-shrink-0 flex justify-center items-center px-12 sm:px-16"
                >
                  <div className="scale-95 sm:scale-100 group relative">
                    {/* Backglow blur */}
                    <div className={`absolute -inset-2 rounded-lg blur-xl opacity-25 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none ${backGlowClasses[item.glow]}`} />
                    
                    {/* Glowing border ring */}
                    <div className={`p-[1px] rounded-lg border transition-all duration-500 ${glowClasses[item.glow]}`}>
                      <FlipCard data={item} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            type="button"
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 z-30 p-2.5 rounded-full border border-white/10 bg-[#050505]/60 text-white hover:bg-black/80 hover:scale-105 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Indicators / Progress Dot Navigation */}
        <div className="flex gap-2 mt-2 max-w-full overflow-x-auto py-2 px-4 scrollbar-none">
          {testimonials.map((testimonial, idx) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'bg-[#F27D26] w-5' : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
