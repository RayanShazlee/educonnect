"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Clock, Users, Star, BookOpen } from "lucide-react"
import Link from "next/link"
import { useCourseManagement } from "@/lib/course-management-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const { getAllCourses } = useCourseManagement()
  const courses = getAllCourses()

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase()
    
    return matchesSearch && matchesLevel
  })

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-press-start text-3xl mb-4">Explore Courses</h1>
        <p className="font-vt323 text-xl opacity-80">Level up your skills with our retro-themed courses</p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--retro-primary)]" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="retro-input pl-10 w-full"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {["all", "beginner", "intermediate", "advanced"].map((level) => (
            <Button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`retro-button-secondary ${
                selectedLevel === level ? 'bg-[var(--retro-primary)] text-[var(--retro-bg)]' : ''
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-[var(--retro-bg)]/10 rounded-lg border-2 border-[var(--retro-primary)]"
        >
          <h2 className="font-press-start text-xl mb-4">No courses found</h2>
          <p className="font-vt323 text-lg opacity-80">Try adjusting your search or filter criteria</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="retro-card cursor-pointer h-full"
              >
                <div className="relative aspect-video mb-4 overflow-hidden rounded-md border-2 border-[var(--retro-primary)]">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[var(--retro-primary)] text-[var(--retro-bg)] px-2 py-1 rounded text-sm font-vt323">
                    {course.level}
                  </div>
                </div>
                
                <h3 className="font-press-start text-lg mb-2">{course.title}</h3>
                <p className="font-vt323 text-lg opacity-80 mb-4">{course.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="font-vt323">
                    <p className="text-[var(--retro-primary)]">{course.instructor}</p>
                    <div className="flex items-center gap-2 opacity-70">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <div className="text-right font-vt323">
                    <div className="flex items-center gap-1 text-[var(--retro-accent)]">
                      <Star className="w-4 h-4" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-70">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolled}</span>
                    </div>
                  </div>
                </div>

                <button className="retro-button w-full">
                  View Course
                </button>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}