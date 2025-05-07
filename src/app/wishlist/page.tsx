"use client";

import { motion } from "framer-motion";
import { useCourseContext } from "@/lib/course-context";
import Link from "next/link";
import { Clock, Users, Star, BookOpen } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, enrollInCourse, isEnrolled } = useCourseContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-press-start mb-4">My Wishlist</h1>
        <p className="font-vt323 text-xl opacity-80">Courses you're interested in</p>
      </motion.div>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="font-press-start text-xl mb-4">Your wishlist is empty</h2>
          <p className="font-vt323 text-lg mb-6 opacity-80">
            Browse our courses and add some to your wishlist!
          </p>
          <Link href="/courses" className="retro-button">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="retro-card"
            >
              <div className="relative aspect-video mb-4 overflow-hidden rounded-md border-2 border-[var(--retro-primary)]">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-[var(--retro-primary)] text-white px-2 py-1 rounded text-sm font-vt323">
                  {course.level}
                </div>
              </div>
              
              <h3 className="font-press-start text-lg mb-2">{course.title}</h3>
              <p className="font-vt323 text-lg opacity-80 mb-4">{course.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="font-vt323">
                  <p className="text-[var(--retro-primary)]">{course.instructor}</p>
                  <p className="opacity-70">{course.duration}</p>
                </div>
                <div className="text-right font-vt323">
                  <p className="text-[var(--retro-accent)]">★ {course.rating}</p>
                  <p className="opacity-70">{course.enrolled} enrolled</p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (!isEnrolled(course.id)) {
                      enrollInCourse(course);
                      removeFromWishlist(course.id);
                    }
                  }}
                  className="retro-button w-full"
                  disabled={isEnrolled(course.id)}
                >
                  {isEnrolled(course.id) ? 'Already Enrolled' : 'Enroll Now'}
                </button>
                <button
                  onClick={() => removeFromWishlist(course.id)}
                  className="retro-button-secondary w-full"
                >
                  Remove from Wishlist
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
} 