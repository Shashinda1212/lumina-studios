import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { CylinderSection } from './components/CylinderSection';
import { CreativeProcess } from './components/CreativeProcess';
import { TextExpandingSection } from './components/TextExpandingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { CursorTracker } from './components/ui/CursorTracker';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Lock body scroll while preloader runs
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <div className="dark min-h-screen w-full bg-[#0A0A0A] text-white font-sans selection:bg-[#F27D26] selection:text-[#0A0A0A] overflow-x-hidden">
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
      >
        <Hero videoSrc="/background2.webm" />
        <CylinderSection />
        <CreativeProcess />
        <TextExpandingSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <ScrollToTop />
        <CursorTracker />
      </motion.div>
    </div>
  );
}

