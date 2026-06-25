import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll();
  
  // Add a spring smoothing to the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 180,
    mass: 0.5,
  });

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  
  // Transform progress directly into strokeDashoffset
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [circumference, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[90] flex items-center justify-center w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#F27D26]/40 hover:bg-[#F27D26]/10 text-white/70 hover:text-white shadow-lg hover:shadow-[0_0_20px_rgba(242,125,38,0.3)] transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* Circular Scroll Progress */}
          <svg className="absolute w-full h-full rotate-[-90deg]">
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-white/5"
              strokeWidth="2.5"
              fill="transparent"
            />
            <motion.circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-[#F27D26]"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Arrow Icon */}
          <ArrowUp className="w-5 h-5 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={1.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
