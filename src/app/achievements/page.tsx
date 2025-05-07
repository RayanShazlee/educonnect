"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Search, Trophy, Star, Users, Book, Zap, Brain, Crown, Clock } from "lucide-react"
import Link from "next/link"
import { PixelIcon } from "@/components/ui/pixel-icon"

type Achievement = {
  id: string;
  title: string;
  description: string;
  iconType: 'bullseye' | 'joystick' | 'sword' | 'compass' | 'crossJoysticks' | 'infinity' | 'hourglass' | 'invader' | 'crtScreen' | 'bug' | 'rocket' | 'note' | 'coin' | 'heart' | 'crown';
  progress: number;
  maxProgress: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  xp: number;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Pixel Perfectionist',
    description: 'Complete a course with 100% collectibles',
    iconType: 'bullseye',
    progress: 95,
    maxProgress: 100,
    rarity: 'Epic',
    xp: 1000,
    unlocked: false
  },
  {
    id: '2',
    title: 'Arcade Ace',
    description: 'Achieved a top score in course assessments',
    iconType: 'joystick',
    progress: 1,
    maxProgress: 1,
    rarity: 'Rare',
    xp: 500,
    unlocked: true
  },
  {
    id: '3',
    title: 'Old School Slayer',
    description: 'Complete all challenges in a course module',
    iconType: 'sword',
    progress: 8,
    maxProgress: 10,
    rarity: 'Rare',
    xp: 500,
    unlocked: false
  },
  {
    id: '4',
    title: '8-Bit Explorer',
    description: 'Discover all bonus content in a course',
    iconType: 'compass',
    progress: 3,
    maxProgress: 5,
    rarity: 'Common',
    xp: 200,
    unlocked: true
  },
  {
    id: '5',
    title: 'Joystick Jedi',
    description: 'Complete a perfect practice session',
    iconType: 'crossJoysticks',
    progress: 1,
    maxProgress: 1,
    rarity: 'Epic',
    xp: 800,
    unlocked: false
  },
  {
    id: '6',
    title: 'No Continues Needed',
    description: 'Pass all assessments on first attempt',
    iconType: 'infinity',
    progress: 4,
    maxProgress: 5,
    rarity: 'Legendary',
    xp: 2000,
    unlocked: false
  },
  {
    id: '7',
    title: 'Time Traveller',
    description: 'Complete course modules in sequence',
    iconType: 'hourglass',
    progress: 6,
    maxProgress: 6,
    rarity: 'Common',
    xp: 300,
    unlocked: true
  },
  {
    id: '8',
    title: 'Bit Boss Beater',
    description: 'Complete final assessment under time limit',
    iconType: 'invader',
    progress: 0,
    maxProgress: 1,
    rarity: 'Epic',
    xp: 1000,
    unlocked: false
  },
  {
    id: '9',
    title: 'Retro Revivalist',
    description: 'Use all classic learning features',
    iconType: 'crtScreen',
    progress: 7,
    maxProgress: 10,
    rarity: 'Rare',
    xp: 600,
    unlocked: false
  },
  {
    id: '10',
    title: 'Glitch Hunter',
    description: 'Find hidden easter eggs in courses',
    iconType: 'bug',
    progress: 2,
    maxProgress: 3,
    rarity: 'Epic',
    xp: 800,
    unlocked: false
  },
  {
    id: '11',
    title: 'Speedrun Star',
    description: 'Complete course in record time',
    iconType: 'rocket',
    progress: 1,
    maxProgress: 1,
    rarity: 'Legendary',
    xp: 1500,
    unlocked: false
  },
  {
    id: '12',
    title: 'Insert Coin',
    description: 'Start your first learning journey',
    iconType: 'coin',
    progress: 1,
    maxProgress: 1,
    rarity: 'Common',
    xp: 100,
    unlocked: true
  }
];

