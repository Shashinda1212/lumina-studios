'use client';

import { Button } from '@/components/ui/button';
import { easeOut, motion } from 'motion/react';
import * as React from 'react';
import { Star } from 'lucide-react';

export interface FlipCardData {
  name: string;
  username: string;
  image: string;
  bio: string;
  stats: {
    following: number;
    followers: number;
    posts?: number;
  };
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

interface FlipCardProps {
  data: FlipCardData;
}

export function FlipCard({ data }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const isTouchDevice =
    typeof window !== 'undefined' && 'ontouchstart' in window;

  const handleClick = () => {
    if (isTouchDevice) setIsFlipped(!isFlipped);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsFlipped(false);
  };

  const cardVariants = {
    front: { rotateY: 0, transition: { duration: 0.5, ease: easeOut } },
    back: { rotateY: 180, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <div
      className="relative w-52 h-72 md:w-60 md:h-80 perspective-1000 cursor-pointer mx-auto"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* FRONT: Profile */}
      <motion.div
        className="absolute inset-0 backface-hidden rounded-md border-2 border-foreground/20 px-4 py-6 flex flex-col items-center justify-center bg-gradient-to-br from-muted via-background to-muted text-center"
        animate={isFlipped ? 'back' : 'front'}
        variants={cardVariants}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={data.image}
          alt={data.name}
          className="size-20 md:size-24 rounded-full object-cover mb-4 border-2"
        />
        <h2 className="text-lg font-bold text-foreground">{data.name}</h2>
        <p className="text-sm text-muted-foreground">@{data.username}</p>
      </motion.div>

      {/* BACK: Review */}
      <motion.div
        className="absolute inset-0 backface-hidden rounded-md border-2 border-foreground/20 px-6 py-8 flex flex-col justify-center items-center gap-y-6 bg-gradient-to-tr from-muted via-background to-muted "
        initial={{ rotateY: 180 }}
        animate={isFlipped ? 'front' : 'back'}
        variants={cardVariants}
        style={{ transformStyle: 'preserve-3d', rotateY: 180 }}
      >
        <div className="flex items-center justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-5 h-5 text-[#CE5D01] fill-[#CE5D01]" />
          ))}
        </div>
        <p className="text-sm md:text-[15px] text-foreground/80 font-medium text-center italic leading-relaxed">
          "{data.bio}"
        </p>
      </motion.div>
    </div>
  );
}
