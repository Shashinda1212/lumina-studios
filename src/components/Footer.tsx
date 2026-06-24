import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, Mail, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col justify-between gap-6">
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
              <span className="text-[9px] uppercase tracking-widest text-white/80">Available Worldwide</span>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#CE5D01] mb-2">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Projects', href: '#projects' },
                { name: 'Services', href: '#services' },
                { name: 'About Me', href: '#about' },
                { name: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs text-white/60 hover:text-white hover:shadow-[0_0_10px_rgba(206,93,1,0.2)] focus:text-white transition-all duration-300 relative group py-1 block w-fit"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#CE5D01] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Social Links & Contact Intro */}
          <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-6">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#CE5D01] mb-4">
                Connect
              </h4>
              <div className="flex items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="p-2.5 border border-white/10 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="p-2.5 border border-white/10 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300"
                  aria-label="Vimeo"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22.396 7.164c-.093 2.026-1.507 4.8-4.245 8.32C15.323 19.16 12.93 21 10.97 21c-1.214 0-2.24-1.12-3.08-3.36-.56-2.052-1.119-4.1-1.68-6.15-.653-2.332-1.306-3.498-1.959-3.498-.186 0-.933.653-2.24 1.959L.702 8.547c1.493-1.4 3.08-2.986 4.76-4.76 2.052-1.96 3.64-2.94 4.76-2.94 1.96 0 3.172 1.306 3.64 3.92.373 2.24.653 3.92.84 5.039.466 2.613 1.026 3.92 1.68 3.92.466 0 1.213-.653 2.24-1.959 1.119-1.307 1.772-2.333 1.959-3.08.374-1.306-.093-1.96-1.4-1.96-.56 0-1.12.093-1.68.28 1.12-3.64 3.36-5.46 6.72-5.46 2.425 0 3.545 1.12 3.358 3.36z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="p-2.5 border border-white/10 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="p-2.5 border border-white/10 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" strokeWidth={1.5} />
                </motion.a>
              </div>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="mt-2 text-[10px] uppercase tracking-widest text-white/60 hover:text-[#CE5D01] flex items-center gap-2 group w-fit cursor-pointer transition-colors duration-300"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Bar Separator */}
        <motion.div variants={itemVariants} className="border-t border-white/10 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/40 tracking-wider text-center md:text-left">
            &copy; {new Date().getFullYear()} Kanishka Viduranga. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[10px] text-white/40 hover:text-white hover:underline transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[10px] text-white/40 hover:text-white hover:underline transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};
