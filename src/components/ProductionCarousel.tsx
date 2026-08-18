import React, { useState, useRef } from 'react';
import { Play, Eye, ChevronLeft, ChevronRight, Video, Camera, Music, ExternalLink, Mic } from 'lucide-react';


interface ProductionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  year: string;
  tags: string[];
  link: string; // Direct external link
}

const shortFilms: ProductionItem[] = [
  {
    id: 'sf-1',
    title: 'The Silent Frame',
    subtitle: 'Narrative Short Film',
    image: '/images/Kv1.webp',
    year: '2025',
    tags: ['Director', 'DOP'],
    link: 'https://www.youtube.com/@Film_bykv',
  },
  {
    id: 'sf-2',
    title: 'Echoes of the Valley',
    subtitle: 'Dramatic Short Film',
    image: '/images/Kv2.webp',
    year: '2024',
    tags: ['Director'],
    link: 'https://www.youtube.com/@Film_bykv',
  },
  {
    id: 'sf-3',
    title: 'Lost in Translation',
    subtitle: 'Experimental Short Film',
    image: '/images/Kv3.webp',
    year: '2025',
    tags: ['Director', 'DOP'],
    link: 'https://www.youtube.com/@Film_bykv',
  },
  {
    id: 'sf-4',
    title: 'Midnight Monologue',
    subtitle: 'Noir Cinema Short',
    image: '/images/Kv4.webp',
    year: '2024',
    tags: ['DOP'],
    link: 'https://www.youtube.com/@Film_bykv',
  },
  {
    id: 'sf-5',
    title: 'Fading Shadows',
    subtitle: 'Psychological Thriller',
    image: '/images/Kv5.webp',
    year: '2025',
    tags: ['Director'],
    link: 'https://www.youtube.com/@Film_bykv',
  },
  {
    id: 'sf-6',
    title: 'Golden Hour',
    subtitle: 'Romantic Narrative',
    image: '/images/Kv6.webp',
    year: '2023',
    tags: ['Director', 'DOP'],
    link: 'https://www.youtube.com/@Film_bykv',
  },
];

const photography: ProductionItem[] = [
  {
    id: 'ph-1',
    title: 'Monochrome Whispers',
    subtitle: 'Street Portraiture',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800',
    year: '2025',
    tags: ['85mm Lens', 'B&W'],
    link: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600',
  },
  {
    id: 'ph-2',
    title: 'Neon Nostalgia',
    subtitle: 'Cyberpunk Aesthetic',
    image: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=800',
    year: '2024',
    tags: ['Anamorphic', 'Night'],
    link: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600',
  },
  {
    id: 'ph-3',
    title: 'Urban Solitude',
    subtitle: 'Architectural Shadows',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800',
    year: '2025',
    tags: ['Minimalist', '35mm'],
    link: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1600',
  },
  {
    id: 'ph-4',
    title: 'Desert Mirage',
    subtitle: 'Landscape Stills',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800',
    year: '2023',
    tags: ['Wide Angle', 'Day'],
    link: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600',
  },
  {
    id: 'ph-5',
    title: 'Faces of Dusk',
    subtitle: 'Golden Hour Portraits',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=800',
    year: '2024',
    tags: ['Natural Light'],
    link: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1600',
  },
  {
    id: 'ph-6',
    title: 'Cinematic Shadows',
    subtitle: 'Dramatic Chiaroscuro',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800',
    year: '2025',
    tags: ['High Contrast'],
    link: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600',
  },
];

const melody: ProductionItem[] = [
  {
    id: 'me-1',
    title: 'Ai Ithin Me Durin? "ඇයි ඉතින් මේ දුරින්"',
    subtitle: 'Jayss - Official Visualizer',
    image: 'https://img.youtube.com/vi/Be6NnLh7fBY/maxresdefault.jpg',
    year: '2026',
    tags: ['Director', 'DOP'],
    link: 'https://youtu.be/Be6NnLh7fBY?si=_IU2s_C-sSWEb0RB',
  },
  {
    id: 'hh-5',
    title: 'THARAKA x Kevin Smokio x Jayss - Nirwaane "නිර්වාණේ" (Official Music Video)',
    subtitle: 'THARAKA • Official Video',
    image: 'https://img.youtube.com/vi/DvHq-YSrG50/maxresdefault.jpg',
    year: '2026',
    tags: ['DOP'],
    link: 'https://youtu.be/DvHq-YSrG50?si=-vwijOP4KAKNSfng',
  },
];

