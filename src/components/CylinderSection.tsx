import React, { useState, useEffect } from 'react';
import { CylinderCarousel } from './ui/cylinder-carousel';

const baseImages = [
  { src: '/images/Kv1.webp', alt: 'KV 1' },
  { src: '/images/Kv2.webp', alt: 'KV 2' },
  { src: '/images/Kv3.webp', alt: 'KV 3' },
  { src: '/images/Kv4.webp', alt: 'KV 4' },
  { src: '/images/Kv5.webp', alt: 'KV 5' },
  { src: '/images/Kv6.webp', alt: 'KV 6' },
  
];

const carouselImages = [
  ...baseImages,
  ...baseImages,
  ...baseImages,
  ...baseImages
].map((img, index) => ({
  ...img,
  id: `carousel-${img.src}-${index}`
}));

// For mobile 2D marquee, we duplicate enough to fill the screen and loop seamlessly
const mobileImages = [...baseImages, ...baseImages, ...baseImages].map((img, index) => ({
  ...img,
  id: `mobile-${img.src}-${index}`
}));

export const CylinderSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="pt-8 pb-2 bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center relative min-h-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-[#F27D26]/2 rounded-full blur-[120px] pointer-events-none" />

      {/* Fake mask gradients to blend the edges */}
      <div className="absolute inset-y-0 left-0 w-[15%] md:w-[20%] bg-linear-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[15%] md:w-[20%] bg-linear-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20 pointer-events-none" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mobileMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />

      {isMounted && (
        isMobile ? (
          /* HIGH PERFORMANCE 2D MARQUEE FOR MOBILE (100% Lag Free) */
          <div className="w-full relative z-10 overflow-hidden py-10 flex items-center transform-gpu" style={{ transform: 'translateZ(0)' }}>
            <div 
              className="flex w-max items-center gap-4 animate-[mobileMarquee_45s_linear_infinite]"
              style={{ willChange: 'transform' }}
            >
              {mobileImages.map((img) => (
                <img
                  key={`${img.id}-loop1`}
                  src={img.src}
                  alt={img.alt}
                  className="w-40 sm:w-50 aspect-7/10 object-cover rounded-xl shadow-lg border border-white/5 shrink-0 bg-neutral-900/50"
                  loading="eager"
                  decoding="async"
                />
              ))}
              {/* Duplicate array for seamless infinite looping */}
              {mobileImages.map((img) => (
                <img
                  key={`${img.id}-loop2`}
                  src={img.src}
                  alt={img.alt}
                  className="w-40 sm:w-50 aspect-7/10 object-cover rounded-xl shadow-lg border border-white/5 shrink-0 bg-neutral-900/50"
                  loading="eager"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        ) : (
          /* HEAVY 3D CYLINDER FOR DESKTOP */
          <div className="w-full z-10 -mx-4 md:mx-0 overflow-hidden transform-gpu relative" style={{ minHeight: '400px', transform: 'translateZ(0)' }}>
            <CylinderCarousel 
              images={carouselImages} 
              cardWidth={250}
              className="w-full h-full min-h-100 transform-gpu"
              style={{
                perspective: "1200px",
                "--translate-z": "304px",
              } as React.CSSProperties}
            />
          </div>
        )
      )}
    </section>
  );
};
