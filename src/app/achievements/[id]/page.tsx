"use client";

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PixelIcon } from "@/components/ui/pixel-icon";

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
  requirements: string[];
  rewards: {
    type: string;
    value: string;
  }[];
  relatedAchievements: string[];
}

const achievementData: Record<string, Achievement> = {
  '1': {
    id: '1',
    title: 'Pixel Perfectionist',
    description: 'Complete a course with 100% collectibles. Perfect scores and attention to detail are your specialty.',
    iconType: 'bullseye',
    progress: 95,
    maxProgress: 100,
    rarity: 'Epic',
    xp: 1000,
    unlocked: false,
    requirements: [
      'Complete all course modules with 100% score',
      'Collect all bonus materials',
      'Complete all optional assignments',
      'Submit detailed course feedback'
    ],
    rewards: [
      { type: 'XP', value: '1000 XP' },
      { type: 'Badge', value: 'Pixel Perfect Master' },
      { type: 'Title', value: 'The Perfectionist' }
    ],
    relatedAchievements: ['2', '6']
  },
  '2': {
    id: '2',
    title: 'Arcade Ace',
    description: 'Top the leaderboards with your exceptional performance in course assessments.',
    iconType: 'joystick',
    progress: 1,
    maxProgress: 1,
    rarity: 'Rare',
    xp: 500,
    unlocked: true,
    requirements: [
      'Score in the top 1% of any course assessment',
      'Maintain a perfect score streak',
      'Complete advanced challenge questions'
    ],
    rewards: [
      { type: 'XP', value: '500 XP' },
      { type: 'Badge', value: 'High Score Champion' },
      { type: 'Title', value: 'Arcade Legend' }
    ],
    relatedAchievements: ['1', '8']
  },
  '3': {
    id: '3',
    title: 'Old School Slayer',
    description: 'Master all challenges in a course module with the dedication of a retro gamer.',
    iconType: 'sword',
    progress: 8,
    maxProgress: 10,
    rarity: 'Rare',
    xp: 500,
    unlocked: false,
    requirements: [
      'Complete all module challenges',
      'Pass every skill assessment',
      'Submit all assignments early',
      'Help other students with challenges'
    ],
    rewards: [
      { type: 'XP', value: '500 XP' },
      { type: 'Badge', value: 'Challenge Master' },
      { type: 'Title', value: 'The Completionist' }
    ],
    relatedAchievements: ['4', '5']
  },
  '4': {
    id: '4',
    title: '8-Bit Explorer',
    description: 'Discover every hidden gem and bonus content in your learning journey.',
    iconType: 'compass',
    progress: 3,
    maxProgress: 5,
    rarity: 'Common',
    xp: 200,
    unlocked: true,
    requirements: [
      'Find all bonus materials',
      'Access supplementary resources',
      'Complete optional tutorials',
      'Explore advanced topics'
    ],
    rewards: [
      { type: 'XP', value: '200 XP' },
      { type: 'Badge', value: 'Content Explorer' },
      { type: 'Title', value: 'Knowledge Seeker' }
    ],
    relatedAchievements: ['1', '10']
  },
  '5': {
    id: '5',
    title: 'Joystick Jedi',
    description: 'Show complete mastery over course controls and navigation.',
    iconType: 'crossJoysticks',
    progress: 1,
    maxProgress: 1,
    rarity: 'Epic',
    xp: 800,
    unlocked: false,
    requirements: [
      'Complete exercises without errors',
      'Master all keyboard shortcuts',
      'Navigate through content efficiently',
      'Use advanced platform features'
    ],
    rewards: [
      { type: 'XP', value: '800 XP' },
      { type: 'Badge', value: 'Platform Master' },
      { type: 'Title', value: 'Interface Wizard' }
    ],
    relatedAchievements: ['3', '6']
  },
  '6': {
    id: '6',
    title: 'No Continues Needed',
    description: 'Ace every assessment on your first try like a true gaming pro.',
    iconType: 'infinity',
    progress: 4,
    maxProgress: 5,
    rarity: 'Legendary',
    xp: 2000,
    unlocked: false,
    requirements: [
      'Pass all assessments first try',
      'Complete challenges without hints',
      'Submit perfect assignments',
      'Help others succeed'
    ],
    rewards: [
      { type: 'XP', value: '2000 XP' },
      { type: 'Badge', value: 'Perfect Run' },
      { type: 'Title', value: 'The Unstoppable' }
    ],
    relatedAchievements: ['1', '11']
  },
  '7': {
    id: '7',
    title: 'Time Traveller',
    description: 'Progress through course content in perfect chronological order.',
    iconType: 'hourglass',
    progress: 6,
    maxProgress: 6,
    rarity: 'Common',
    xp: 300,
    unlocked: true,
    requirements: [
      'Complete modules in sequence',
      'Follow the learning path',
      'Submit assignments on time',
      'Review previous content regularly'
    ],
    rewards: [
      { type: 'XP', value: '300 XP' },
      { type: 'Badge', value: 'Time Keeper' },
      { type: 'Title', value: 'Chronological Master' }
    ],
    relatedAchievements: ['4', '9']
  },
  '8': {
    id: '8',
    title: 'Bit Boss Beater',
    description: 'Conquer the final assessment with lightning speed and precision.',
    iconType: 'invader',
    progress: 0,
    maxProgress: 1,
    rarity: 'Epic',
    xp: 1000,
    unlocked: false,
    requirements: [
      'Complete final exam under time limit',
      'Score above 90%',
      'Use no reference materials',
      'Complete all sections'
    ],
    rewards: [
      { type: 'XP', value: '1000 XP' },
      { type: 'Badge', value: 'Speed Champion' },
      { type: 'Title', value: 'The Swift' }
    ],
    relatedAchievements: ['2', '11']
  },
  '9': {
    id: '9',
    title: 'Retro Revivalist',
    description: 'Embrace the classic learning methods while mastering modern content.',
    iconType: 'crtScreen',
    progress: 7,
    maxProgress: 10,
    rarity: 'Rare',
    xp: 600,
    unlocked: false,
    requirements: [
      'Use traditional study methods',
      'Create handwritten notes',
      'Build physical project models',
      'Teach others offline'
    ],
    rewards: [
      { type: 'XP', value: '600 XP' },
      { type: 'Badge', value: 'Classic Scholar' },
      { type: 'Title', value: 'Old School Cool' }
    ],
    relatedAchievements: ['7', '10']
  },
  '10': {
    id: '10',
    title: 'Glitch Hunter',
    description: 'Discover hidden features and easter eggs throughout your courses.',
    iconType: 'bug',
    progress: 2,
    maxProgress: 3,
    rarity: 'Epic',
    xp: 800,
    unlocked: false,
    requirements: [
      'Find hidden course content',
      'Discover secret achievements',
      'Unlock bonus materials',
      'Share findings with others'
    ],
    rewards: [
      { type: 'XP', value: '800 XP' },
      { type: 'Badge', value: 'Secret Finder' },
      { type: 'Title', value: 'The Explorer' }
    ],
    relatedAchievements: ['4', '9']
  },
  '11': {
    id: '11',
    title: 'Speedrun Star',
    description: 'Complete course content with incredible speed while maintaining quality.',
    iconType: 'rocket',
    progress: 1,
    maxProgress: 1,
    rarity: 'Legendary',
    xp: 1500,
    unlocked: false,
    requirements: [
      'Complete course in record time',
      'Maintain above 90% accuracy',
      'Submit all work early',
      'Share speed-learning tips'
    ],
    rewards: [
      { type: 'XP', value: '1500 XP' },
      { type: 'Badge', value: 'Speed Demon' },
      { type: 'Title', value: 'The Flash' }
    ],
    relatedAchievements: ['6', '8']
  },
  '12': {
    id: '12',
    title: 'Insert Coin',
    description: 'Begin your learning adventure by starting your first course.',
    iconType: 'coin',
    progress: 1,
    maxProgress: 1,
    rarity: 'Common',
    xp: 100,
    unlocked: true,
    requirements: [
      'Create your account',
      'Enroll in first course',
      'Complete orientation',
      'Set learning goals'
    ],
    rewards: [
      { type: 'XP', value: '100 XP' },
      { type: 'Badge', value: 'First Timer' },
      { type: 'Title', value: 'New Player' }
    ],
    relatedAchievements: ['4', '7']
  }
};

