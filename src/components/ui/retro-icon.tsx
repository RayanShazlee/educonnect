import { motion } from 'framer-motion';
import React from 'react';

interface RetroIconProps {
  icon: React.ReactNode;
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

const pixelBorderKeyframes = {
  '0%': { borderWidth: '2px' },
  '50%': { borderWidth: '3px' },
  '100%': { borderWidth: '2px' }
};

const glowKeyframes = {
  '0%': { filter: 'drop-shadow(0 0 2px currentColor)' },
  '50%': { filter: 'drop-shadow(0 0 8px currentColor)' },
  '100%': { filter: 'drop-shadow(0 0 2px currentColor)' }
};

const rarityAnimations = {
  Common: {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  Rare: {
    animate: {
      scale: [1, 1.05, 1],
      rotate: [0, 2, 0],
      filter: [
        'brightness(1) drop-shadow(0 0 4px currentColor)',
        'brightness(1.1) drop-shadow(0 0 8px currentColor)',
        'brightness(1) drop-shadow(0 0 4px currentColor)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  Epic: {
    animate: {
      scale: [1, 1.08, 1],
      rotate: [0, 5, -5, 0],
      filter: [
        'brightness(1) drop-shadow(0 0 8px currentColor)',
        'brightness(1.2) drop-shadow(0 0 12px currentColor)',
        'brightness(1) drop-shadow(0 0 8px currentColor)'
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  Legendary: {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      filter: [
        'brightness(1) drop-shadow(0 0 12px currentColor) hue-rotate(0deg)',
        'brightness(1.3) drop-shadow(0 0 20px currentColor) hue-rotate(45deg)',
        'brightness(1) drop-shadow(0 0 12px currentColor) hue-rotate(0deg)'
      ],
      transition: {
        duration: 2,
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

const rarityBackgrounds = {
  Common: 'linear-gradient(45deg, rgba(169,169,169,0.1) 0%, rgba(169,169,169,0.2) 100%)',
  Rare: 'linear-gradient(45deg, rgba(69,183,175,0.1) 0%, rgba(69,183,175,0.2) 100%)',
  Epic: 'linear-gradient(45deg, rgba(255,107,107,0.1) 0%, rgba(255,107,107,0.2) 100%)',
  Legendary: 'linear-gradient(45deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.2) 100%)'
};

export function RetroIcon({ 
  icon, 
  rarity = 'Common',
  animate = true,
  size = 'md',
  className = ''
}: RetroIconProps) {
  return (
    <motion.div
      className={[
        'relative flex items-center justify-center rounded-lg overflow-hidden',
        'before:absolute before:inset-0 before:bg-scanlines before:opacity-10 before:mix-blend-overlay before:pointer-events-none',
        'after:absolute after:inset-0 after:bg-gradient-to-br after:from-transparent after:to-black/10 after:pointer-events-none',
        sizeClasses[size],
        className
      ].join(' ')}
      style={{
        background: rarityBackgrounds[rarity],
        border: `2px solid ${rarityColors[rarity]}`,
        boxShadow: `0 0 10px ${rarityColors[rarity]}`,
        color: rarityColors[rarity]
      }}
      {...(animate ? rarityAnimations[rarity] : {})}
      whileHover={{
        scale: 1.1,
        filter: `brightness(1.2) drop-shadow(0 0 8px ${rarityColors[rarity]})`,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div 
        className="relative z-10 p-1"
        animate={animate ? {
          opacity: [0.8, 1, 0.8],
          textShadow: [
            `0 0 4px ${rarityColors[rarity]}`,
            `0 0 8px ${rarityColors[rarity]}`,
            `0 0 4px ${rarityColors[rarity]}`
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
      {animate && rarity !== 'Common' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              `radial-gradient(circle, ${rarityColors[rarity]}00 0%, ${rarityColors[rarity]}00 100%)`,
              `radial-gradient(circle, ${rarityColors[rarity]}20 0%, ${rarityColors[rarity]}00 100%)`,
              `radial-gradient(circle, ${rarityColors[rarity]}00 0%, ${rarityColors[rarity]}00 100%)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
} 