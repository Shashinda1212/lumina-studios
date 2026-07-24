import React from 'react';
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
];

export const CylinderSection = () => {
  return (
    <section className="pt-8 pb-2 bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F27D26]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full z-10 -mx-4 md:mx-0 overflow-hidden" style={{ minHeight: '400px' }}>
        <CylinderCarousel 
          images={carouselImages} 
          cardWidth={250}
          className="w-full h-full min-h-[400px]"
          style={{
            perspective: "1200px",
            "--translate-z": "304px",
            maskImage: "linear-gradient(90deg, transparent, #000 15% 85%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 15% 85%, transparent)"
          } as React.CSSProperties}
        />
      </div>
    </section>
  );
};