const rarityColors = {
  Common: 'rgb(169, 169, 169)',
  Rare: 'rgb(69, 183, 175)',
  Epic: 'rgb(255, 107, 107)',
  Legendary: 'rgb(255, 215, 0)'
};

export default function AchievementDetailPage() {
  const params = useParams();
  const achievementId = typeof params.id === 'string' ? params.id : '';
  const achievement = achievementData[achievementId];

  if (!achievement) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-press-start">Achievement not found</h1>
        <Link href="/achievements" className="retro-link mt-4 inline-block">
          <ArrowLeft className="inline-block mr-2" />
          Back to Achievements
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/achievements" className="retro-link inline-flex items-center mb-6">
        <ArrowLeft className="mr-2" />
        Back to Achievements
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="retro-card"
          >
            <div className="flex items-start gap-6 mb-8">
              <PixelIcon
                type={achievement.iconType}
                rarity={achievement.rarity}
                animate={achievement.unlocked}
                size="lg"
                className="p-2"
              />
              <div className="flex-1">
                <h1 className="font-press-start text-2xl mb-2">{achievement.title}</h1>
                <p className="font-vt323 text-lg mb-4 opacity-80">{achievement.description}</p>
                <div
                  className="text-sm font-vt323 px-3 py-1 rounded-full inline-block"
                  style={{ backgroundColor: `${rarityColors[achievement.rarity]}20`, color: rarityColors[achievement.rarity] }}
                >
                  {achievement.rarity}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center font-vt323 text-lg mb-2">
                <span>Progress</span>
                <span>{achievement.progress}/{achievement.maxProgress}</span>
              </div>
              <div className="h-4 bg-[var(--retro-bg)] rounded-full overflow-hidden border-2 border-[var(--retro-primary)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full"
                  style={{ backgroundColor: rarityColors[achievement.rarity] }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-press-start text-xl mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {achievement.requirements.map((req, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 font-vt323"
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--retro-primary)]" />
                      {req}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-press-start text-xl mb-4">Rewards</h2>
                <ul className="space-y-3">
                  {achievement.rewards.map((reward, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 font-vt323"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: rarityColors[achievement.rarity] }}
                      />
                      <span className="opacity-80">{reward.type}:</span>
                      <span>{reward.value}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="retro-card sticky top-24"
          >
            <h2 className="font-press-start text-xl mb-4">Related Achievements</h2>
            <div className="space-y-4">
              {achievement.relatedAchievements.map((relatedId) => {
                const related = achievementData[relatedId];
                if (!related) return null;

                return (
                  <Link href={`/achievements/${related.id}`} key={related.id}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-[var(--retro-bg)]/5 hover:bg-[var(--retro-bg)]/10 transition-colors cursor-pointer"
                    >
                      <PixelIcon
                        type={related.iconType}
                        rarity={related.rarity}
                        size="sm"
                        animate={false}
                      />
                      <div>
                        <h3 className="font-vt323 text-lg font-bold">{related.title}</h3>
                        <div
                          className="text-xs font-vt323 mt-1"
                          style={{ color: rarityColors[related.rarity] }}
                        >
                          {related.rarity}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}