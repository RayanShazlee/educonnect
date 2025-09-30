'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RetroIcon } from "@/components/ui/retro-icon"
import { RetroSectionLogo } from "@/components/ui/retro-section-logo"
import { RetroStatIcon } from "@/components/ui/retro-stat-icon"
import { RetroTopicIcon } from "@/components/ui/retro-topic-icon"
import { RetroAchievementIcon } from "@/components/ui/retro-achievement-icon"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { 
  BookOpen, 
  Users, 
  Trophy, 
  MessageSquare, 
  TrendingUp, 
  Star, 
  Target,
  Zap,
  Heart,
  ArrowRight,
  Rocket,
  Gamepad2,
  Brain,
  Code,
  Palette,
  Settings
} from "lucide-react"

// TypeScript interfaces for type safety
interface TrendingItem {
  name: string
  posts: number
  growth: string
}

interface AchievementItem {
  name: string
  user: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
}

interface TrendingSection {
  type: 'trending'
  title: string
  items: TrendingItem[]
}

interface AchievementSection {
  type: 'achievements'
  title: string
  items: AchievementItem[]
}

type FeaturedSection = TrendingSection | AchievementSection

// Type guard functions for type safety
function isTrendingSection(section: FeaturedSection): section is TrendingSection {
  return section.type === 'trending'
}

function isAchievementSection(section: FeaturedSection): section is AchievementSection {
  return section.type === 'achievements'
}

// Featured sections data
const heroFeatures = [
  {
    id: 'newsfeed',
    title: "News Feed",
    description: "Stay updated with the latest posts, achievements, and discussions from the EduConnect community.",
    icon: <RetroSectionLogo sectionId="newsfeed" size="lg" />,
    rarity: "Epic" as const,
    link: "/news-feed",
    stats: "234 active posts",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30"
  },
  {
    id: 'courses',
    title: "Courses",
    description: "Discover and enroll in courses from top educators across various subjects and skill levels.",
    icon: <RetroSectionLogo sectionId="courses" size="lg" />,
    rarity: "Legendary" as const,
    link: "/courses", 
    stats: "156 courses available",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30"
  },
  {
    id: 'communities',
    title: "Communities",
    description: "Join communities of learners and educators to collaborate, share knowledge, and grow together.",
    icon: <RetroSectionLogo sectionId="communities" size="lg" />,
    rarity: "Rare" as const,
    link: "/communities",
    stats: "89 active communities",
    color: "from-purple-500/20 to-pink-500/20", 
    borderColor: "border-purple-500/30"
  },
  {
    id: 'achievements',
    title: "Achievements",
    description: "Track your progress, unlock badges, and celebrate milestones in your learning journey.",
    icon: <RetroSectionLogo sectionId="achievements" size="lg" />,
    rarity: "Epic" as const,
    link: "/achievements",
    stats: "1.2k achievements unlocked",
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30"
  }
]

const quickStats = [
  { label: "Active Learners", value: "12.4K", trend: "+15%", icon: <RetroStatIcon type="learners" size="sm" /> },
  { label: "Courses Completed", value: "3.2K", trend: "+23%", icon: <RetroStatIcon type="courses" size="sm" /> },
  { label: "Achievements Earned", value: "8.7K", trend: "+18%", icon: <RetroStatIcon type="achievements" size="sm" /> },
  { label: "Community Posts", value: "45.6K", trend: "+12%", icon: <RetroStatIcon type="posts" size="sm" /> }
]

const quickActions = [
  {
    title: "Create Resume",
    description: "Build your professional resume",
    icon: <RetroSectionLogo sectionId="resume" size="sm" />,
    link: "/resume",
    color: "bg-retro-primary/20"
  },
  {
    title: "Browse Wishlist", 
    description: "View saved courses",
    icon: <RetroSectionLogo sectionId="wishlist" size="sm" />,
    link: "/wishlist",
    color: "bg-retro-accent/20"
  },
  {
    title: "Profile Settings",
    description: "Customize your profile",
    icon: <RetroSectionLogo sectionId="settings" size="sm" />,
    link: "/settings", 
    color: "bg-green-500/20"
  }
]

