import React from 'react';
import { motion } from 'framer-motion';
import { AvatarGroup, AvatarGroupTooltip } from '@/components/animate-ui/components/animate/avatar-group';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/animate-ui/components/animate/avatar';
const AVATARS = [
  {
    src: '/images/smokio.webp',
    fallback: 'SM',
    tooltip: 'Smokio',
  },
  {
    src: '/images/reezy.webp',
    fallback: 'RZ',
    tooltip: 'Reezy',
  },
  {
    src: '/images/keefa.webp',
    fallback: 'KF',
    tooltip: 'Keefa',
  },
  {
    src: '/images/manasick.webp',
    fallback: 'MS',
    tooltip: 'Manasick',
  },
  {
    src: '/images/masterd.webp',
    fallback: 'MD',
    tooltip: 'MasterD',
  },
  {
    src: '/images/whitecapper.webp',
    fallback: 'WC',
    tooltip: 'Whitecapper',
  },
  {
    src: '/images/jenesroger.webp',
    fallback: 'JR',
    tooltip: 'JenesRoger',
  },
  {
    src: '/images/suwahas.webp',
    fallback: 'SK',
    tooltip: 'Suwahas',
  }
];

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <footer className="relative w-full bg-black text-white pt-20 pb-10 px-6 md:px-16 lg:px-32 xl:px-48 border-t border-white/10 overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-[#CE5D01]/3 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16">
          {/* Column 1: Brand Info */}
          <motion.div variants={itemVariants} className="md:col-span-12 lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <span className="text-sm font-bold tracking-[0.4em] uppercase block mb-4">
                KANISHKA VIDURANGA
              </span>
              <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                Engineering visual narratives that capture, connect, and endure. Crafting cinematic films, music videos, and creative productions globally.
              </p>
            </div>
            {/* Ambient available badge in footer */}
            <div className="flex items-center space-x-2 opacity-50">
              <div className="w-1.5 h-1.5 bg-[#CE5D01] rounded-full animate-pulse shadow-[0_0_6px_rgba(206,93,1,0.8)]"></div>
              <span className="text-sm uppercase tracking-widest text-white/80">Available Worldwide</span>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-sm uppercase tracking-[0.3em] font-semibold text-[#CE5D01] mb-2">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Projects', href: '#projects' },
                { name: 'Clients', href: '#testimonials' },
                { name: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white hover:shadow-[0_0_10px_rgba(206,93,1,0.2)] focus:text-white transition-all duration-300 relative group py-1 block w-fit"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#CE5D01] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Social Links & Contact Intro */}
          <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-3 flex flex-col gap-6">
            <div>
              <h4 className="text-sm uppercase tracking-[0.3em] font-semibold text-[#CE5D01] mb-4">
                TRUSTED BY
              </h4>
              <AvatarGroup>
                {AVATARS.map((avatar, index) => (
                  <Avatar key={index} className="border-2 border-black cursor-pointer">
                    <AvatarImage src={avatar.src} alt={avatar.tooltip} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                    <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
                  </Avatar>
                ))}
              </AvatarGroup>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar Separator */}
        <motion.div variants={itemVariants} className="border-t border-white/10 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[15px] text-white/40 tracking-wider text-center md:text-left">
            &copy; {new Date().getFullYear()} Kanishka Viduranga. All rights reserved.
          </p>

          <p className="text-[15px] text-white/40 tracking-wider text-center">
            Designed & Developed by{' '}
            <a
              href="https://rc-website-52f60.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-[#CE5D01]"
            >
              Royal Codex
            </a>
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[15px] text-white/40 hover:text-white hover:underline transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[15px] text-white/40 hover:text-white hover:underline transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};
