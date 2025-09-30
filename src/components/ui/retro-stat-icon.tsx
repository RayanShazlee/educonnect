'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { 
  Users, 
  BookOpen, 
  Trophy, 
  MessageSquare,
  Target,
  Star,
  Zap,
  Heart,
  Brain,
  Gamepad2
} from 'lucide-react'

interface RetroStatIconProps {
  type: 'learners' | 'courses' | 'achievements' | 'posts'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

const iconConfigs = {
  learners: {
    icon: Users,
    colors: {
      primary: '#45B7AF', // retro-primary (cyan)
      secondary: '#22D3EE', // cyan-400
      accent: '#06B6D4'     // cyan-500
    },
    bgGradient: 'from-cyan-500/20 via-teal-500/20 to-cyan-600/20',
    glowColor: 'rgba(69, 183, 175, 0.4)',
    particles: ['👥', '🎓', '🌟', '💫']
  },
  courses: {
    icon: BookOpen,
    colors: {
      primary: '#10B981', // emerald-500
      secondary: '#34D399', // emerald-400
      accent: '#059669'     // emerald-600
    },
    bgGradient: 'from-emerald-500/20 via-green-500/20 to-emerald-600/20',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    particles: ['📚', '🎯', '✨', '🚀']
  },
  achievements: {
    icon: Trophy,
    colors: {
      primary: '#F59E0B', // amber-500
      secondary: '#FCD34D', // amber-300
      accent: '#D97706'     // amber-600
    },
    bgGradient: 'from-amber-500/20 via-yellow-500/20 to-orange-500/20',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    particles: ['🏆', '⭐', '🥇', '👑']
  },
  posts: {
    icon: MessageSquare,
    colors: {
      primary: '#8B5CF6', // violet-500
      secondary: '#A855F7', // purple-500
      accent: '#7C3AED'     // violet-600
    },
    bgGradient: 'from-violet-500/20 via-purple-500/20 to-indigo-500/20',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    particles: ['💬', '📢', '🗨️', '💭']
  }
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6', 
  lg: 'w-8 h-8'
}

export function RetroStatIcon({ 
  type, 
  size = 'md', 
  animated = true,
  className = ''
}: RetroStatIconProps) {
  const config = iconConfigs[type]
  const IconComponent = config.icon
  const containerSize = sizeClasses[size]
  const iconSize = iconSizes[size]

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Glow Effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-lg blur-md opacity-40"
          style={{
            background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`
          }}
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Main Icon Container */}
      <motion.div
        className={`relative ${containerSize} rounded-lg border-2 overflow-hidden`}
        style={{
          borderColor: config.colors.primary,
          background: `linear-gradient(135deg, ${config.colors.primary}15, ${config.colors.secondary}15, ${config.colors.accent}15)`
        }}
        animate={animated ? {
          borderColor: [config.colors.primary, config.colors.accent, config.colors.primary],
          boxShadow: [
            `0 0 8px ${config.colors.primary}30`,
            `0 0 16px ${config.colors.accent}50`,
            `0 0 8px ${config.colors.primary}30`
          ]
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Pixelated Grid Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${config.colors.primary} 1px, transparent 1px),
              linear-gradient(to bottom, ${config.colors.primary} 1px, transparent 1px)
            `,
            backgroundSize: '3px 3px'
          }}
        />

        {/* Animated Gradient Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-60`}
          animate={animated ? {
            opacity: [0.4, 0.8, 0.4]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Scanlines Effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 1px,
                ${config.colors.primary}40 1px,
                ${config.colors.primary}40 2px
              )`
            }}
            animate={{
              y: [-8, 8, -8]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}

        {/* Main Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          animate={animated ? {
            scale: [1, 1.05, 1],
            rotate: [0, 1, 0]
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <IconComponent 
            className={`${iconSize} text-white drop-shadow-lg`}
            style={{ 
              filter: `drop-shadow(0 0 4px ${config.colors.primary})`,
              color: config.colors.primary
            }}
          />
        </motion.div>

        {/* Holographic Shine Effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 opacity-50"
            style={{
              background: `linear-gradient(45deg, transparent 30%, ${config.colors.secondary}60 50%, transparent 70%)`
            }}
            animate={{
              x: [-40, 40, -40]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      {/* Floating Particles */}
      {animated && config.particles && (
        <div className="absolute inset-0 pointer-events-none">
          {config.particles.slice(0, 2).map((particle, index) => (
            <motion.div
              key={index}
              className="absolute text-xs"
              style={{
                left: `${10 + index * 60}%`,
                top: `${5 + index * 20}%`,
                fontSize: size === 'sm' ? '0.6rem' : size === 'md' ? '0.8rem' : '1rem'
              }}
              animate={{
                y: [-15, -25, -15],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.8,
                ease: "easeInOut"
              }}
            >
              {particle}
            </motion.div>
          ))}
        </div>
      )}

      {/* Corner Sparkles */}
      {animated && (
        <>
          {[0, 1].map((corner) => (
            <motion.div
              key={corner}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: config.colors.accent,
                top: corner === 0 ? '-2px' : 'auto',
                bottom: corner === 1 ? '-2px' : 'auto',
                right: '-2px'
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: corner * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