const hiphop: ProductionItem[] = [
  {
    id: 'hh-1',
    title: 'Ramesses Reezy - ARAMUNA | Official M/V',
    subtitle: 'Ramesses Reezy • Official Video',
    image: 'https://img.youtube.com/vi/x3SsWMn1syU/maxresdefault.jpg',
    year: '2025',
    tags: ['Director', 'DOP'],
    link: 'https://youtu.be/x3SsWMn1syU?si=qmOpMcW05OBcIIkP',
  },
  {
    id: 'hh-2',
    title: 'KEEFA - නසරාණි (NASARANI) OFFICIAL MUSIC VIDEO',
    subtitle: 'ATTIDIYE PUGNGNARATHANA • Official Video',
    image: 'https://img.youtube.com/vi/yJQf2qDC8Nk/maxresdefault.jpg',
    year: '2026',
    tags: ['Director', 'DOP'],
    link: 'https://youtu.be/yJQf2qDC8Nk?si=suKGj77i0q6jHg8Z',
  },
  {
    id: 'hh-3',
    title: 'Keefa - Kollange Ath Udata (කොල්ලන්ගෙ අත් උඩට) | O.M.V',
    subtitle: 'Keefa • Official Video',
    image: 'https://img.youtube.com/vi/6HFdc6RPH3M/maxresdefault.jpg',
    year: '2026',
    tags: ['Director', 'DOP'],
    link: 'https://youtu.be/6HFdc6RPH3M?si=foBBhz9xV5I1DKD9',
  },
  {
    id: 'hh-4',
    title: 'Duke Ceylon - Andare (අන්දරේ) ft. Manasick & Master D',
    subtitle: 'Duke Ceylon • Official Video',
    image: 'https://img.youtube.com/vi/tCut7MoIEq8/maxresdefault.jpg',
    year: '2026',
    tags: ['DOP'],
    link: 'https://youtu.be/tCut7MoIEq8?si=k6VWsy87fM-_Y37h',
  },
  
];

type CategoryType = 'Melody' | 'Hiphop' | 'Short Films' | 'Photography';

export const ProductionCarousel = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Melody');
  const sliderRef = useRef<HTMLDivElement>(null);

  // Map category to items instantly without transitions for maximum GPU performance
  const activeItems = (() => {
    switch (activeCategory) {
      case 'Melody':
        return melody;
      case 'Hiphop':
        return hiphop;
      case 'Short Films':
        return shortFilms;
      case 'Photography':
        return photography;
      default:
        return melody;
    }
  })();

  const handleScroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="productions" className="relative py-20 md:py-28 bg-[#0A0A0A] overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#C6904E]/1.5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-[#F27D26]/1 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs md:text-sm tracking-[0.3em] font-semibold text-[#C6904E] uppercase block mb-3">
              CREATIVE WORKS
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide font-serif">
              Productions
            </h2>
          </div>

          {/* Navigation Controls (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 border border-white/10 hover:border-white/30 rounded-full bg-white/2 hover:bg-white/5 text-white/60 hover:text-white transition-all duration-300 transform-gpu"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 border border-white/10 hover:border-white/30 rounded-full bg-white/2 hover:bg-white/5 text-white/60 hover:text-white transition-all duration-300 transform-gpu"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-3 border-b border-white/5 pb-6 mb-8">
          {(['Melody', 'Hiphop'/*, 'Short Films', 'Photography'*/] as CategoryType[]).map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  // Reset scroll to start
                  if (sliderRef.current) {
                    sliderRef.current.scrollTo({ left: 0 });
                  }
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2 transform-gpu ${
                  isActive
                    ? 'bg-[#C6904E] text-[#0A0A0A] shadow-lg shadow-[#C6904E]/10 font-semibold'
                    : 'bg-white/2 border border-white/5 text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {category === 'Short Films' && <Video className="w-4 h-4" />}
                {category === 'Photography' && <Camera className="w-4 h-4" />}
                {category === 'Melody' && <Music className="w-4 h-4" />}
                {category === 'Hiphop' && <Mic className="w-4 h-4" />}
                {category}
              </button>
            );
          })}
        </div>

        {/* Carousel Snapping Slider container */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 w-full select-none scroll-smooth transform-gpu"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {activeItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-70 sm:w-[320px] md:w-95 shrink-0 snap-start relative group rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 aspect-16/10 cursor-pointer block"
            >
              {/* Card Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transform-gpu scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Dynamic Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-300" />

              {/* Tag Overlays */}
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-semibold tracking-wider text-white/90 bg-white/15 backdrop-blur-md px-2 py-1 rounded border border-white/5 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Play / View Hover Action Button (Using GPU accelerated properties) */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out transform-gpu shadow-xl">
                  {activeCategory === 'Photography' ? (
                    <Eye className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  )}
                </div>
              </div>

              {/* Card Details Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 z-20 flex flex-col justify-end text-left">
                <span className="text-[10px] text-[#C6904E] font-medium uppercase tracking-[0.15em] mb-1 block">
                  {item.subtitle}
                </span>
                <div className="flex justify-between items-end">
                  <h3 className="text-lg md:text-xl font-light tracking-wide text-white font-sans group-hover:text-[#C6904E] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="text-xs text-white/40 font-medium">
                    {item.year}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
