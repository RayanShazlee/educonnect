'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Trophy, Star, Users, Book, Zap, Brain, Crown, Clock, Search } from 'lucide-react';

interface PixelIconProps {
  type: 'bullseye' | 'joystick' | 'sword' | 'compass' | 'crossJoysticks' | 'infinity' | 'hourglass' | 'invader' | 'crtScreen' | 'bug' | 'rocket' | 'note' | 'coin' | 'heart' | 'crown';
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const rarityColors = {
  Common: 'rgb(169, 169, 169)',
  Rare: 'rgb(69, 183, 175)',
  Epic: 'rgb(255, 107, 107)',
  Legendary: 'rgb(255, 215, 0)'
};

const pixelGlowKeyframes = {
  '0%': { filter: 'drop-shadow(0 0 2px currentColor)' },
  '50%': { filter: 'drop-shadow(0 0 8px currentColor)' },
  '100%': { filter: 'drop-shadow(0 0 2px currentColor)' }
};

const rarityAnimations = {
  Common: {
    animate: {
      filter: ['drop-shadow(0 0 2px currentColor)', 'drop-shadow(0 0 4px currentColor)', 'drop-shadow(0 0 2px currentColor)'],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  Rare: {
    animate: {
      filter: ['drop-shadow(0 0 3px currentColor)', 'drop-shadow(0 0 6px currentColor)', 'drop-shadow(0 0 3px currentColor)'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  Epic: {
    animate: {
      filter: ['drop-shadow(0 0 4px currentColor)', 'drop-shadow(0 0 8px currentColor)', 'drop-shadow(0 0 4px currentColor)'],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  Legendary: {
    animate: {
      filter: ['drop-shadow(0 0 5px currentColor)', 'drop-shadow(0 0 10px currentColor)', 'drop-shadow(0 0 5px currentColor)'],
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
};

const pixelIconMap: Record<PixelIconProps['type'], React.ReactNode> = {
  bullseye: <Star className="w-full h-full pixelated" />, // Pixel Perfectionist
  joystick: <Trophy className="w-full h-full pixelated" />, // Arcade Ace
  sword: <Zap className="w-full h-full pixelated" />, // Old School Slayer
  compass: <Book className="w-full h-full pixelated" />, // 8-Bit Explorer
  crossJoysticks: <Brain className="w-full h-full pixelated" />, // Joystick Jedi
  infinity: <Star className="w-full h-full pixelated" />, // No Continues Needed
  hourglass: <Clock className="w-full h-full pixelated" />, // Time Traveller
  invader: <Zap className="w-full h-full pixelated" />, // Bit Boss Beater
  crtScreen: <Crown className="w-full h-full pixelated" />, // Retro Revivalist
  bug: <Search className="w-full h-full pixelated" />, // Glitch Hunter
  rocket: <Zap className="w-full h-full pixelated" />, // Speedrun Star
  note: <Star className="w-full h-full pixelated" />, // Chiptune Champion
  coin: <Trophy className="w-full h-full pixelated" />, // Insert Coin
  heart: <Star className="w-full h-full pixelated" />, // One Life Wonder
  crown: <Crown className="w-full h-full pixelated" /> // Game Overlord
};

export function PixelIcon({ 
  type,
  rarity = 'Common',
  animate = true,
  size = 'md',
  className = ''
}: PixelIconProps) {
  const icon = pixelIconMap[type];

  return (
    <motion.div
      className={[
        'relative flex items-center justify-center rounded-lg overflow-hidden',
        'before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] before:bg-[size:100%_2px] before:pointer-events-none',
        'after:absolute after:inset-0 after:bg-gradient-to-br after:from-transparent after:to-black/10 after:pointer-events-none',
        sizeClasses[size],
        className
      ].join(' ')}
      style={{
        backgroundColor: `${rarityColors[rarity]}10`,
        border: `2px solid ${rarityColors[rarity]}`,
        imageRendering: 'pixelated',
      }}
      {...(animate ? rarityAnimations[rarity] : {})}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
    >
      {icon}
    </motion.div>
  );
}