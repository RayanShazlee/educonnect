'use client'

import { motion } from "framer-motion"
import { 
  Brain, 
  Users, 
  Heart, 
  BookOpen, 
  Code, 
  Trophy, 
  Star, 
  Zap, 
  Crown, 
  Shield, 
  Sword,
  Gamepad2,
  Target,
  Rocket
} from "lucide-react"

interface RetroAchievementIconProps {
  achievementName: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Achievement icon mapping with specific themes and rarities
const achievementConfig = {
  'Algorithm Master': {
    icon: Brain,
    colors: {
      primary: '#ffd700', // Gold
      secondary: '#ffed4e',
      accent: '#fff59d',
      glow: 'rgba(255, 215, 0, 0.6)'
    },
    bgPattern: 'algorithm-matrix',
    particles: ['🧠', '⚡', '🔢', '💡'],
    theme: 'legendary'
  },
  'Code Mentor': {
    icon: Code,
    colors: {
      primary: '#9333ea', // Purple
      secondary: '#a855f7',
      accent: '#c084fc',
      glow: 'rgba(147, 51, 234, 0.5)'
    },
    bgPattern: 'code-flow',
    particles: ['👨‍💻', '💜', '🔧', '📚'],
    theme: 'epic'
  },
  'Community Helper': {
    icon: Heart,
    colors: {
      primary: '#ef4444', // Red
      secondary: '#f87171',
      accent: '#fca5a5',
      glow: 'rgba(239, 68, 68, 0.5)'
    },
    bgPattern: 'heart-pulse',
    particles: ['❤️', '🤝', '⭐', '💖'],
    theme: 'rare'
  },
  'First Course': {
    icon: BookOpen,
    colors: {
      primary: '#10b981', // Green
      secondary: '#34d399',
      accent: '#6ee7b7',
      glow: 'rgba(16, 185, 129, 0.4)'
    },
    bgPattern: 'book-pages',
    particles: ['📖', '🌟', '🎓', '✨'],
    theme: 'common'
  },
  'Course Master': {
    icon: Crown,
    colors: {
      primary: '#f59e0b', // Amber
      secondary: '#fbbf24',
      accent: '#fcd34d',
      glow: 'rgba(245, 158, 11, 0.6)'
    },
    bgPattern: 'crown-jewels',
    particles: ['👑', '💎', '⚡', '🏆'],
    theme: 'legendary'
  },
  'Team Player': {
    icon: Users,
    colors: {
      primary: '#06b6d4', // Cyan
      secondary: '#22d3ee',
      accent: '#67e8f9',
      glow: 'rgba(6, 182, 212, 0.5)'
    },
    bgPattern: 'team-network',
    particles: ['👥', '🤝', '💙', '🌐'],
    theme: 'epic'
  },
  'Speed Learner': {
    icon: Zap,
    colors: {
      primary: '#eab308', // Yellow
      secondary: '#facc15',
      accent: '#fde047',
      glow: 'rgba(234, 179, 8, 0.6)'
    },
    bgPattern: 'lightning-bolt',
    particles: ['⚡', '💨', '🚀', '⭐'],
    theme: 'rare'
  },
  'Achievement Hunter': {
    icon: Target,
    colors: {
      primary: '#dc2626', // Red
      secondary: '#ef4444',
      accent: '#f87171',
      glow: 'rgba(220, 38, 38, 0.5)'
    },
    bgPattern: 'target-rings',
    particles: ['🎯', '🏹', '💥', '🔥'],
    theme: 'epic'
  }
}

// Default fallback
const defaultConfig = {
  icon: Trophy,
  colors: {
    primary: '#6366f1',
    secondary: '#818cf8',
    accent: '#a5b4fc',
    glow: 'rgba(99, 102, 241, 0.4)'
  },
  bgPattern: 'default-trophy',
  particles: ['🏆', '⭐', '✨', '🎉'],
  theme: 'common'
}

const rarityEffects = {
  Common: {
    glowIntensity: 1,
    particleCount: 2,
    animationSpeed: 1,
    sparkleSize: 'w-1 h-1'
  },
  Rare: {
    glowIntensity: 1.3,
    particleCount: 3,
    animationSpeed: 1.2,
    sparkleSize: 'w-1.5 h-1.5'
  },
  Epic: {
    glowIntensity: 1.6,
    particleCount: 4,
    animationSpeed: 1.5,
    sparkleSize: 'w-2 h-2'
  },
  Legendary: {
    glowIntensity: 2,
    particleCount: 4,
    animationSpeed: 2,
    sparkleSize: 'w-2.5 h-2.5'
  }
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
}

export function RetroAchievementIcon({ 
  achievementName, 
  rarity, 
  size = 'md', 
  className = '' 
}: RetroAchievementIconProps) {
  const config = achievementConfig[achievementName as keyof typeof achievementConfig] || defaultConfig
  const IconComponent = config.icon
  const sizeClass = sizeClasses[size]
  const rarityEffect = rarityEffects[rarity]

  return (
    <motion.div
      className={`relative ${sizeClass} ${className}`}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        duration: 0.8
      }}
    >
      {/* Animated background with achievement-specific pattern */}
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden"
        style={{
          background: `radial-gradient(circle, ${config.colors.primary}30, ${config.colors.secondary}20, ${config.colors.accent}10)`,
          border: `2px solid ${config.colors.primary}60`,
          borderRadius: rarity === 'Legendary' ? '50%' : '12px'
        }}
        animate={{
          boxShadow: [
            `0 0 ${10 * rarityEffect.glowIntensity}px ${config.colors.glow}`,
            `0 0 ${20 * rarityEffect.glowIntensity}px ${config.colors.glow}`,
            `0 0 ${10 * rarityEffect.glowIntensity}px ${config.colors.glow}`
          ],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 2 / rarityEffect.animationSpeed, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {/* Achievement-specific background pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: rarity === 'Legendary' 
              ? `radial-gradient(circle, ${config.colors.primary}40 1px, transparent 1px)`
              : `linear-gradient(${config.colors.primary}30 1px, transparent 1px), linear-gradient(90deg, ${config.colors.primary}30 1px, transparent 1px)`,
            backgroundSize: rarity === 'Legendary' ? '6px 6px' : '3px 3px'
          }}
        />
        
        {/* Rotating border for Epic and Legendary */}
        {(rarity === 'Epic' || rarity === 'Legendary') && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `conic-gradient(from 0deg, ${config.colors.primary}80, ${config.colors.secondary}40, ${config.colors.accent}80, ${config.colors.primary}80)`,
              padding: '2px'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div 
              className="w-full h-full rounded-xl"
              style={{ backgroundColor: 'var(--retro-bg)' }}
            />
          </motion.div>
        )}
        
        {/* Pulsing scanlines */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${config.colors.primary}30 2px,
              ${config.colors.primary}30 4px
            )`
          }}
          animate={{ y: [0, 6, 0] }}
          transition={{ 
            duration: 2 / rarityEffect.animationSpeed, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </motion.div>

      {/* Main achievement icon */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            filter: [
              `drop-shadow(0 0 6px ${config.colors.glow})`,
              `drop-shadow(0 0 12px ${config.colors.glow})`,
              `drop-shadow(0 0 6px ${config.colors.glow})`
            ],
            rotate: rarity === 'Legendary' ? [0, 5, -5, 0] : [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 3 / rarityEffect.animationSpeed, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <IconComponent 
            className={`${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'}`}
            style={{ color: config.colors.primary }}
          />
        </motion.div>
      </div>

      {/* Floating achievement particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {config.particles.slice(0, rarityEffect.particleCount).map((particle, index) => (
          <motion.div
            key={index}
            className="absolute text-xs opacity-70"
            style={{
              left: `${15 + index * 20}%`,
              top: `${10 + index * 25}%`
            }}
            animate={{
              y: [0, -12, 0],
              x: [0, Math.sin(index) * 8, 0],
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.3, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2.5 + index * 0.3,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "easeInOut"
            }}
          >
            {particle}
          </motion.div>
        ))}
      </div>

      {/* Rarity-based corner sparkles */}
      {Array.from({ length: rarity === 'Legendary' ? 4 : rarity === 'Epic' ? 3 : 2 }).map((_, index) => (
        <motion.div
          key={index}
          className={`absolute ${rarityEffect.sparkleSize} rounded-full opacity-80`}
          style={{ 
            backgroundColor: config.colors.accent,
            top: index % 2 === 0 ? '-2px' : 'auto',
            bottom: index % 2 === 1 ? '-2px' : 'auto',
            left: index < 2 ? '-2px' : 'auto',
            right: index >= 2 ? '-2px' : 'auto'
          }}
          animate={{
            scale: [0.5, 1.8, 0.5],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 1.5 + index * 0.2, 
            repeat: Infinity, 
            delay: index * 0.3,
            ease: "easeInOut" 
          }}
        />
      ))}

      {/* Legendary exclusive effects */}
      {rarity === 'Legendary' && (
        <>
          {/* Orbiting particles */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative w-full h-full">
              <motion.div
                className="absolute w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: config.colors.primary,
                  top: '10%',
                  left: '50%',
                  marginLeft: '-4px'
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
          
          {/* Crown effect for legendary */}
          <motion.div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-yellow-400"
            animate={{
              y: [-2, -6, -2],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            👑
          </motion.div>
        </>
      )}

      {/* Epic exclusive holographic shine */}
      {rarity === 'Epic' && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-30 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 20%, ${config.colors.accent}80 50%, transparent 80%)`
          }}
          animate={{
            x: ['-120%', '120%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2
          }}
        />
      )}
    </motion.div>
  )
}