const featuredContent: FeaturedSection[] = [
  {
    type: "trending",
    title: "Trending Topics",
    items: [
      { name: "Machine Learning", posts: 234, growth: "+15%" },
      { name: "React Development", posts: 189, growth: "+23%" },
      { name: "Data Science", posts: 156, growth: "+12%" },
      { name: "UI/UX Design", posts: 143, growth: "+18%" },
      { name: "AI/ML", posts: 98, growth: "+25%" },
      { name: "Mobile Development", posts: 87, growth: "+20%" }
    ]
  },
  {
    type: "achievements", 
    title: "Recent Achievements",
    items: [
      { name: "Algorithm Master", user: "Alex Chen", rarity: "Legendary" },
      { name: "Code Mentor", user: "Sarah Johnson", rarity: "Epic" },
      { name: "Community Helper", user: "Mike Wilson", rarity: "Rare" },
      { name: "First Course", user: "David Park", rarity: "Common" },
      { name: "Speed Learner", user: "Emma Davis", rarity: "Rare" },
      { name: "Course Master", user: "John Smith", rarity: "Legendary" }
    ]
  }
]

export default function Home() {
  const { user, isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen space-y-8">
      {/* Hero Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="font-press-start text-4xl md:text-6xl mb-4 text-retro-primary">
              🎮 EduConnect
            </h1>
            <p className="font-vt323 text-xl md:text-2xl text-retro-text/80 max-w-3xl mx-auto mb-6">
              The ultimate retro-themed educational platform where learning meets gaming. 
              Connect with peers, unlock achievements, and level up your skills!
            </p>
            {!isAuthenticated && (
              <div className="flex gap-4 justify-center mb-6">
                <Link href="/sign-up">
                  <Button className="retro-button text-lg px-8 py-4">
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" className="retro-button-secondary text-lg px-8 py-4">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explore Courses
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {quickStats.map((stat, index) => (
              <Card key={stat.label} className="retro-card text-center">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center mb-3">
                    {stat.icon}
                  </div>
                  <div className="font-press-start text-2xl text-retro-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="font-vt323 text-sm text-retro-text/60 mb-2">
                    {stat.label}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Community Activity & Platform Highlights */}
      <section className="py-12 bg-retro-bg/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-press-start text-2xl text-retro-primary mb-3">
              🏆 Platform Highlights
            </h2>
            <p className="font-vt323 text-lg text-retro-text/80 max-w-2xl mx-auto">
              See what's happening across the EduConnect community - from latest achievements to popular courses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Community Posts */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="retro-card h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="font-press-start text-lg text-retro-primary flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Latest Posts
                  </CardTitle>
                  <CardDescription className="font-vt323 text-retro-text/70">
                    Hot discussions from the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "React 18 Performance Tips",
                      author: "Sarah Chen",
                      community: "Web Development Hub",
                      replies: 23,
                      likes: 45,
                      timeAgo: "2h ago",
                      topic: "React"
                    },
                    {
                      title: "ML Model Deployment Guide",
                      author: "Alex Rodriguez",
                      community: "AI/ML Enthusiasts",
                      replies: 18,
                      likes: 38,
                      timeAgo: "4h ago",
                      topic: "Machine Learning"
                    },
                    {
                      title: "Career Switch to Tech",
                      author: "Mike Thompson",
                      community: "Career Advice",
                      replies: 31,
                      likes: 52,
                      timeAgo: "6h ago",
                      topic: "Career Advice"
                    },
                    {
                      title: "Python Data Analysis Tips",
                      author: "Emma Wilson",
                      community: "Data Science",
                      replies: 15,
                      likes: 29,
                      timeAgo: "8h ago",
                      topic: "Python"
                    }
                  ].map((post, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-3 rounded-lg bg-retro-bg/50 border border-retro-text/10 hover:border-retro-accent/30 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-vt323 font-bold text-sm text-retro-text group-hover:text-retro-primary transition-colors mb-1">
                            {post.title}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-retro-text/60">
                            <span>by {post.author}</span>
                            <span>•</span>
                            <span>{post.community}</span>
                          </div>
                        </div>
                        <RetroTopicIcon topic={post.topic} size="sm" />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3 text-retro-text/60">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {post.replies}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes}
                          </span>
                        </div>
                        <span className="text-retro-text/50">{post.timeAgo}</span>
                      </div>
                    </motion.div>
                  ))}
                  <Button variant="ghost" className="w-full font-vt323 text-sm hover:text-retro-primary mt-4">
                    View All Posts <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="retro-card h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="font-press-start text-lg text-retro-primary flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Latest Achievements
                  </CardTitle>
                  <CardDescription className="font-vt323 text-retro-text/70">
                    Recently unlocked by learners
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "Algorithm Master",
                      description: "Solved 100+ coding challenges",
                      user: "Alex Chen",
                      rarity: "Legendary" as const,
                      timeAgo: "1h ago",
                      xpEarned: 500
                    },
                    {
                      name: "Code Mentor",
                      description: "Helped 50+ community members",
                      user: "Sarah Johnson",
                      rarity: "Epic" as const,
                      timeAgo: "3h ago",
                      xpEarned: 300
                    },
                    {
                      name: "React Specialist",
                      description: "Completed React mastery course",
                      user: "Mike Wilson",
                      rarity: "Rare" as const,
                      timeAgo: "5h ago",
                      xpEarned: 200
                    },
                    {
                      name: "First Steps",
                      description: "Completed first programming course",
                      user: "Emma Davis",
                      rarity: "Common" as const,
                      timeAgo: "7h ago",
                      xpEarned: 50
                    },
                    {
                      name: "Community Helper",
                      description: "Made 25 helpful posts",
                      user: "David Park",
                      rarity: "Rare" as const,
                      timeAgo: "9h ago",
                      xpEarned: 150
                    }
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-3 rounded-lg bg-retro-bg/50 border border-retro-text/10 hover:border-retro-accent/30 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <RetroAchievementIcon
                          achievementName={achievement.name}
                          rarity={achievement.rarity}
                          size="sm"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-vt323 font-bold text-sm text-retro-text group-hover:text-retro-primary transition-colors">
                              {achievement.name}
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                achievement.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                                achievement.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-400' :
                                achievement.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}
                            >
                              {achievement.rarity}
                            </Badge>
                          </div>
                          <div className="text-xs text-retro-text/70 mb-2">
                            {achievement.description}
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-retro-text/60">
                              Unlocked by <span className="font-semibold">{achievement.user}</span>
                            </span>
                            <div className="flex items-center gap-2 text-retro-text/50">
                              <span className="text-retro-accent">+{achievement.xpEarned} XP</span>
                              <span>•</span>
                              <span>{achievement.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <Button variant="ghost" className="w-full font-vt323 text-sm hover:text-retro-primary mt-4">
                    View All Achievements <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recently Completed Courses */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="retro-card h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="font-press-start text-lg text-retro-primary flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Course Completions
                  </CardTitle>
                  <CardDescription className="font-vt323 text-retro-text/70">
                    Latest course milestones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Advanced React Patterns",
                      student: "Alex Rodriguez",
                      instructor: "Dr. Sarah Johnson",
                      completionRate: 100,
                      rating: 5,
                      timeAgo: "2h ago",
                      category: "Frontend",
                      duration: "12 weeks"
                    },
                    {
                      title: "Machine Learning Fundamentals",
                      student: "Emma Chen",
                      instructor: "Prof. Michael Zhang",
                      completionRate: 95,
                      rating: 4.8,
                      timeAgo: "4h ago",
                      category: "AI/ML",
                      duration: "8 weeks"
                    },
                    {
                      title: "Full-Stack Web Development",
                      student: "John Smith",
                      instructor: "Lisa Parker",
                      completionRate: 88,
                      rating: 4.9,
                      timeAgo: "6h ago",
                      category: "Web Dev",
                      duration: "16 weeks"
                    },
                    {
                      title: "Data Structures & Algorithms",
                      student: "Maria Garcia",
                      instructor: "Dr. David Kim",
                      completionRate: 92,
                      rating: 4.7,
                      timeAgo: "8h ago",
                      category: "Computer Science",
                      duration: "10 weeks"
                    }
                  ].map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-3 rounded-lg bg-retro-bg/50 border border-retro-text/10 hover:border-retro-accent/30 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-retro-primary/20 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-4 h-4 text-retro-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-vt323 font-bold text-sm text-retro-text group-hover:text-retro-primary transition-colors">
                              {course.title}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {course.category}
                            </Badge>
                          </div>
                          <div className="text-xs text-retro-text/70 mb-2">
                            Completed by <span className="font-semibold">{course.student}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-retro-text/60">
                              <span>by {course.instructor}</span>
                              <span>•</span>
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-retro-text/50">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span>{course.rating}</span>
                              </div>
                              <span>•</span>
                              <span>{course.completionRate}%</span>
                              <span>•</span>
                              <span>{course.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <Button variant="ghost" className="w-full font-vt323 text-sm hover:text-retro-primary mt-4">
                    View All Courses <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8"
          >
            <Card className="retro-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <h3 className="font-press-start text-lg text-retro-primary mb-2">
                      Ready to Join the Action?
                    </h3>
                    <p className="font-vt323 text-retro-text/80">
                      Create posts, unlock achievements, and complete courses to level up your profile
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/news-feed">
                      <Button className="retro-button">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Create Post
                      </Button>
                    </Link>
                    <Link href="/courses">
                      <Button variant="outline" className="retro-button-secondary">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Browse Courses
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-press-start text-2xl text-center mb-6 text-retro-primary"
          >
            Explore EduConnect
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {heroFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Link href={feature.link}>
                  <Card className={`retro-card h-full ${feature.borderColor} hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="font-press-start text-xl text-retro-text mb-2 group-hover:text-retro-primary transition-colors">
                            {feature.title}
                          </CardTitle>
                          <Badge variant="secondary" className="font-vt323">
                            {feature.stats}
                          </Badge>
                        </div>
                        <ArrowRight className="w-5 h-5 text-retro-text/40 group-hover:text-retro-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className={`p-4 rounded-lg bg-gradient-to-br ${feature.color} border ${feature.borderColor} mb-4`}>
                        <p className="font-vt323 text-retro-text/80 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Showcase */}
      <section className="py-8 bg-retro-bg/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-press-start text-2xl text-center mb-3 text-retro-primary"
          >
            🎯 Platform Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-vt323 text-lg text-center mb-8 text-retro-text/80 max-w-2xl mx-auto"
          >
            Discover all the powerful tools and features available on EduConnect
          </motion.p>
          
          {/* Enhanced Feature Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Professional Tools */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="font-press-start text-lg text-retro-primary mb-4 flex items-center gap-2">
                <span>💼</span> Professional Tools
              </h3>
              <div className="space-y-3">
                <Link href="/resume">
                  <Card className="retro-card group cursor-pointer hover:border-retro-accent transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-retro-primary/20 flex items-center justify-center">
                          <RetroSectionLogo sectionId="resume" size="sm" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors mb-1">
                            Resume Builder
                          </h4>
                          <p className="font-vt323 text-xs text-retro-text/70">
                            Create professional resumes with multiple templates and export options
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-vt323">PDF Export</span>
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-vt323">Templates</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/dashboard">
                  <Card className="retro-card group cursor-pointer hover:border-retro-accent transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <RetroSectionLogo sectionId="dashboard" size="sm" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors mb-1">
                            Dashboard
                          </h4>
                          <p className="font-vt323 text-xs text-retro-text/70">
                            Manage courses, track progress, and view analytics
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded font-vt323">Analytics</span>
                            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded font-vt323">Progress</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </motion.div>

            {/* Learning & Community */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="font-press-start text-lg text-retro-primary mb-4 flex items-center gap-2">
                <span>📚</span> Learning & Community
              </h3>
              <div className="space-y-3">
                <Link href="/courses">
                  <Card className="retro-card group cursor-pointer hover:border-retro-accent transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <RetroSectionLogo sectionId="courses" size="sm" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors mb-1">
                            Courses
                          </h4>
                          <p className="font-vt323 text-xs text-retro-text/70">
                            Browse 156+ courses across multiple skill levels
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-vt323">156 Courses</span>
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded font-vt323">Certificates</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/communities">
                  <Card className="retro-card group cursor-pointer hover:border-retro-accent transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <RetroSectionLogo sectionId="communities" size="sm" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors mb-1">
                            Communities
                          </h4>
                          <p className="font-vt323 text-xs text-retro-text/70">
                            Join 89 active communities and collaborate with peers
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded font-vt323">89 Communities</span>
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-vt323">Live Chat</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/news-feed">
                  <Card className="retro-card group cursor-pointer hover:border-retro-accent transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                          <RetroSectionLogo sectionId="newsfeed" size="sm" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors mb-1">
                            News Feed
                          </h4>
                          <p className="font-vt323 text-xs text-retro-text/70">
                            Stay updated with 234+ active posts and discussions
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded font-vt323">234 Posts</span>
                            <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded font-vt323">Real-time</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </motion.div>

            {/* Personal & Settings */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="font-press-start text-lg text-retro-primary mb-4 flex items-center gap-2">
                <span>⚙️</span> Personal & Settings
              </h3>
              <div className="space-y-3">
                <Link href="/profile">
                  <Card className="retro-card group cursor-pointer hover:border-retro-accent transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                          <RetroSectionLogo sectionId="profile" size="sm" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors mb-1">
                            Profile
                          </h4>
                          <p className="font-vt323 text-xs text-retro-text/70">
                            Manage your profile, view stats and achievements
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded font-vt323">Stats</span>
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded font-vt323">Achievements</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/achievements">
                  <Card className="retro-card group cursor-pointer hover:border-retro-accent transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                          <RetroSectionLogo sectionId="achievements" size="sm" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors mb-1">
                            Achievements
                          </h4>
                          <p className="font-vt323 text-xs text-retro-text/70">
                            Unlock badges, trophies and track your milestones
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded font-vt323">Badges</span>
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded font-vt323">Trophies</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/settings">
                  <Card className="retro-card group cursor-pointer hover:border-retro-accent transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
                          <RetroSectionLogo sectionId="settings" size="sm" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors mb-1">
                            Settings
                          </h4>
                          <p className="font-vt323 text-xs text-retro-text/70">
                            Customize preferences, privacy and notifications
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-1 rounded font-vt323">Privacy</span>
                            <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded font-vt323">Themes</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/wishlist">
                  <Card className="retro-card group cursor-pointer hover:border-retro-accent transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                          <RetroSectionLogo sectionId="wishlist" size="sm" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors mb-1">
                            Wishlist
                          </h4>
                          <p className="font-vt323 text-xs text-retro-text/70">
                            Save courses and content for later access
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded font-vt323">Saved</span>
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-vt323">Quick Access</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Quick Access Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="font-press-start text-lg text-center mb-4 text-retro-text/80">
              🚀 Quick Access
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[
                { id: 'dashboard', title: 'Dashboard', link: '/dashboard', color: 'bg-blue-500/10' },
                { id: 'profile', title: 'Profile', link: '/profile', color: 'bg-yellow-500/10' },
                { id: 'newsfeed', title: 'News Feed', link: '/news-feed', color: 'bg-cyan-500/10' },
                { id: 'courses', title: 'Courses', link: '/courses', color: 'bg-green-500/10' },
                { id: 'communities', title: 'Communities', link: '/communities', color: 'bg-purple-500/10' },
                { id: 'achievements', title: 'Achievements', link: '/achievements', color: 'bg-red-500/10' },
                { id: 'resume', title: 'Resume', link: '/resume', color: 'bg-orange-500/10' },
                { id: 'wishlist', title: 'Wishlist', link: '/wishlist', color: 'bg-pink-500/10' },
                { id: 'settings', title: 'Settings', link: '/settings', color: 'bg-gray-500/10' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group"
                >
                  <Link href={feature.link}>
                    <Card className={`retro-card text-center hover:border-retro-accent transition-all duration-300 cursor-pointer ${feature.color}`}>
                      <CardContent className="p-3">
                        <div className="mb-2 flex justify-center">
                          <RetroSectionLogo 
                            sectionId={feature.id} 
                            size="sm" 
                            animated={true}
                            withGlow={true}
                          />
                        </div>
                        <h3 className="font-press-start text-xs text-retro-text group-hover:text-retro-primary transition-colors text-center">
                          {feature.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Quick Actions */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="retro-card mb-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-press-start text-retro-primary flex items-center gap-2 text-sm">
                      <Zap className="w-4 h-4" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickActions.map((action, index) => (
                      <motion.div
                        key={action.title}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href={action.link}>
                          <div className={`p-3 rounded-lg ${action.color} border border-retro-text/10 hover:border-retro-primary/50 transition-all cursor-pointer group`}>
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0">
                                {action.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-vt323 font-bold text-retro-text group-hover:text-retro-primary transition-colors text-sm">
                                  {action.title}
                                </div>
                                <div className="text-xs text-retro-text/60">
                                  {action.description}
                                </div>
                              </div>
                              <ArrowRight className="w-3 h-3 text-retro-text/40 group-hover:text-retro-primary group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* User Welcome Card */}
                {isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="retro-card">
                      <CardHeader>
                        <CardTitle className="font-press-start text-retro-primary">
                          Welcome Back!
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-retro-primary/20 flex items-center justify-center text-2xl">
                            👨‍💻
                          </div>
                          <div>
                            <div className="font-vt323 text-lg font-bold">
                              {user?.name || 'Student'}
                            </div>
                            <div className="text-sm text-retro-text/60">
                              {user?.role?.toLowerCase().replace('_', ' ') || 'Student'}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>Level 7</span>
                          </div>
                          <div className="w-full bg-retro-bg/50 rounded-full h-2">
                            <div className="bg-retro-primary h-2 rounded-full" style={{ width: "70%" }}></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Right Column - Featured Content */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredContent.map((section, index) => (
                  <motion.div
                    key={section.type}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    <Card className="retro-card h-full">
                      <CardHeader>
                        <CardTitle className="font-press-start text-retro-primary flex items-center gap-2">
                          {section.type === 'trending' ? <TrendingUp className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {isTrendingSection(section) ? (
                            section.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-center justify-between p-3 rounded-lg bg-retro-bg/30 border border-retro-text/10">
                                <div className="flex items-center gap-3">
                                  <RetroTopicIcon topic={item.name} size="sm" />
                                  <div>
                                    <div className="font-vt323 font-bold text-retro-text">
                                      {item.name}
                                    </div>
                                    <div className="text-xs text-retro-text/60">
                                      {item.posts} posts
                                    </div>
                                  </div>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {item.growth}
                                </Badge>
                              </div>
                            ))
                          ) : isAchievementSection(section) ? (
                            section.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-center justify-between p-3 rounded-lg bg-retro-bg/30 border border-retro-text/10">
                                <div className="flex items-center gap-3">
                                  <RetroAchievementIcon
                                    achievementName={item.name}
                                    rarity={item.rarity}
                                    size="sm"
                                  />
                                  <div>
                                    <div className="font-vt323 font-bold text-retro-text">
                                      {item.name}
                                    </div>
                                    <div className="text-xs text-retro-text/60">
                                      by {item.user}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : null}
                        </div>
                        <div className="mt-4">
                          <Link href={section.type === 'trending' ? '/news-feed' : '/achievements'}>
                            <Button variant="outline" className="retro-button-secondary w-full">
                              View All
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-retro-bg/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-press-start text-3xl text-retro-primary mb-6">
              Ready to Level Up?
            </h2>
            <p className="font-vt323 text-xl text-retro-text/80 max-w-2xl mx-auto mb-8">
              Join thousands of learners who are already using EduConnect to advance their skills and careers.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/news-feed">
                <Button className="retro-button text-lg px-8 py-4">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Join the Community
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" className="retro-button-secondary text-lg px-8 py-4">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
