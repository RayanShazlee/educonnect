'use client'

import { motion } from "framer-motion"
import { Brain, Code, BarChart3, Palette, Database, Cpu, Smartphone, Globe, Camera, Music, Briefcase, Calculator } from "lucide-react"

interface RetroTopicIconProps {
  topic: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Topic icon mapping with colors and themes
const topicConfig = {
  'Machine Learning': {
    icon: Brain,
    colors: {
      primary: '#ff6b6b',
      secondary: '#ff8e8e', 
      accent: '#ffb3b3',
      glow: 'rgba(255, 107, 107, 0.4)'
    },
    bgPattern: 'neural-network',
    particles: ['🧠', '⚡', '🤖']
  },
  'React Development': {
    icon: Code,
    colors: {
      primary: '#61dafb',
      secondary: '#7ee3fc',
      accent: '#9be9fd',
      glow: 'rgba(97, 218, 251, 0.4)'
    },
    bgPattern: 'code-matrix',
    particles: ['⚛️', '🔧', '💫']
  },
  'Data Science': {
    icon: BarChart3,
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#6ee7b7',
      glow: 'rgba(16, 185, 129, 0.4)'
    },
    bgPattern: 'data-grid',
    particles: ['📊', '📈', '🔍']
  },
  'UI/UX Design': {
    icon: Palette,
    colors: {
      primary: '#a855f7',
      secondary: '#c084fc',
      accent: '#d8b4fe',
      glow: 'rgba(168, 85, 247, 0.4)'
    },
    bgPattern: 'design-grid',
    particles: ['🎨', '✨', '🖌️']
  },
  'Database': {
    icon: Database,
    colors: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      accent: '#fcd34d',
      glow: 'rgba(245, 158, 11, 0.4)'
    },
    bgPattern: 'storage-matrix',
    particles: ['🗄️', '⚡', '🔐']
  },
  'AI/ML': {
    icon: Cpu,
    colors: {
      primary: '#ef4444',
      secondary: '#f87171',
      accent: '#fca5a5',
      glow: 'rgba(239, 68, 68, 0.4)'
    },
    bgPattern: 'circuit-board',
    particles: ['🤖', '🧠', '⚡']
  },
  'Mobile Development': {
    icon: Smartphone,
    colors: {
      primary: '#06b6d4',
      secondary: '#22d3ee',
      accent: '#67e8f9',
      glow: 'rgba(6, 182, 212, 0.4)'
    },
    bgPattern: 'mobile-grid',
    particles: ['📱', '🚀', '⚡']
  },
  'Web Development': {
    icon: Globe,
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#c4b5fd',
      glow: 'rgba(139, 92, 246, 0.4)'
    },
    bgPattern: 'web-matrix',
    particles: ['🌐', '💻', '⚡']
  }
}

// Default fallback for unknown topics
const defaultConfig = {
  icon: Code,
  colors: {
    primary: '#6366f1',
    secondary: '#818cf8',
    accent: '#a5b4fc',
    glow: 'rgba(99, 102, 241, 0.4)'
  },
  bgPattern: 'default-grid',
  particles: ['💫', '⚡', '🔥']
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16'
}

export function RetroTopicIcon({ topic, size = 'md', className = '' }: RetroTopicIconProps) {
  const config = topicConfig[topic as keyof typeof topicConfig] || defaultConfig
  const IconComponent = config.icon
  const sizeClass = sizeClasses[size]

  return (
    <motion.div
      className={`relative ${sizeClass} ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Animated background with pixelated pattern */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${config.colors.primary}20, ${config.colors.secondary}20)`,
          border: `1px solid ${config.colors.primary}40`
        }}
        animate={{
          boxShadow: [
            `0 0 10px ${config.colors.glow}`,
            `0 0 20px ${config.colors.glow}`,
            `0 0 10px ${config.colors.glow}`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Pixelated grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(${config.colors.primary}40 1px, transparent 1px),
              linear-gradient(90deg, ${config.colors.primary}40 1px, transparent 1px)
            `,
            backgroundSize: '4px 4px'
          }}
        />
        
        {/* Animated scanlines */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${config.colors.primary}20 2px,
              ${config.colors.primary}20 4px
            )`
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Main icon with glow effect */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            filter: [
              `drop-shadow(0 0 4px ${config.colors.glow})`,
              `drop-shadow(0 0 8px ${config.colors.glow})`,
              `drop-shadow(0 0 4px ${config.colors.glow})`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <IconComponent 
            className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'}`}
            style={{ color: config.colors.primary }}
          />
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {config.particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute text-xs opacity-60"
            style={{
              left: `${20 + index * 25}%`,
              top: `${10 + index * 20}%`
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2 + index * 0.5,
              repeat: Infinity,
              delay: index * 0.7,
              ease: "easeInOut"
            }}
          >
            {particle}
          </motion.div>
        ))}
      </div>

      {/* Corner sparkles */}
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 rounded-full opacity-80"
        style={{ backgroundColor: config.colors.accent }}
        animate={{
          scale: [0.5, 1.5, 0.5],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full opacity-60"
        style={{ backgroundColor: config.colors.secondary }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
      />

      {/* Holographic shine effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent 30%, ${config.colors.accent}80 50%, transparent 70%)`
        }}
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2
        }}
      />
    </motion.div>
  )
}
