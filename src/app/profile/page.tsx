'use client'

import { useAuth } from "@/lib/auth-context"
import { useCourseContext } from "@/lib/course-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, BookOpen, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const { enrolledCourses, unenrollFromCourse } = useCourseContext();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/');
    return null;
  }

  const stats = [
    { icon: Trophy, label: 'Achievements', value: '12' },
    { icon: Star, label: 'Courses Completed', value: '8' },
    { icon: BookOpen, label: 'Current Courses', value: '3' },
    { icon: Users, label: 'Communities', value: '5' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="retro-card"
          >
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--retro-primary)] mb-4">
                <img
                  src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.email}`}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="font-press-start text-xl mb-2">{user.name}</h1>
              <p className="font-vt323 text-lg opacity-80 mb-4">{user.email}</p>
              
              <div className="w-full border-t-2 border-[var(--retro-primary)] pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="font-press-start text-sm">Enrolled</p>
                    <p className="font-vt323 text-2xl text-[var(--retro-accent)]">
                      {enrolledCourses.length}
                    </p>
                  </div>
                  <div>
                    <p className="font-press-start text-sm">Level</p>
                    <p className="font-vt323 text-2xl text-[var(--retro-primary)]">
                      {enrolledCourses.length > 5 ? 'Pro' : 'Beginner'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enrolled Courses */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-press-start mb-4">My Courses</h2>
            {enrolledCourses.length === 0 ? (
              <div className="retro-card text-center py-8">
                <p className="font-vt323 text-lg mb-4">You haven't enrolled in any courses yet.</p>
                <Link href="/courses" className="retro-button">
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="retro-card"
                  >
                    <div className="flex gap-4">
                      <div className="w-32 h-24 rounded-lg overflow-hidden border-2 border-[var(--retro-primary)]">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-press-start text-lg mb-2">{course.title}</h3>
                            <p className="font-vt323 text-[var(--retro-primary)]">{course.instructor}</p>
                          </div>
                          <div className="flex items-center gap-2 font-vt323">
                            <Star className="w-4 h-4 text-[var(--retro-accent)]" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-4">
                          <Link
                            href={`/courses/${course.id}`}
                            className="retro-button flex-1"
                          >
                            Continue Learning
                          </Link>
                          <button
                            onClick={() => unenrollFromCourse(course.id)}
                            className="retro-button-secondary"
                          >
                            Unenroll
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}