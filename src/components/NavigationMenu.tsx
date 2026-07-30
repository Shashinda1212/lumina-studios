import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Youtube, Mail, Phone, Linkedin, Facebook } from 'lucide-react';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      type: 'tween' as const,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  exit: {
    x: '100%',
    transition: {
      type: 'tween' as const,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CLIENTS', href: '#testimonials' },
  { name: 'CONTACT', href: '#contact' },
];

export const NavigationMenu = ({ isOpen, onClose }: NavigationMenuProps) => {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            role="presentation"
            aria-hidden="true"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Sidebar Drawer Container */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-[101] w-full sm:w-[450px] bg-black/95 backdrop-blur-md border-l border-white/10 flex flex-col justify-between p-8 sm:p-12 text-white shadow-2xl"
          >
            {/* Header / Close Button */}
            <div className="flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-semibold">
                Navigation Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-2 border border-white/10 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-6 sm:gap-8 my-auto">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={linkVariants}
                  className="overflow-hidden"
                >
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    whileHover={{ x: 12, color: '#CE5D01' }}
                    transition={{ type: 'tween' as const, duration: 0.3, ease: 'easeOut' as const }}
                    className="inline-block text-3xl sm:text-4xl lg:text-5xl font-black tracking-[0.15em] text-white/70 hover:text-white uppercase transition-colors duration-300"
                  >
                    {link.name}
                  </motion.a>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Content / Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-8 pt-8 border-t border-white/5"
            >
              {/* Quick Contacts */}
              <div className="space-y-3">
                <a
                  href="mailto:hello@luminastudios.com"
                  className="flex items-center gap-3 text-xs text-white/60 hover:text-[#CE5D01] transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                  <span>hello@luminastudios.com</span>
                </a>
                <a
                  href="tel:+94766004462"
                  className="flex items-center gap-3 text-xs text-white/60 hover:text-[#CE5D01] transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  <span>+94 76 600 4462</span>
                </a>
              </div>

              {/* Socials & Available Badge */}
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/kanishka-viduranga-a36990376/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-2 border border-white/10 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300 group"
                  >
                    <Linkedin className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>

                  <a
                    href="https://www.facebook.com/film.by.kv.1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Page"
                    className="p-2 border border-white/10 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300 group"
                  >
                    <Facebook className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://www.youtube.com/@Film_bykv"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube Channel"
                    className="p-2 border border-white/10 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300 group"
                  >
                    <Youtube className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://www.instagram.com/kv___production/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Profile"
                    className="p-2 border border-white/10 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300 group"
                  >
                    <Instagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                </div>

                <div className="flex items-center space-x-2 opacity-60">
                  <div className="w-1.5 h-1.5 bg-[#CE5D01] rounded-full animate-pulse shadow-[0_0_6px_rgba(206,93,1,0.8)]"></div>
                  <span className="text-[8px] uppercase tracking-widest text-white/80">Available Now</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
