import React, { useRef } from 'react';
import { FlipCard } from '@/components/animate-ui/components/community/flip-card';
import { Quote } from 'lucide-react';
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
    id: 1,
    name: 'Jens Roger',
    username: 'Jensroger',
    image: '/images/jenesroger.webp',
    bio: 'Producer at Neon Edge Media. Kanishka has an exceptional eye for visual direction. His work transformed our campaign.',
    stats: { following: 142, followers: 12500, posts: 480 },
    socialLinks: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    glow: 'purple',
    position: { left: '3%', top: '10%', rotate: '-6deg' }
  },
  {
    id: 2,
    name: 'Marcus Miller',
    username: 'marcus_m',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    bio: 'Independent Artist. The music video he directed for us was absolutely cinematic. Masterclass in production.',
    stats: { following: 89, followers: 8400, posts: 120 },
    socialLinks: { github: 'https://github.com', twitter: 'https://twitter.com' },
    glow: 'orange',
    position: { left: '2%', bottom: '15%', rotate: '4deg' }
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
    position: { left: '14%', top: '5%', rotate: '8deg' }
  },
  {
    id: 4,
    name: 'David Kojo',
    username: 'david_k',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    bio: 'Creative Director at Echo. Stunning 8K visuals and meticulous post-production. A pleasure to work with.',
    stats: { following: 310, followers: 4800, posts: 190 },
    socialLinks: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    glow: 'purple',
    position: { left: '13%', bottom: '26%', rotate: '-4deg' }
  },
  {
    id: 5,
    name: 'Whitecapper',
    username: 'Whitecapper',
    image: '/images/whitecapper.webp',
    bio: 'Film Director. Exceptional grading, seamless VFX, and editing. Truly understood our film\'s core message.',
    stats: { following: 154, followers: 9800, posts: 310 },
    glow: 'blue',
    position: { left: '25%', top: '12%', rotate: '-2deg' }
  },
  {
    id: 6,
    name: 'Smokio',
    username: 'Kevinsmokio',
    image: '/images/smokio.webp',
    bio: 'Label Manager. Handled everything from pre-production casting to final delivery with unmatched style.',
    stats: { following: 95, followers: 11000 },
    socialLinks: { twitter: 'https://twitter.com' },
    glow: 'orange',
    position: { left: '35%', top: '4%', rotate: '5deg' }
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
    position: { right: '35%', top: '4%', rotate: '-5deg' }
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
    position: { right: '25%', top: '12%', rotate: '2deg' }
  },
  {
    id: 9,
    name: 'M',
    username: 'M',
    image: '#',
    bio: 'Brand Strategist. The aesthetics are state-of-the-art. Every shot was a work of art.',
    stats: { following: 110, followers: 5200 },
    glow: 'purple',
    position: { right: '13%', bottom: '26%', rotate: '4deg' }
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
    position: { right: '14%', top: '5%', rotate: '-8deg' }
  },
  {
    id: 11,
    name: 'Gabriel Diaz',
    username: 'gabriel_d',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop',
    bio: 'Agency CEO. Elevates campaigns to cinema standard. Will definitely work on future projects together.',
    stats: { following: 105, followers: 13500 },
    glow: 'orange',
    position: { right: '2%', bottom: '15%', rotate: '-4deg' }
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
    position: { right: '3%', top: '10%', rotate: '6deg' }
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

  // Split mock testimonials into two rows for mobile marquee
  const row1 = testimonials.slice(0, 6);
  const row2 = testimonials.slice(6, 12);

  useGSAP(() => {
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
          // Even indices move from left, odd indices from right to converge to center
          return i % 2 === 0 ? -150 : 150;
        },
        y: (i) => {
          // Top row items move from above, bottom row from below
          return i < 6 ? -100 : 100;
        },
        rotation: (i) => {
          // Exaggerate rotation slightly on start, resolve to position rotation
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

    // 3. Mobile marquee entrance
    gsap.fromTo(".testimonial-marquee-container",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="testimonials" ref={sectionRef} className="relative w-full min-h-[750px] lg:h-screen lg:min-h-[900px] flex flex-col justify-center items-center overflow-hidden bg-[#050505] text-white py-16 lg:py-0 border-t border-white/5">
      {/* Self-contained styling for animations */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-l {
          display: flex;
          width: max-content;
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-r {
          display: flex;
          width: max-content;
          animation: marquee-right 40s linear infinite;
        }
        .animate-marquee-l:hover, .animate-marquee-r:hover {
          animation-play-state: paused;
        }
        /* Live orb drift animations */
        @keyframes orb-drift-a {
          0%   { transform: translate(0px, 0px) scale(1);   opacity: 0.45; }
          33%  { transform: translate(60px, -40px) scale(1.08); opacity: 0.6; }
          66%  { transform: translate(-30px, 50px) scale(0.95); opacity: 0.4; }
          100% { transform: translate(0px, 0px) scale(1);   opacity: 0.45; }
        }
        @keyframes orb-drift-b {
          0%   { transform: translate(0px, 0px) scale(1);   opacity: 0.35; }
          40%  { transform: translate(-50px, 40px) scale(1.06); opacity: 0.5; }
          75%  { transform: translate(40px, -30px) scale(0.97); opacity: 0.3; }
          100% { transform: translate(0px, 0px) scale(1);   opacity: 0.35; }
        }
        @keyframes orb-drift-c {
          0%   { transform: translate(0px, 0px) scale(1);   opacity: 0.3; }
          50%  { transform: translate(35px, 55px) scale(1.1);  opacity: 0.5; }
          100% { transform: translate(0px, 0px) scale(1);   opacity: 0.3; }
        }
        /* Cinematic diagonal light ray sweep */
        @keyframes ray-sweep {
          0%   { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          10%  { opacity: 0.06; }
          50%  { opacity: 0.09; }
          90%  { opacity: 0.06; }
          100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
        }
        /* Subtle scanline flicker */
        @keyframes scanline-scroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        /* Floating bokeh particles — same as CreativeProcess & TextExpandingSection */
        @keyframes float-bokeh-ts {
          0%   { transform: translateY(0px)   translateX(0px)  scale(1);    opacity: 0; }
          8%   { opacity: 0.4; }
          50%  { transform: translateY(-65px) translateX(18px) scale(1.2);  opacity: 0.55; }
          92%  { opacity: 0.15; }
          100% { transform: translateY(-130px) translateX(0px) scale(0.9); opacity: 0; }
        }
      `}</style>

      {/* Live Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

        {/* 1. Slow-drifting ambient orbs — orange (primary brand) */}
        <div
          style={{ animation: 'orb-drift-a 22s ease-in-out infinite' }}
          className="absolute left-[8%] top-[20%] w-[500px] h-[500px] bg-[#F27D26]/7 rounded-full blur-[130px]"
        />
        {/* orange secondary — bottom right */}
        <div
          style={{ animation: 'orb-drift-b 28s ease-in-out infinite 4s' }}
          className="absolute right-[6%] bottom-[18%] w-[420px] h-[420px] bg-[#C6904E]/6 rounded-full blur-[110px]"
        />
        {/* purple accent — top right */}
        <div
          style={{ animation: 'orb-drift-c 18s ease-in-out infinite 2s' }}
          className="absolute right-[20%] top-[10%] w-[340px] h-[340px] bg-purple-600/5 rounded-full blur-[100px]"
        />
        {/* purple accent — bottom left */}
        <div
          style={{ animation: 'orb-drift-a 25s ease-in-out infinite 8s' }}
          className="absolute left-[18%] bottom-[12%] w-[300px] h-[300px] bg-purple-500/4 rounded-full blur-[90px]"
        />

        {/* 2. Cinematic diagonal light ray — sweeps slowly left to right every 14s */}
        <div
          style={{ animation: 'ray-sweep 14s ease-in-out infinite 3s' }}
          className="absolute inset-y-0 left-0 w-[180px] bg-gradient-to-r from-transparent via-[#F27D26]/8 to-transparent"
        />
        {/* second subtler ray, offset timing */}
        <div
          style={{ animation: 'ray-sweep 18s ease-in-out infinite 9s' }}
          className="absolute inset-y-0 left-0 w-[120px] bg-gradient-to-r from-transparent via-purple-400/5 to-transparent"
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
          className="testimonial-badge opacity-0 flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-mono tracking-widest uppercase mb-8 mt-8 md:mt-60 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
        >
          <Quote className="w-3.5 h-3.5 rotate-180" />
          <span>Testimonials</span>
        </div>

        {/* Title */}
        <h2
          className="testimonial-title opacity-0 text-4xl sm:text-5xl font-lora font-bold leading-tight tracking-tight text-white mb-6"
        >
          Trusted by<br />
          <span className="text-[#F27D26] font-sans italic font-extrabold tracking-wide">
          various artists
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className="testimonial-desc opacity-0 text-neutral-400 text-sm md:text-base leading-relaxed mb-10 max-w-md font-light"
        >
          Proud to collaborate with artists who push boundaries and inspire culture.
        </p>
      </div>

      {/* Mobile/Tablet slider / marquee layout (less than lg) */}
      <div className="testimonial-marquee-container opacity-0 lg:hidden w-full flex flex-col gap-6 mt-16 overflow-hidden relative z-10">
        {/* Row 1 - scrolling left */}
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-l">
            {/* Render items twice for infinite loop */}
            {[...row1, ...row1].map((item, idx) => (
              <div key={`row1-${item.id}-${idx}`} className="mx-3 scale-90 sm:scale-95 group">
                <div className={`p-[1px] rounded-lg border transition-all duration-500 ${glowClasses[item.glow]}`}>
                  <FlipCard data={item} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - scrolling right */}
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-r">
            {/* Render items twice for infinite loop */}
            {[...row2, ...row2].map((item, idx) => (
              <div key={`row2-${item.id}-${idx}`} className="mx-3 scale-90 sm:scale-95 group">
                <div className={`p-[1px] rounded-lg border transition-all duration-500 ${glowClasses[item.glow]}`}>
                  <FlipCard data={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
