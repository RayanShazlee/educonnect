'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RetroIcon } from "@/components/ui/retro-icon";
import { 
  Bell, 
  BookOpen, 
  Star, 
  MessageSquare, 
  Trophy, 
  ThumbsUp,
  Share2,
  Filter,
  Search,
  Brain,
  Crown,
  Zap,
  Code,
  Palette
} from 'lucide-react';
import Link from 'next/link';

interface User {
  name: string;
  avatar: string;
  title: string;
}

interface Achievement {
  title: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

interface Course {
  title: string;
  duration: string;
  level: string;
}

type NewsItem = {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
} & (
  | {
      type: 'achievement';
      achievement: Achievement;
    }
  | {
      type: 'course';
      course: Course;
    }
  | {
      type: 'discussion';
      tags: string[];
    }
);

// Mock data for news feed items
const newsItems: NewsItem[] = [
  {
    id: '1',
    type: 'achievement',
    user: {
      name: 'Alex Chen',
      avatar: '👨‍💻',
      title: 'Code Enthusiast'
    },
    content: 'Just earned the Coding Master badge! 🏆',
    achievement: {
      title: 'Coding Master',
      description: 'Completed all programming courses',
      rarity: 'Legendary' as const
    },
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
    shares: 3
  },
  {
    id: '2',
    type: 'achievement',
    user: {
      name: 'Maria Rodriguez',
      avatar: '👩‍🎓',
      title: 'Dedicated Learner'
    },
    content: 'Excited to earn the Knowledge Seeker badge! 📚 Always striving to learn more!',
    achievement: {
      title: 'Knowledge Seeker',
      description: 'Completed courses across 5 different subjects',
      rarity: 'Epic' as const
    },
    timestamp: '3 hours ago',
    likes: 42,
    comments: 15,
    shares: 8
  },
  {
    id: '3',
    type: 'course',
    user: {
      name: 'Sarah Johnson',
      avatar: '👩‍🏫',
      title: 'Learning Mentor'
    },
    content: 'Just published a new course on Advanced JavaScript! Check it out! 🚀',
    course: {
      title: 'Advanced JavaScript Mastery',
      duration: '8 hours',
      level: 'Advanced'
    },
    timestamp: '4 hours ago',
    likes: 45,
    comments: 12,
    shares: 15
  },
  {
    id: '4',
    type: 'discussion',
    user: {
      name: 'Mike Wilson',
      avatar: '🧑‍🎓',
      title: 'Quick Learner'
    },
    content: 'Great discussion on machine learning algorithms in the AI course! Here are my key takeaways...',
    tags: ['AI', 'Machine Learning', 'Discussion'],
    timestamp: '6 hours ago',
    likes: 32,
    comments: 18,
    shares: 7
  },
  {
    id: '5',
    type: 'achievement',
    user: {
      name: 'Emily Davis',
      avatar: '👩‍💻',
      title: 'Community Leader'
    },
    content: 'Reached a milestone! Now a certified Community Leader! 👑',
    achievement: {
      title: 'Community Leader',
      description: 'Helped 50 students in discussions',
      rarity: 'Epic' as const
    },
    timestamp: '8 hours ago',
    likes: 56,
    comments: 23,
    shares: 5
  }
];

// Add mock data for latest achievements
const latestAchievements = [
  {
    user: 'Alex Chen',
    avatar: '👨‍💻',
    achievement: {
      title: 'Coding Master',
      rarity: 'Legendary' as const,
      icon: <Brain className="w-full h-full" />
    },
    timestamp: '2 hours ago'
  },
  {
    user: 'Emily Davis',
    avatar: '👩‍💻',
    achievement: {
      title: 'Community Leader',
      rarity: 'Epic' as const,
      icon: <Crown className="w-full h-full" />
    },
    timestamp: '8 hours ago'
  },
  {
    user: 'David Kim',
    avatar: '🧑‍💻',
    achievement: {
      title: 'Quick Learner',
      rarity: 'Rare' as const,
      icon: <Zap className="w-full h-full" />
    },
    timestamp: '1 day ago'
  }
];

// Add mock data for latest courses
const latestCourses = [
  {
    title: 'Advanced JavaScript Mastery',
    instructor: 'Sarah Johnson',
    level: 'Advanced',
    icon: <Code className="w-full h-full" />
  },
  {
    title: 'Machine Learning Fundamentals',
    instructor: 'Dr. Michael Brown',
    level: 'Intermediate',
    icon: <Brain className="w-full h-full" />
  },
  {
    title: 'UI/UX Design Principles',
    instructor: 'Lisa Chen',
    level: 'Beginner',
    icon: <Palette className="w-full h-full" />
  }
];

export default function NewsFeedPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
            <h1 className="retro-title mb-4">News Feed</h1>
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
              <p className="text-lg text-retro-text/80">
                Stay updated with your learning community
              </p>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-retro-text/50 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search news feed..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 retro-input"
                />
              </div>
              <Button
                variant="outline"
                className="retro-button-secondary flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <AnimatePresence>
              {newsItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="retro-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{item.user.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-press-start text-sm">{item.user.name}</h3>
                        <span className="text-xs text-retro-text/60">•</span>
                        <span className="text-xs text-retro-text/60">{item.timestamp}</span>
                      </div>
                      <p className="text-xs text-retro-text/60 mb-2">{item.user.title}</p>
                      <p className="font-vt323 text-lg mb-4">{item.content}</p>

                      {item.type === 'achievement' && (
                        <div className="bg-[var(--retro-bg)]/5 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-3">
                            <RetroIcon
                              icon={<Trophy className="w-full h-full" />}
                              rarity={item.achievement.rarity}
                              size="md"
                            />
                            <div>
                              <h4 className="font-press-start text-sm">{item.achievement.title}</h4>
                              <p className="text-sm text-retro-text/60">{item.achievement.description}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.type === 'course' && (
                        <div className="bg-[var(--retro-bg)]/5 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-3">
                            <RetroIcon
                              icon={<BookOpen className="w-full h-full" />}
                              rarity="Rare"
                              size="md"
                            />
                            <div>
                              <h4 className="font-press-start text-sm">{item.course.title}</h4>
                              <p className="text-sm text-retro-text/60">
                                {item.course.duration} • {item.course.level}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.type === 'discussion' && item.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-vt323">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-6 text-retro-text/60">
                        <button className="flex items-center gap-2 hover:text-retro-accent transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{item.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-retro-accent transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm">{item.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-retro-accent transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">{item.shares}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="md:w-80 space-y-6">
          {/* Latest Achievements Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="retro-card">
              <CardHeader>
                <CardTitle className="retro-subtitle flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-retro-accent" />
                  Latest Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {latestAchievements.map((item, index) => (
                    <motion.div
                      key={item.achievement.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 group cursor-pointer hover:bg-retro-bg/5 p-2 rounded-lg transition-colors"
                    >
                      <div className="text-2xl">{item.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <RetroIcon
                            icon={item.achievement.icon}
                            rarity={item.achievement.rarity}
                            size="sm"
                          />
                          <div className="truncate">
                            <div className="font-vt323 text-sm truncate">{item.user}</div>
                            <div className="text-xs text-retro-text/60 truncate">
                              {item.achievement.title}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-retro-text/40">{item.timestamp}</div>
                    </motion.div>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="w-full font-vt323 hover:text-retro-accent transition-colors"
                  >
                    View All Achievements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Latest Courses Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="retro-card">
              <CardHeader>
                <CardTitle className="retro-subtitle flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-retro-accent" />
                  Latest Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {latestCourses.map((course, index) => (
                    <motion.div
                      key={course.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="group cursor-pointer hover:bg-retro-bg/5 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <RetroIcon
                          icon={course.icon}
                          rarity="Rare"
                          size="sm"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-vt323 text-sm truncate group-hover:text-retro-accent transition-colors">
                            {course.title}
                          </div>
                          <div className="text-xs text-retro-text/60 truncate">
                            by {course.instructor} • {course.level}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="w-full font-vt323 hover:text-retro-accent transition-colors"
                  >
                    View All Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="retro-card">
              <CardHeader>
                <CardTitle className="retro-subtitle flex items-center gap-2">
                  <Star className="w-5 h-5 text-retro-accent" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['JavaScript', 'Machine Learning', 'Web Development', 'Data Science', 'UI Design'].map((topic, index) => (
                    <motion.div
                      key={topic}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div className="text-2xl">#{index + 1}</div>
                      <div className="font-vt323 group-hover:text-retro-accent transition-colors">
                        {topic}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="retro-card">
              <CardHeader>
                <CardTitle className="retro-subtitle flex items-center gap-2">
                  <Bell className="w-5 h-5 text-retro-accent" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    'New course recommendation',
                    'Achievement unlocked',
                    'Discussion reply',
                    'Course completion'
                  ].map((notification, index) => (
                    <motion.div
                      key={notification}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div className="w-2 h-2 rounded-full bg-retro-accent" />
                      <div className="font-vt323 text-sm group-hover:text-retro-accent transition-colors">
                        {notification}
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
  );
} 