/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { CreativeProcess } from './components/CreativeProcess';
import { TextExpandingSection } from './components/TextExpandingSection';

gsap.registerPlugin(ScrollTrigger);



export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white font-sans selection:bg-[#F27D26] selection:text-[#0A0A0A] overflow-x-hidden">
      <Hero />
      <CreativeProcess />
      <TextExpandingSection />
    </div>
  );
}
