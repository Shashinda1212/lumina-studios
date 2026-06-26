import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  Eye, 
  MoveHorizontal, 
  Play 
} from 'lucide-react';

// Types of hover states for the custom cursor
type HoverState = 'none' | 'link' | 'view' | 'drag' | 'text';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export const CursorTracker = () => {
  const [hoverState, setHoverState] = useState<HoverState>('none');
  const [hoverIcon, setHoverIcon] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse Coordinates (Raw values)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring Settings for Outer Trail
  const outerSpringConfig = { damping: 26, stiffness: 350, mass: 0.35 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  // Spring Settings for Inner Dot (very responsive, tiny delay for smoothness)
  const innerSpringConfig = { damping: 30, stiffness: 600, mass: 0.15 };
  const innerX = useSpring(mouseX, innerSpringConfig);
  const innerY = useSpring(mouseY, innerSpringConfig);

  // Canvas Reference for Particle System
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // 1. Detect device touch capability
  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    // If mouse moves, verify it's not a touch-only device
    const handleFirstMove = () => {
      setIsTouchDevice(false);
      setIsVisible(true);
      window.removeEventListener('mousemove', handleFirstMove);
    };
    window.addEventListener('mousemove', handleFirstMove);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleFirstMove);
    };
  }, []);

  // 1.5. Hide default cursor when custom cursor is active
  useEffect(() => {
    if (isTouchDevice || !isVisible) {
      document.documentElement.classList.remove('custom-cursor-active');
      return;
    }
    document.documentElement.classList.add('custom-cursor-active');
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isTouchDevice, isVisible]);

  // 2. Track mouse movements and click states
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Spawn trail particles if the mouse moved significantly
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3) {
        spawnParticles(e.clientX, e.clientY, 1 + Math.min(Math.floor(dist / 10), 3));
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      // Spawn a burst of particles on click
      spawnBurst(mouseX.get(), mouseY.get());
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice, isVisible]);

  // 3. Hover Target Detection
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Text Fields & Input Elements
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setHoverState('text');
        setHoverIcon(null);
        return;
      }

      // 2. Drag & Slider Areas (like perspective & diagonal carousels)
      const dragContainer =
        target.closest('[data-cursor="drag"]') ||
        target.closest('.perspective-carousel') ||
        target.closest('.diagonal-carousel') ||
        target.closest('.swiper-container');
      
      if (dragContainer) {
        setHoverState('drag');
        setHoverIcon('drag');
        return;
      }

      // 3. View / Card hover (for custom project cards, testimonials, etc.)
      const viewContainer =
        target.closest('[data-cursor="view"]') ||
        target.closest('.project-card') ||
        target.closest('[role="button"]') ||
        target.closest('.carousel-item');
      
      if (viewContainer) {
        setHoverState('view');
        setHoverIcon('view');
        return;
      }

      // 4. Interactive/Link elements (links, buttons, icons)
      const linkContainer =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.closest('[role="link"]');
      
      if (linkContainer) {
        setHoverState('link');
        
        // Detect link type for specific icon rendering
        const href = linkContainer.getAttribute('href') || '';
        const ariaLabel = linkContainer.getAttribute('aria-label') || '';
        const text = (linkContainer.innerText || '').toLowerCase();
        
        if (href.includes('instagram.com') || ariaLabel.toLowerCase().includes('instagram')) {
          setHoverIcon('instagram');
        } else if (href.includes('youtube.com') || ariaLabel.toLowerCase().includes('youtube')) {
          setHoverIcon('youtube');
        } else if (href.includes('vimeo') || ariaLabel.toLowerCase().includes('vimeo') || linkContainer.innerHTML.includes('vimeo') || text.includes('vimeo')) {
          setHoverIcon('vimeo');
        } else if (href.startsWith('mailto:') || ariaLabel.toLowerCase().includes('mail') || href.includes('mail') || text.includes('mail') || text.includes('contact')) {
          setHoverIcon('mail');
        } else if (href.startsWith('tel:') || ariaLabel.toLowerCase().includes('phone') || href.includes('phone') || text.includes('phone')) {
          setHoverIcon('phone');
        } else if (linkContainer.innerHTML.includes('PlayCircle') || linkContainer.innerHTML.includes('play') || text.includes('play') || text.includes('reel')) {
          setHoverIcon('play');
        } else {
          setHoverIcon(null); // no icon for standard links
        }
        return;
      }

      // 5. Default
      setHoverState('none');
      setHoverIcon(null);
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice]);

  // 4. Canvas Particle Logic
  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI screens
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Apply friction and a tiny bit of upward drift (looks like warm embers)
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.vy -= 0.05; // float up slightly
        p.x += p.vx;
        p.y += p.vy;

        // Calculate size and opacity based on life remaining
        const progress = p.life / p.maxLife;
        p.alpha = progress;
        const currentSize = p.size * progress;

        // Draw glowing circles
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        
        ctx.fillStyle = p.color.replace('opacity', p.alpha.toFixed(2));
        
        // Add a subtle glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = ctx.fillStyle;
        
        ctx.fill();
        ctx.shadowBlur = 0; // reset glow
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isTouchDevice]);

  // Spawns dust particles on mouse move
  const spawnParticles = (x: number, y: number, count: number) => {
    const colors = [
      'rgba(242, 125, 38, opacity)',  // Orange (#F27D26)
      'rgba(198, 144, 78, opacity)',  // Gold/Bronze (#C6904E)
      'rgba(6, 182, 212, opacity)',   // Cyan (#06b6d4)
    ];

    for (let i = 0; i < count; i++) {
      // Small velocity opposite to movement, plus some noise
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5;
      
      const particle: Particle = {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: Math.floor(Math.random() * 30) + 20,
        maxLife: 50,
      };

      // Cap max particles to prevent performance hit
      if (particlesRef.current.length < 150) {
        particlesRef.current.push(particle);
      }
    }
  };

  // Spawns burst of particles on mouse click
  const spawnBurst = (x: number, y: number) => {
    const colors = [
      'rgba(242, 125, 38, opacity)',  // Orange
      'rgba(198, 144, 78, opacity)',  // Gold
      'rgba(6, 182, 212, opacity)',   // Cyan
    ];

    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const speed = Math.random() * 3.5 + 2.5;
      
      const particle: Particle = {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: Math.floor(Math.random() * 35) + 25,
        maxLife: 60,
      };

      if (particlesRef.current.length < 200) {
        particlesRef.current.push(particle);
      }
    }
  };

  if (isTouchDevice || !isVisible) return null;

  // Determine styles dynamically based on hover state
  const getOuterVariants = () => {
    switch (hoverState) {
      case 'link':
        return {
          width: 42,
          height: 42,
          borderColor: '#F27D26', // Orange Accent
          backgroundColor: 'rgba(242, 125, 38, 0.15)',
          borderWidth: '1.5px',
          scale: isClicked ? 0.85 : 1,
        };
      case 'view':
        return {
          width: 58,
          height: 58,
          borderColor: '#C6904E', // Gold Accent
          backgroundColor: 'rgba(198, 144, 78, 0.12)',
          borderWidth: '1px',
          scale: isClicked ? 0.85 : 1,
        };
      case 'drag':
        return {
          width: 58,
          height: 58,
          borderColor: '#06b6d4', // Cyan Accent
          backgroundColor: 'rgba(6, 182, 212, 0.12)',
          borderWidth: '1.5px',
          scale: isClicked ? 0.85 : 1,
        };
      case 'text':
        return {
          width: 0,
          height: 0,
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          borderWidth: '0px',
          scale: 0,
        };
      case 'none':
      default:
        return {
          width: 28,
          height: 28,
          borderColor: '#C6904E', // Default Gold Accent
          backgroundColor: 'rgba(198, 144, 78, 0.04)',
          borderWidth: '1px',
          scale: isClicked ? 0.75 : 1,
        };
    }
  };

  const getInnerVariants = () => {
    switch (hoverState) {
      case 'text':
        return {
          width: 2,
          height: 18,
          borderRadius: '2px',
          backgroundColor: '#F27D26', // Orange caret
          scale: 1,
          scaleY: 1,
        };
      case 'link':
      case 'view':
      case 'drag':
        return {
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: '#F27D26', // Keep small central dot
          scale: 1,
          scaleY: 1,
        };
      case 'none':
      default:
        return {
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: '#F27D26', // Orange inner dot
          scale: isClicked ? 1.4 : 1,
          scaleY: 1,
        };
    }
  };

  return (
    <>
      {/* Background canvas for glowing particle trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] mix-blend-screen"
        style={{ backfaceVisibility: 'hidden' }}
      />

      {/* Trailing Outer Ring */}
      <motion.div
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: hoverState === 'none' 
            ? '0 0 10px rgba(198, 144, 78, 0.05)'
            : hoverState === 'link'
            ? '0 0 20px rgba(242, 125, 38, 0.25)'
            : hoverState === 'view'
            ? '0 0 25px rgba(198, 144, 78, 0.2)'
            : '0 0 25px rgba(6, 182, 212, 0.2)'
        }}
        animate={getOuterVariants()}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.1 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex flex-col items-center justify-center border select-none overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {hoverIcon === 'instagram' && (
            <motion.div key="instagram" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
              <Instagram className="w-3.5 h-3.5 text-[#F27D26]" strokeWidth={1.8} />
            </motion.div>
          )}
          {hoverIcon === 'youtube' && (
            <motion.div key="youtube" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
              <Youtube className="w-3.5 h-3.5 text-[#F27D26]" strokeWidth={1.8} />
            </motion.div>
          )}
          {hoverIcon === 'vimeo' && (
            <motion.div key="vimeo" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#F27D26]" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.396 7.164c-.093 2.026-1.507 4.8-4.245 8.32C15.323 19.16 12.93 21 10.97 21c-1.214 0-2.24-1.12-3.08-3.36-.56-2.052-1.119-4.1-1.68-6.15-.653-2.332-1.306-3.498-1.959-3.498-.186 0-.933.653-2.24 1.959L.702 8.547c1.493-1.4 3.08-2.986 4.76-4.76 2.052-1.96 3.64-2.94 4.76-2.94 1.96 0 3.172 1.306 3.64 3.92.373 2.24.653 3.92.84 5.039.466 2.613 1.026 3.92 1.68 3.92.466 0 1.213-.653 2.24-1.959 1.119-1.307 1.772-2.333 1.959-3.08.374-1.306-.093-1.96-1.4-1.96-.56 0-1.12.093-1.68.28 1.12-3.64 3.36-5.46 6.72-5.46 2.425 0 3.545 1.12 3.358 3.36z" />
              </svg>
            </motion.div>
          )}
          {hoverIcon === 'mail' && (
            <motion.div key="mail" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
              <Mail className="w-3.5 h-3.5 text-[#F27D26]" strokeWidth={1.8} />
            </motion.div>
          )}
          {hoverIcon === 'phone' && (
            <motion.div key="phone" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
              <Phone className="w-3.5 h-3.5 text-[#F27D26]" strokeWidth={1.8} />
            </motion.div>
          )}
          {hoverIcon === 'play' && (
            <motion.div key="play" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
              <Play className="w-3.5 h-3.5 text-[#F27D26] fill-[#F27D26]" strokeWidth={1.8} />
            </motion.div>
          )}

          {hoverIcon === 'view' && (
            <motion.div key="view" className="flex flex-col items-center justify-center gap-0.5" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
              <Eye className="w-3.5 h-3.5 text-[#C6904E]" strokeWidth={1.8} />
              <span className="text-[7.5px] font-bold font-mono tracking-[0.15em] text-[#C6904E] pl-[0.15em] leading-none select-none">
                VIEW
              </span>
            </motion.div>
          )}
          {hoverIcon === 'drag' && (
            <motion.div key="drag" className="flex flex-col items-center justify-center gap-0.5" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
              <MoveHorizontal className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.8} />
              <span className="text-[7.5px] font-bold font-mono tracking-[0.15em] text-[#06b6d4] pl-[0.15em] leading-none select-none">
                DRAG
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Reactive Central Dot / Caret */}
      <motion.div
        style={{
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={getInnerVariants()}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.05 }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] shadow-sm"
      />
    </>
  );
};
