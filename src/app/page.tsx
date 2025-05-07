'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

const features = [
  {
    title: "Innovative Teaching Methods",
    description: "Explore the latest trends in effective teaching strategies and methodologies shared by top educators.",
    image: "/images/teaching.jpg",
    emoji: "👨‍🏫"
  },
  {
    title: "Collaborative Learning",
    description: "Join students as they engage in collaborative projects that enhance their learning experience.",
    image: "/images/collaboration.jpg",
    emoji: "👥"
  },
  {
    title: "Mentor Insights",
    description: "Gain valuable insights and career advice from experienced mentors in the field.",
    image: "/images/mentoring.jpg",
    emoji: "🎯"
  }
]

const sideFeatures = [
  {
    title: "Collaborative Learning",
    description: "Participate in group discussions and peer-reviewed projects.",
    icon: "👥"
  },
  {
    title: "Achievement Sharing",
    description: "Share your accomplishments and milestones with your network.",
    icon: "🏆"
  },
  {
    title: "Gamified Engagement",
    description: "Earn points and badges for your participation and contributions.",
    icon: "🎮"
  }
]

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Newsfeed</h1>
            
            {features.map((feature, index) => (
              <Card key={index} className="mb-6 card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-2xl">
                      {feature.emoji}
                    </div>
                    <div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>Latest Update</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="aspect-video relative rounded-lg overflow-hidden bg-accent">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">
                      {feature.emoji}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {sideFeatures.map((feature, index) => (
            <Card key={index} className="card-hover">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Active Learners</span>
                    <span>1.2k</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-value" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Courses Completed</span>
                    <span>256</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-value" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Achievement Rate</span>
                    <span>92%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-value" style={{ width: "92%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
