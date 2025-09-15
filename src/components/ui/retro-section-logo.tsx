'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { 
  MessageSquare, 
  BookOpen, 
  Users, 
  Trophy, 
  LayoutDashboard,
  User,
  FileText,
  Settings,
  Heart,
  Sparkles,
  Zap,
  Target,
  Brain,
  Code,
  Gamepad2,
  Star
} from 'lucide-react'

interface RetroSectionLogoProps {
  sectionId: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  withGlow?: boolean
  className?: string
}

// Retro-styled pixelated logos for each section
const sectionLogos = {
  newsfeed: {
    icon: MessageSquare,
    colors: {
      primary: '#45B7AF', // retro-primary (cyan)
      secondary: '#6366F1', // indigo
      accent: '#EC4899' // pink
    },
    design: 'chat-bubble',
    particles: ['💬', '📢', '🗨️', '💭'],
    glowColor: 'rgba(69, 183, 175, 0.6)'
  },
  courses: {
    icon: BookOpen,
    colors: {
      primary: '#10B981', // emerald
      secondary: '#059669', // emerald-600
      accent: '#34D399' // emerald-400
    },
    design: 'book-stack',
    particles: ['📚', '🎓', '📖', '✏️'],
    glowColor: 'rgba(16, 185, 129, 0.6)'
  },
  communities: {
    icon: Users,
    colors: {
      primary: '#8B5CF6', // violet
      secondary: '#A855F7', // purple
      accent: '#D946EF' // fuchsia
    },
    design: 'network',
    particles: ['👥', '🤝', '🌐', '💫'],
    glowColor: 'rgba(139, 92, 246, 0.6)'
  },
  achievements: {
    icon: Trophy,
    colors: {
      primary: '#F59E0B', // amber
      secondary: '#D97706', // amber-600
      accent: '#FCD34D' // amber-300
    },
    design: 'trophy-shine',
    particles: ['🏆', '🥇', '⭐', '🎖️'],
    glowColor: 'rgba(245, 158, 11, 0.6)'
  },
  dashboard: {
    icon: LayoutDashboard,
    colors: {
      primary: '#3B82F6', // blue
      secondary: '#1D4ED8', // blue-700
      accent: '#60A5FA' // blue-400
    },
    design: 'grid-pattern',
    particles: ['📊', '📈', '⚡', '🔥'],
    glowColor: 'rgba(59, 130, 246, 0.6)'
  },
  profile: {
    icon: User,
    colors: {
      primary: '#06B6D4', // cyan
      secondary: '#0891B2', // cyan-600
      accent: '#22D3EE' // cyan-400
    },
    design: 'avatar-ring',
    particles: ['👤', '💎', '🌟', '✨'],
    glowColor: 'rgba(6, 182, 212, 0.6)'
  },
  resume: {
    icon: FileText,
    colors: {
      primary: '#84CC16', // lime
      secondary: '#65A30D', // lime-600
      accent: '#A3E635' // lime-400
    },
    design: 'document-stack',
    particles: ['📄', '📝', '💼', '🔖'],
    glowColor: 'rgba(132, 204, 22, 0.6)'
  },
  settings: {
    icon: Settings,
    colors: {
      primary: '#6B7280', // gray
      secondary: '#4B5563', // gray-600
      accent: '#9CA3AF' // gray-400
    },
    design: 'gear-mechanism',
    particles: ['⚙️', '🔧', '⚡', '🛠️'],
    glowColor: 'rgba(107, 114, 128, 0.6)'
  },
  wishlist: {
    icon: Heart,
    colors: {
      primary: '#EF4444', // red
      secondary: '#DC2626', // red-600
      accent: '#F87171' // red-400
    },
    design: 'heart-pulse',
    particles: ['❤️', '💖', '💝', '💫'],
    glowColor: 'rgba(239, 68, 68, 0.6)'
  }
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
}

const particleAnimations = {
  float: {
    animate: {
      y: [-20, -40, -20],
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  sparkle: {
    animate: {
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
}

export function RetroSectionLogo({ 
  sectionId, 
  size = 'lg', 
  animated = true, 
  withGlow = true,
  className = ''
}: RetroSectionLogoProps) {
  const config = sectionLogos[sectionId as keyof typeof sectionLogos]
  
  if (!config) {
    return null
  }

  const IconComponent = config.icon
  const sizeClass = sizeClasses[size]

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Glow Effect */}
      {withGlow && animated && (
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-50"
          style={{
            background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Retro Grid Background */}
      <motion.div
        className={`relative ${sizeClass} rounded-lg border-2 overflow-hidden`}
        style={{
          borderColor: config.colors.primary,
          background: `linear-gradient(135deg, ${config.colors.primary}20 0%, ${config.colors.secondary}20 50%, ${config.colors.accent}20 100%)`
        }}
        animate={animated ? {
          borderColor: [config.colors.primary, config.colors.accent, config.colors.primary],
          boxShadow: [
            `0 0 10px ${config.colors.primary}40`,
            `0 0 20px ${config.colors.accent}60`,
            `0 0 10px ${config.colors.primary}40`
          ]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Pixelated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${config.colors.primary} 1px, transparent 1px),
              linear-gradient(to bottom, ${config.colors.primary} 1px, transparent 1px)
            `,
            backgroundSize: '4px 4px'
          }}
        />

        {/* Animated Scanlines */}
        {animated && (
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 2px,
                ${config.colors.primary}40 2px,
                ${config.colors.primary}40 3px
              )`
            }}
            animate={{
              y: [-10, 10, -10]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}

        {/* Main Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={animated ? {
            scale: [1, 1.1, 1],
            rotate: [0, 2, 0]
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <IconComponent 
            className="w-3/4 h-3/4 z-10"
            style={{ color: config.colors.primary }}
          />
        </motion.div>

        {/* Holographic Effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 opacity-60"
            style={{
              background: `linear-gradient(45deg, transparent 30%, ${config.colors.accent}40 50%, transparent 70%)`
            }}
            animate={{
              x: [-50, 50, -50]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      {/* Floating Particles */}
      {animated && config.particles && (
        <div className="absolute inset-0 pointer-events-none">
          {config.particles.slice(0, 3).map((particle, index) => (
            <motion.div
              key={index}
              className="absolute text-lg"
              style={{
                left: `${20 + index * 20}%`,
                top: `${10 + index * 15}%`
              }}
              animate={particleAnimations.float.animate}
              transition={{
                ...particleAnimations.float.animate.transition,
                delay: index * 0.5
              }}
            >
              {particle}
            </motion.div>
          ))}
        </div>
      )}

      {/* Corner Sparkles */}
      {animated && withGlow && (
        <>
          {[0, 1, 2, 3].map((corner) => (
            <motion.div
              key={corner}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: config.colors.accent,
                [corner === 0 ? 'top' : corner === 1 ? 'top' : 'bottom']: '-4px',
                [corner === 0 || corner === 3 ? 'left' : 'right']: '-4px'
              }}
              animate={particleAnimations.sparkle.animate}
              transition={{
                ...particleAnimations.sparkle.animate.transition,
                delay: corner * 0.3
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