const rarityColors: Record<Achievement['rarity'], string> = {
  Common: 'rgb(169, 169, 169)',
  Rare: 'rgb(69, 183, 175)',
  Epic: 'rgb(255, 107, 107)',
  Legendary: 'rgb(255, 215, 0)'
}

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isHovered, setIsHovered] = useState<string | null>(null)
  
  const totalXP = achievements.reduce((sum, achievement) => {
    return sum + (achievement.unlocked ? achievement.xp : 0);
  }, 0);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="retro-title mb-4">Achievement Badges</h1>
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
              <p className="text-lg text-retro-text/80">
                Complete challenges and earn badges to showcase your achievements.
              </p>
            </div>
            <div className="relative mt-4 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-retro-text/50 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 retro-input"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {achievements.map((achievement) => (
                <Link href={`/achievements/${achievement.id}`} key={achievement.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`retro-card ${!achievement.unlocked && 'opacity-75'}`}
                  >
                    <div className="flex items-start gap-4">
                      <PixelIcon
                        type={achievement.iconType}
                        rarity={achievement.rarity}
                        animate={achievement.unlocked}
                        size="lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-press-start text-sm mb-1">{achievement.title}</h3>
                        <p className="font-vt323 text-sm opacity-80 mb-2">{achievement.description}</p>
                        <div
                          className="text-xs font-vt323 px-2 py-1 rounded-full inline-block"
                          style={{ backgroundColor: `${rarityColors[achievement.rarity]}20`, color: rarityColors[achievement.rarity] }}
                        >
                          {achievement.rarity}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-center font-vt323 text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="h-2 bg-[var(--retro-bg)] rounded-full overflow-hidden border-2 border-[var(--retro-primary)]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          transition={{ duration: 1 }}
                          className="h-full"
                          style={{ backgroundColor: rarityColors[achievement.rarity] }}
                        />
                      </div>
                      <div className="flex justify-between items-center font-vt323 text-sm mt-2">
                        <span>{achievement.unlocked ? 'Completed!' : 'In Progress'}</span>
                        <span>{achievement.xp} XP</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="md:w-80 space-y-6">
          {/* Your Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="retro-card min-h-[200px]">
              <CardHeader>
                <CardTitle className="retro-subtitle flex items-center gap-2">
                  <Star className="w-5 h-5 text-retro-accent" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-retro-text/90">
                      <span className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-retro-accent" />
                        Total Badges
                      </span>
                      <span>{totalCount}</span>
                    </div>
                    <div className="h-2 bg-[rgb(42,54,59)] rounded-full border-2 border-[rgb(69,183,175)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-[rgb(255,107,107)]"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-retro-text/90">
                      <span className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-retro-accent" />
                        Completion Rate
                      </span>
                      <span>{((unlockedCount / totalCount) * 100).toFixed(2)}%</span>
                    </div>
                    <div className="h-2 bg-[rgb(42,54,59)] rounded-full border-2 border-[rgb(69,183,175)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-[rgb(255,107,107)]"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-retro-text/90">
                      <span className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-retro-accent" />
                        Total XP
                      </span>
                      <span>{totalXP}</span>
                    </div>
                    <div className="h-2 bg-[rgb(42,54,59)] rounded-full border-2 border-[rgb(69,183,175)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-[rgb(255,107,107)]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Unlocks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="retro-card min-h-[200px]">
              <CardHeader>
                <CardTitle className="retro-subtitle flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-retro-accent" />
                  Recent Unlocks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-lg bg-retro-primary/10 border-2 border-[rgb(69,183,175)] flex items-center justify-center shadow-[2px_2px_0px_rgb(69,183,175)]"
                      >
                        <PixelIcon
                          type={achievement.iconType}
                          rarity={achievement.rarity}
                          animate={achievement.unlocked}
                          size="md"
                        />
                      </motion.div>
                      <div>
                        <div className="font-medium text-black group-hover:text-[rgb(255,107,107)] transition-colors">
                          {achievement.title}
                        </div>
                        <div className="text-sm text-retro-text/60">2 days ago</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}