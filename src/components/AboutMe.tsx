import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Film } from 'lucide-react';

export const AboutMe = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number], // easeOutCubic
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // easeOutExpo
      },
    },
  };

  return (
    <section id="about" className="relative py-20 md:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Premium Cinematic Background Glows */}
      <div className="absolute top-1/4 left-0 w-75 md:w-125 h-75 md:h-125 bg-[#C6904E]/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-75 md:w-150 h-75 md:h-150 bg-[#F27D26]/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column: Cinematic Portrait */}
          <motion.div
            className="lg:col-span-5 flex justify-center w-full"
            variants={imageVariants}
          >
            <div className="relative w-full max-w-md lg:max-w-none group">
              {/* Outer soft glow border */}
              <div className="absolute -inset-1 bg-linear-to-tr from-[#F27D26]/30 via-transparent to-[#C6904E]/30 rounded-2xl md:rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

              {/* Main image container */}
              <div className="relative aspect-4/5 sm:aspect-3/4 lg:aspect-4/5 rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
                <img
                  src="/images/aboutus.webp"
                  alt="KV - Director Portrait"
                  className="w-full h-full object-cover object-center contrast-[1.05] brightness-[0.95] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                />

                {/* Overlay vignette */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20 pointer-events-none transition-opacity duration-500 group-hover:opacity-60" />

                {/* Director Label overlay inside image */}
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="text-[10px] tracking-[0.25em] text-[#C6904E] font-medium uppercase bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                    EST. SRI LANKA
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Content */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            variants={containerVariants}
          >
            {/* Component Header / Tagline */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
              <span className="text-xs md:text-sm tracking-[0.3em] font-semibold text-[#C6904E] uppercase">
                KV — Director
              </span>
            </motion.div>

            {/* Intro text */}
            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed font-serif"
            >
              I'm a Sri Lankan film director and visual storyteller driven by a passion for
              cinematic storytelling, powerful visuals, and authentic human experiences.
            </motion.h3>

            {/* Body paragraph 1 */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-white/70 text-base md:text-lg leading-relaxed font-sans font-light"
            >
              My work explores stories through a distinctive visual language, blending emotion, atmosphere,
              composition, and performance to create immersive screen experiences. From independent films to
              music videos and visual productions, I approach every project with a director’s
              eye and a strong focus on storytelling.
            </motion.p>

            {/* Body paragraph 2 */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-white/70 text-base md:text-lg leading-relaxed font-sans font-light"
            >
              As a filmmaker, I continue to develop my voice through bold ideas, cinematic imagery,
              and stories that connect with audiences.
            </motion.p>

            {/* Stylized highlight footer card */}
            <motion.div
              variants={itemVariants}
              className="mt-10 p-5 md:p-6 bg-white/2 border border-white/5 rounded-2xl md:rounded-3xl backdrop-blur-md hover:bg-white/4 transition-all duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Location item */}
                <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                  <div className="p-3 bg-[#F27D26]/10 rounded-xl">
                    <MapPin className="w-5 h-5 text-[#F27D26]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] tracking-wider text-white/40 uppercase">Location</h4>
                    <p className="text-sm md:text-base font-medium text-white">Based in Sri Lanka</p>
                  </div>
                </div>

                {/* Scope item */}
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#C6904E]/10 rounded-xl">
                    <Film className="w-5 h-5 text-[#C6904E]" />
                  </div>
                  <div>
                    <h4 className="text-[10px] tracking-wider text-white/40 uppercase">Core Focus</h4>
                    <p className="text-sm md:text-base font-medium text-white">Film, Music Videos & Visuals</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
