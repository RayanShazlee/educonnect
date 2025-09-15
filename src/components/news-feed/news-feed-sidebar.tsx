import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RetroIcon } from '@/components/ui/retro-icon'
import { 
  Trophy, 
  BookOpen, 
  TrendingUp,
  Bell,
  Users,
  Activity,
  Star,
  ArrowRight,
  Flame
} from 'lucide-react'
import { 
  recentAchievements, 
  latestCourses, 
  trendingTopics,
  featuredAchievements,
  popularCourses
} from '@/lib/news-feed-data'
import Link from 'next/link'

const NewsFeedSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="retro-card">
          <CardHeader className="pb-3">
            <CardTitle className="retro-subtitle flex items-center gap-2">
              <Activity className="w-5 h-5 text-retro-accent" />
              Your Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-vt323 text-sm">Posts this week</span>
              <Badge variant="secondary" className="font-vt323">12</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-vt323 text-sm">Comments</span>
              <Badge variant="secondary" className="font-vt323">47</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-vt323 text-sm">Likes received</span>
              <Badge variant="secondary" className="font-vt323">189</Badge>
            </div>
            <Button variant="ghost" className="w-full font-vt323 text-xs hover:text-retro-primary">
              View Full Stats
            </Button>
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
          <CardHeader className="pb-3">
            <CardTitle className="retro-subtitle flex items-center gap-2">
              <Flame className="w-5 h-5 text-retro-accent" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trendingTopics.slice(0, 5).map((topic, index) => (
                <motion.div
                  key={topic.tag}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 group cursor-pointer hover:bg-retro-bg/5 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-retro-primary/20 text-retro-primary text-xs font-press-start">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-vt323 text-sm group-hover:text-retro-primary transition-colors">
                      {topic.tag}
                    </div>
                    <div className="text-xs text-retro-text/60">
                      {topic.count} posts
                    </div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </motion.div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              className="w-full font-vt323 text-xs hover:text-retro-primary mt-3"
            >
              View All Topics
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="retro-card">
          <CardHeader className="pb-3">
            <CardTitle className="retro-subtitle flex items-center gap-2">
              <Trophy className="w-5 h-5 text-retro-accent" />
              Latest Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAchievements.map((item, index) => (
                <motion.div
                  key={item.achievement.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 group cursor-pointer hover:bg-retro-bg/5 p-2 rounded-lg transition-colors"
                >
                  <div className="text-2xl">{item.user.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <RetroIcon
                        icon={<Trophy className="w-full h-full" />}
                        rarity={item.achievement.rarity}
                        size="sm"
                      />
                      <div className="truncate">
                        <div className="font-vt323 text-sm truncate group-hover:text-retro-accent transition-colors">
                          {item.user.name}
                        </div>
                        <div className="text-xs text-retro-text/60 truncate">
                          {item.achievement.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-retro-text/40">{item.timestamp}</div>
                </motion.div>
              ))}
            </div>
            <Link href="/achievements">
              <Button 
                variant="ghost" 
                className="w-full font-vt323 text-xs hover:text-retro-accent transition-colors mt-3"
              >
                View All Achievements
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Latest Courses */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="retro-card">
          <CardHeader className="pb-3">
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
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group cursor-pointer hover:bg-retro-bg/5 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <RetroIcon
                      icon={<BookOpen className="w-full h-full" />}
                      rarity="Rare"
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-vt323 text-sm truncate group-hover:text-retro-primary transition-colors mb-1">
                        {course.title}
                      </div>
                      <div className="text-xs text-retro-text/60 mb-2">
                        by {course.instructor.name} • {course.level}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-retro-text/60">
                        <span>{course.duration}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{course.students} students</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link href="/courses">
              <Button 
                variant="ghost" 
                className="w-full font-vt323 text-xs hover:text-retro-primary transition-colors mt-3"
              >
                Browse All Courses
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Community Highlights */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="retro-card">
          <CardHeader className="pb-3">
            <CardTitle className="retro-subtitle flex items-center gap-2">
              <Users className="w-5 h-5 text-retro-accent" />
              Community Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-vt323 text-sm">🤖 AI Researchers</span>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  15 online
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-vt323 text-sm">💻 Web Dev Masters</span>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  23 online
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-vt323 text-sm">📊 Data Science Hub</span>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  8 online
                </div>
              </div>
            </div>
            <Link href="/communities">
              <Button 
                variant="ghost" 
                className="w-full font-vt323 text-xs hover:text-retro-primary transition-colors mt-3"
              >
                Explore Communities
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Notifications */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="retro-card">
          <CardHeader className="pb-3">
            <CardTitle className="retro-subtitle flex items-center gap-2">
              <Bell className="w-5 h-5 text-retro-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { text: 'Alex liked your post about React patterns', time: '5m ago' },
                { text: 'New course recommendation available', time: '1h ago' },
                { text: 'Sarah commented on your achievement', time: '2h ago' },
                { text: 'Weekly learning summary ready', time: '1d ago' }
              ].map((notification, index) => (
                <motion.div
                  key={`${notification.text}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 group cursor-pointer hover:bg-retro-bg/5 p-2 rounded-lg transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-retro-accent mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-vt323 text-sm group-hover:text-retro-accent transition-colors">
                      {notification.text}
                    </div>
                    <div className="text-xs text-retro-text/40">{notification.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              className="w-full font-vt323 text-xs hover:text-retro-accent transition-colors mt-3"
            >
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default NewsFeedSidebar
