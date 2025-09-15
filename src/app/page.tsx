'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RetroIcon } from "@/components/ui/retro-icon"
import { RetroSectionLogo } from "@/components/ui/retro-section-logo"
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
  { label: "Active Learners", value: "12.4K", trend: "+15%", icon: <Users className="w-4 h-4" /> },
  { label: "Courses Completed", value: "3.2K", trend: "+23%", icon: <BookOpen className="w-4 h-4" /> },
  { label: "Achievements Earned", value: "8.7K", trend: "+18%", icon: <Trophy className="w-4 h-4" /> },
  { label: "Community Posts", value: "45.6K", trend: "+12%", icon: <MessageSquare className="w-4 h-4" /> }
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
      { name: "UI/UX Design", posts: 143, growth: "+18%" }
    ]
  },
  {
    type: "achievements", 
    title: "Recent Achievements",
    items: [
      { name: "Algorithm Master", user: "Alex Chen", rarity: "Legendary" },
      { name: "Code Mentor", user: "Sarah Johnson", rarity: "Epic" },
      { name: "Community Helper", user: "Mike Wilson", rarity: "Rare" },
      { name: "First Course", user: "David Park", rarity: "Common" }
    ]
  }
]

export default function Home() {
  const { user, isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-press-start text-4xl md:text-6xl mb-6 text-retro-primary">
              Welcome to EduConnect
            </h1>
            <p className="font-vt323 text-xl md:text-2xl text-retro-text/80 max-w-3xl mx-auto mb-8">
              The ultimate retro-themed educational platform where learning meets gaming. 
              Connect with peers, unlock achievements, and level up your skills!
            </p>
            {!isAuthenticated && (
              <div className="flex gap-4 justify-center">
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
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {quickStats.map((stat, index) => (
              <Card key={stat.label} className="retro-card text-center">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="font-press-start text-2xl text-retro-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="font-vt323 text-sm text-retro-text/60 mb-1">
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

      {/* Main Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-press-start text-3xl text-center mb-12 text-retro-primary"
          >
            Explore EduConnect
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
      <section className="py-16 bg-retro-bg/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-press-start text-3xl text-center mb-4 text-retro-primary"
          >
            Platform Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-vt323 text-xl text-center mb-12 text-retro-text/80 max-w-2xl mx-auto"
          >
            Discover all the powerful tools and features available on EduConnect
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { id: 'dashboard', title: 'Dashboard', link: '/dashboard' },
              { id: 'profile', title: 'Profile', link: '/profile' },
              { id: 'newsfeed', title: 'News Feed', link: '/news-feed' },
              { id: 'courses', title: 'Courses', link: '/courses' },
              { id: 'communities', title: 'Communities', link: '/communities' },
              { id: 'achievements', title: 'Achievements', link: '/achievements' },
              { id: 'resume', title: 'Resume Builder', link: '/resume' },
              { id: 'wishlist', title: 'Wishlist', link: '/wishlist' },
              { id: 'settings', title: 'Settings', link: '/settings' },
            ].map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Link href={feature.link}>
                  <Card className="retro-card text-center hover:border-retro-accent transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-center">
                        <RetroSectionLogo 
                          sectionId={feature.id} 
                          size="md" 
                          animated={true}
                          withGlow={true}
                        />
                      </div>
                      <h3 className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors">
                        {feature.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Quick Actions */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="retro-card mb-8">
                  <CardHeader>
                    <CardTitle className="font-press-start text-retro-primary flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {quickActions.map((action, index) => (
                      <motion.div
                        key={action.title}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href={action.link}>
                          <div className={`p-4 rounded-lg ${action.color} border border-retro-text/10 hover:border-retro-primary/50 transition-all cursor-pointer group`}>
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0">
                                {action.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-vt323 font-bold text-retro-text group-hover:text-retro-primary transition-colors">
                                  {action.title}
                                </div>
                                <div className="text-sm text-retro-text/60">
                                  {action.description}
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-retro-text/40 group-hover:text-retro-primary group-hover:translate-x-1 transition-all" />
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
                                  <div className="w-8 h-8 rounded bg-retro-primary/20 flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4" />
                                  </div>
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
                                  <RetroIcon
                                    icon={<Trophy className="w-full h-full" />}
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
