import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { CreativeProcess } from './components/CreativeProcess';
import { TextExpandingSection } from './components/TextExpandingSection';
import FlipFadeText from './components/ui/flip-fade-text';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    // Preload video as a blob to cache it entirely before playing
    const xhr = new XMLHttpRequest();
    // Use .webm as it is smaller and already used in Hero, can be changed to .mp4 if needed
    xhr.open('GET', '/background2.webm', true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setVideoProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const videoBlob = xhr.response;
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoSrc(videoUrl);
        setVideoLoaded(true);
        setVideoProgress(100);
      } else {
        // Fallback
        setVideoSrc('/background2.webm');
        setVideoLoaded(true);
        setVideoProgress(100);
      }
    };

    xhr.onerror = () => {
      // Fallback on error
      setVideoSrc('/background2.webm');
      setVideoLoaded(true);
      setVideoProgress(100);
    };

    xhr.send();

    return () => xhr.abort();
  }, []);

  useEffect(() => {
    // Unmount loading screen only when video is 100% ready
    // Added a small delay so the user can see it hit 100% briefly
    if (videoLoaded) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [videoLoaded]);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    const scrollUpdate = () => ScrollTrigger.update();
    lenis.on('scroll', scrollUpdate);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, [loading]);

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white font-sans selection:bg-[#F27D26] selection:text-[#0A0A0A] overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -80,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden"
          >
            {/* Dynamic ambient highlight leak */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#F27D26]/5 rounded-full blur-[90px] pointer-events-none" />

            <FlipFadeText
              words={["INITIALIZING", "LOADING ASSETS", "PREPARING SCENE", "READY"]}
              interval={800} // Slightly slower to match actual loading better
              textClassName="text-3xl sm:text-5xl lg:text-6xl font-black font-jetbrains tracking-[0.25em] text-white selection:bg-transparent"
              letterDuration={0.35}
              staggerDelay={0.03}
              exitStaggerDelay={0.015}
            />

            {/* Loading Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-24 text-[#F27D26] font-mono text-lg tracking-[0.2em] font-bold"
            >
              {videoProgress}%
            </motion.div>

            {/* Subtitle brand message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-12 font-mono text-[9px] uppercase tracking-[0.45em] text-neutral-400 select-none"
            >
              Engineered for Impact
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Pass the cached blob URL directly to Hero */}
            <Hero videoSrc={videoSrc} />
            <CreativeProcess />
            <TextExpandingSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
