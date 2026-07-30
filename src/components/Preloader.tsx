import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const statusLogs = [
  'INITIALIZING OPTICAL SENSORS...',
  'CALIBRATING REEL SENSORS...',
  'IMPORTING RAW CINEMATIC ASSETS...',
  'BUFFERING 4K FOOTAGE SEQUENCE...',
  'APPLYING COLOR GRADIENT (REC.709)...',
  'STABILIZING THREE-AXIS GIMBAL...',
  'STANDBY (CAMERA ACTIVE)...'
];

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [logIndex, setLogIndex] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [isClapping, setIsClapping] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showClapper, setShowClapper] = useState(false);
  const [clapped, setClapped] = useState(false);
  
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const svgProgressRef = useRef<SVGCircleElement>(null);
  
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const startTimeRef = useRef(0);

  // Precise 3-second timeline before the Action clap
  useEffect(() => {
    let animFrame: number;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;

      if (elapsed < 2500) {
        // 1. Countdown and loading progress (0 to 2.5s)
        const pct = (elapsed / 2500) * 100;
        
        // Update DOM directly to avoid 60fps React re-renders of the entire component
        if (progressBarRef.current) progressBarRef.current.style.width = `${pct}%`;
        if (progressTextRef.current) progressTextRef.current.innerText = `${pct.toFixed(0)}% SECURE`;
        if (svgProgressRef.current) {
          svgProgressRef.current.style.strokeDashoffset = String(270 - (270 * pct) / 100);
        }
        
        const logIdx = Math.min(
          statusLogs.length - 2, // Keep last log for standby phase
          Math.floor((pct / 100) * (statusLogs.length - 1))
        );
        setLogIndex(logIdx);

        // Countdown ticks: 5, 4, 3, 2, 1 (500ms per number)
        const currentCount = 5 - Math.floor(elapsed / 500);
        setCountdown(Math.max(1, currentCount));
        
        animFrame = requestAnimationFrame(tick);
      } else if (elapsed < 2850) {
        // 2. Reveal open clapperboard (2.5s to 2.85s)
        if (progressBarRef.current) progressBarRef.current.style.width = '100%';
        if (progressTextRef.current) progressTextRef.current.innerText = '100% SECURE';
        if (svgProgressRef.current) svgProgressRef.current.style.strokeDashoffset = '0';
        
        setLogIndex(statusLogs.length - 1); // "STANDBY"
        setShowClapper(true);
        
        animFrame = requestAnimationFrame(tick);
      } else if (elapsed < 3000) {
        // 3. Clapperboard arm slams shut (2.85s to 3.0s)
        setIsClapping(true);
        
        animFrame = requestAnimationFrame(tick);
      } else {
        // 4. Hit mark (Exactly at 3.0s)
        setClapped(true);
        
        // Pause briefly for high-impact action, then run exit iris wipe
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 1200); // wait for iris mask transition
        }, 500);
      }
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  // Performance Optimization: Update timecode directly in DOM to bypass React re-renders at 24 FPS
  useEffect(() => {
    startTimeRef.current = Date.now();
    const updateTimecode = () => {
      if (isExiting) return;

      const elapsed = Date.now() - startTimeRef.current;
      const totalFrames = Math.floor(elapsed / (1000 / 24));
      
      const frames = String(totalFrames % 24).padStart(2, '0');
      const seconds = String(Math.floor(totalFrames / 24) % 60).padStart(2, '0');
      const minutes = String(Math.floor(totalFrames / (24 * 60)) % 60).padStart(2, '0');
      const hours = String(Math.floor(totalFrames / (24 * 60 * 60)) % 24).padStart(2, '0');
      
      if (timecodeRef.current) {
        timecodeRef.current.innerText = `TC ${hours}:${minutes}:${seconds}:${frames}`;
      }
      frameRef.current = requestAnimationFrame(updateTimecode);
    };

    frameRef.current = requestAnimationFrame(updateTimecode);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isExiting]);

  return (
    <>
      {/* SVG Iris Mask Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <mask id="shutter-mask" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="white" />
            <motion.circle
              cx="0.5"
              cy="0.5"
              initial={{ r: 0 }}
              animate={isExiting ? { r: 1.5 } : { r: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              fill="black"
            />
          </mask>
        </defs>
      </svg>

      <div
        className={`fixed inset-0 z-[9999] bg-[#070707] text-[#D8D8D8] font-mono select-none overflow-hidden flex flex-col justify-between p-6 md:p-10 transform-gpu desktop-mask transition-opacity duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isExiting ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}
      >
        {/* Custom Styles for high-performance visual effects (Hardware Accelerated) */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 768px) {
            .desktop-mask {
              mask-image: url(#shutter-mask);
              -webkit-mask-image: url(#shutter-mask);
              will-change: mask-image, -webkit-mask-image;
            }
          }
          @keyframes vu-bounce-1 { 0%, 100% { height: 20%; } 50% { height: 80%; } }
          @keyframes vu-bounce-2 { 0%, 100% { height: 15%; } 50% { height: 95%; } }
          @keyframes vu-bounce-3 { 0%, 100% { height: 30%; } 50% { height: 60%; } }
          @keyframes vu-bounce-4 { 0%, 100% { height: 40%; } 50% { height: 75%; } }
          
          .vu-bar {
            will-change: height;
            transform: translate3d(0,0,0);
          }
          .vu-anim-1 { animation: vu-bounce-1 0.7s ease-in-out infinite; }
          .vu-anim-2 { animation: vu-bounce-2 0.5s ease-in-out infinite; animation-delay: 0.1s; }
          .vu-anim-3 { animation: vu-bounce-3 0.9s ease-in-out infinite; animation-delay: 0.25s; }
          .vu-anim-4 { animation: vu-bounce-4 0.6s ease-in-out infinite; animation-delay: 0.15s; }
          .vu-anim-5 { animation: vu-bounce-1 0.8s ease-in-out infinite; animation-delay: 0.3s; }
          .vu-anim-6 { animation: vu-bounce-2 0.4s ease-in-out infinite; animation-delay: 0.05s; }
          .vu-anim-7 { animation: vu-bounce-3 0.75s ease-in-out infinite; animation-delay: 0.2s; }
          .vu-anim-8 { animation: vu-bounce-4 0.65s ease-in-out infinite; animation-delay: 0.35s; }

          /* Static scanlines (requires 0 GPU repaints after initial paint) */
          .scanlines-overlay {
            background: linear-gradient(
              rgba(18, 16, 16, 0) 50%,
              rgba(0, 0, 0, 0.25) 50%
            ), linear-gradient(
              90deg,
              rgba(255, 0, 0, 0.03),
              rgba(0, 255, 0, 0.01),
              rgba(0, 0, 255, 0.03)
            );
            background-size: 100% 4px, 6px 100%;
          }
        `}} />

        {/* High-Performance Screen overlays */}
        <div className="absolute inset-0 scanlines-overlay pointer-events-none z-10 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.75)_100%)] pointer-events-none z-10" />

        {/* Viewfinder Corners (Crop Lines) */}
        <div className="absolute top-8 left-8 border-t-[1.5px] border-l-[1.5px] border-white/20 w-6 h-6 pointer-events-none" />
        <div className="absolute top-8 right-8 border-t-[1.5px] border-r-[1.5px] border-white/20 w-6 h-6 pointer-events-none" />
        <div className="absolute bottom-8 left-8 border-b-[1.5px] border-l-[1.5px] border-white/20 w-6 h-6 pointer-events-none" />
        <div className="absolute bottom-8 right-8 border-b-[1.5px] border-r-[1.5px] border-white/20 w-6 h-6 pointer-events-none" />

        {/* Top HUD Row */}
        <div className="flex justify-between items-center z-20 text-xs md:text-sm text-white/55 tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="font-bold text-white tracking-widest">REC</span>
          </div>
          <div className="hidden sm:block text-[10px] md:text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase tracking-[0.2em]">
            2.39:1 CINEMASCOPE
          </div>
          <span 
            ref={timecodeRef}
            className="font-mono text-white/95 tabular-nums tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded"
          >
            TC 00:00:00:00
          </span>
        </div>

        {/* Middle Interactive Zone */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-20 my-6">
          <AnimatePresence mode="wait">
            {!showClapper ? (
              // Stage 1: Cinematic Countdown
              <motion.div
                key="countdown"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="relative w-44 h-44 md:w-52 md:h-52 flex items-center justify-center transform-gpu"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Radial sweep outer rings */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="47%"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.04)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="#F27D26"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    className="opacity-30 animate-[spin_60s_linear_infinite]"
                  />
                  <circle
                    ref={svgProgressRef}
                    cx="50%"
                    cy="50%"
                    r="43%"
                    fill="none"
                    stroke="#C6904E"
                    strokeWidth="2"
                    strokeDasharray="270"
                    strokeDashoffset={270}
                    className="transition-all duration-[50ms] ease-linear"
                  />
                </svg>

                {/* Central crosshairs lines */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5 pointer-events-none" />
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/5 pointer-events-none" />

                {/* Shutter Sweep Line (clock hand style sweep) */}
                <motion.div 
                  className="absolute top-0 bottom-1/2 left-1/2 w-[1.5px] bg-[#C6904E]/45 origin-bottom"
                  style={{ x: '-50%' }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />

                {/* Number Display */}
                <div className="text-center">
                  <motion.span
                    key={countdown}
                    initial={{ opacity: 0, scale: 1.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-6xl md:text-7xl font-light text-white font-sans tracking-tighter"
                  >
                    {countdown}
                  </motion.span>
                </div>
              </motion.div>
            ) : (
              // Stage 2: Clapper Board Animation
              <motion.div
                key="clapper"
                initial={{ opacity: 0, scale: 0.75, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: 'spring', damping: 18 }}
                className="flex flex-col items-center justify-center relative perspective-[1000px] transform-gpu"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Clapperboard Body */}
                <div className="w-64 md:w-72 relative">
                  
                  {/* Top Bar (Rotating Arm) */}
                  <motion.div
                    initial={{ rotate: -28 }}
                    animate={isClapping ? { rotate: 0 } : { rotate: -28 }}
                    transition={
                      isClapping 
                        ? { duration: 0.12, ease: [0.36, 0.07, 0.19, 0.97] } 
                        : { duration: 0.4, ease: "easeOut" }
                    }
                    className="w-full h-8 bg-[#181818] border-b-4 border-black origin-bottom-left relative z-25 flex items-center overflow-hidden rounded-t shadow-lg"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #1e1e1e, #1e1e1e 12px, #E5E5E5 12px, #E5E5E5 24px)',
                      boxShadow: '0 -2px 10px rgba(0,0,0,0.5)'
                    }}
                  />

                  {/* Bottom Striped Bar (Static matching bar) */}
                  <div
                    className="w-full h-8 bg-[#181818] border-t-2 border-black flex items-center overflow-hidden shadow-md"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(-45deg, #1e1e1e, #1e1e1e 12px, #E5E5E5 12px, #E5E5E5 24px)'
                    }}
                  />

                  {/* Clapper slate text area */}
                  <div className="w-full h-36 bg-[#121212] border border-white/5 rounded-b p-3 flex flex-col justify-between text-[10px] md:text-xs text-white/70 select-none shadow-2xl relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />
                    
                    {/* Slate Rows */}
                    <div className="grid grid-cols-2 gap-2 border-b border-white/10 pb-2">
                      <div>
                        <span className="text-[8px] text-white/35 block">PROD.</span>
                        <span className="font-bold text-[#C6904E] tracking-wider truncate block">K. VIDURANGA</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-white/35 block">DIRECTOR</span>
                        <span className="font-bold text-white truncate block">K. VIDURANGA</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2 text-center">
                      <div>
                        <span className="text-[8px] text-white/35 block">SCENE</span>
                        <span className="font-bold text-white font-sans text-sm block">01</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-white/35 block">TAKE</span>
                        <span className="font-bold text-white font-sans text-sm block">01</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-white/35 block">FPS</span>
                        <span className="font-bold text-[#F27D26] text-sm block">24</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-white/40 pt-1">
                      <span>ROLL: A01</span>
                      <span>DATE: 2026.07.24</span>
                    </div>
                  </div>
                </div>

                {/* Shutter Shockwave / Glow effect on clap */}
                <AnimatePresence>
                  {clapped && !isExiting && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1.05 }}
                      exit={{ opacity: 0, scale: 1.4 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div className="w-72 h-72 rounded-full border-2 border-[#F27D26]/40 animate-ping absolute" />
                      <div className="w-80 h-80 rounded-full border border-white/10 animate-pulse absolute" />
                      
                      <motion.div
                        initial={{ y: 15 }}
                        animate={{ y: 0 }}
                        className="bg-black/90 text-[#F27D26] border border-[#F27D26]/80 px-6 py-2 rounded-full font-bold tracking-[0.25em] shadow-[0_0_25px_rgba(242,125,38,0.3)] text-xs uppercase z-30"
                      >
                        ACTION!
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Panel Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end z-20">
          
          {/* Left: Camera settings */}
          <div className="flex gap-4 text-[10px] md:text-xs text-white/35">
            <div>
              <span className="block text-[8px] uppercase tracking-wider mb-0.5">SHUTTER</span>
              <span className="font-bold text-white/70">1/48s</span>
            </div>
            <div>
              <span className="block text-[8px] uppercase tracking-wider mb-0.5">ISO</span>
              <span className="font-bold text-white/70">800</span>
            </div>
            <div>
              <span className="block text-[8px] uppercase tracking-wider mb-0.5">APERTURE</span>
              <span className="font-bold text-white/70">T 2.1</span>
            </div>
            <div>
              <span className="block text-[8px] uppercase tracking-wider mb-0.5">LENS</span>
              <span className="font-bold text-[#C6904E]">35MM</span>
            </div>
          </div>

          {/* Center: Buffering Loading bar */}
          <div className="flex flex-col gap-2">
            <div className="h-4 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={logIndex}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.75 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[9px] md:text-[10px] text-[#C6904E] tracking-[0.12em] text-center w-full uppercase"
                >
                  {statusLogs[logIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Custom progress rail */}
            <div className="h-1 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-[#C6904E] to-[#F27D26] rounded-full animate-pulse transition-all duration-[50ms] ease-linear"
                style={{ width: '0%' }}
              />
            </div>
            
            <div className="flex justify-between items-center text-[9px] text-white/25 tracking-widest">
              <span>BUFF_0.9X_4K</span>
              <span ref={progressTextRef}>0% SECURE</span>
            </div>
          </div>

          {/* Right: Audio VU meter bars (GPU-Animated using Pure CSS for 0% CPU footprint) */}
          <div className="flex flex-col items-end gap-1.5 h-10 justify-end">
            <span className="text-[8px] text-white/25 uppercase tracking-widest self-end">CH1 / CH2 AUDIO</span>
            <div className="flex items-end gap-[3px] h-4">
              <div className="vu-bar vu-anim-1 w-[4px] min-h-[2px] rounded-t-sm bg-green-600/40" />
              <div className="vu-bar vu-anim-2 w-[4px] min-h-[2px] rounded-t-sm bg-green-600/40" />
              <div className="vu-bar vu-anim-3 w-[4px] min-h-[2px] rounded-t-sm bg-green-600/40" />
              <div className="vu-bar vu-anim-4 w-[4px] min-h-[2px] rounded-t-sm bg-[#C6904E]/60" />
              <div className="vu-bar vu-anim-5 w-[4px] min-h-[2px] rounded-t-sm bg-[#C6904E]/60" />
              <div className="vu-bar vu-anim-6 w-[4px] min-h-[2px] rounded-t-sm bg-green-600/40" />
              <div className="vu-bar vu-anim-7 w-[4px] min-h-[2px] rounded-t-sm bg-red-500/60" />
              <div className="vu-bar vu-anim-8 w-[4px] min-h-[2px] rounded-t-sm bg-red-500/60" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
