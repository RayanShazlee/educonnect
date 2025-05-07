"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, Users, Star, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useCourseContext } from '@/lib/course-context';
import { useCourseManagement } from '@/lib/course-management-context';

// Using the same Course type from the courses page
interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  enrolled: number;
  image: string;
  syllabus?: {
    week: number;
    title: string;
    description: string;
  }[];
}

// Extended course data with syllabus
const courseData: Record<string, Course> = {
  '1': {
    id: '1',
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with this comprehensive course. Perfect for beginners who want to start their coding journey. We cover fundamental concepts, problem-solving techniques, and basic programming constructs.',
    instructor: 'John Doe',
    level: 'Beginner',
    duration: '8 weeks',
    rating: 4.5,
    enrolled: 1200,
    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course1',
    syllabus: [
      {
        week: 1,
        title: 'Introduction to Computing',
        description: 'Basic concepts of computing and how computers process information.'
      },
      {
        week: 2,
        title: 'Variables and Data Types',
        description: 'Understanding different types of data and how to store them.'
      },
      {
        week: 3,
        title: 'Control Structures',
        description: 'Learning about if-else statements and loops.'
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Web Development Fundamentals',
    description: 'Master HTML, CSS, and JavaScript fundamentals. Build responsive websites from scratch and understand web development principles.',
    instructor: 'Jane Smith',
    level: 'Beginner',
    duration: '10 weeks',
    rating: 4.8,
    enrolled: 2500,
    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course2',
    syllabus: [
      {
        week: 1,
        title: 'HTML Basics',
        description: 'Structure of web pages and semantic HTML.'
      },
      {
        week: 2,
        title: 'CSS Styling',
        description: 'Making websites beautiful with CSS.'
      },
      {
        week: 3,
        title: 'JavaScript Fundamentals',
        description: 'Adding interactivity to web pages.'
      }
    ]
  },
  '3': {
    id: '3',
    title: 'Advanced React Patterns',
    description: 'Deep dive into advanced React concepts and patterns. Learn about hooks, context, and state management.',
    instructor: 'Mike Johnson',
    level: 'Advanced',
    duration: '6 weeks',
    rating: 4.7,
    enrolled: 800,
    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course3',
    syllabus: [
      {
        week: 1,
        title: 'Advanced Hooks',
        description: 'Custom hooks and hook patterns.'
      },
      {
        week: 2,
        title: 'State Management',
        description: 'Context API and global state patterns.'
      },
      {
        week: 3,
        title: 'Performance Optimization',
        description: 'Memoization and code splitting techniques.'
      }
    ]
  }
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = typeof params.id === 'string' ? params.id : '';
  const { getAllCourses } = useCourseManagement();
  const courses = getAllCourses();
  const course = courses.find(c => c.id === courseId);
  
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const { 
    enrollInCourse, 
    unenrollFromCourse, 
    addToWishlist, 
    removeFromWishlist,
    isEnrolled,
    isInWishlist
  } = useCourseContext();

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-press-start">Course not found</h1>
        <Link href="/courses" className="retro-link mt-4 inline-block">
          <ArrowLeft className="inline-block mr-2" />
          Back to Courses
        </Link>
      </div>
    );
  }

  const handleEnroll = async () => {
    try {
      setEnrollmentLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEnrolled(course.id)) {
        unenrollFromCourse(course.id);
        toast.success("Successfully unenrolled from the course");
      } else {
        enrollInCourse(course);
        toast.success("Successfully enrolled in the course");
      }
    } catch (error) {
      toast.error("Failed to process enrollment");
    } finally {
      setEnrollmentLoading(false);
    }
  };

  const handleWishlist = async () => {
    try {
      setWishlistLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isInWishlist(course.id)) {
        removeFromWishlist(course.id);
        toast.success("Removed from wishlist");
      } else {
        addToWishlist(course);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/courses" className="retro-link inline-flex items-center mb-6">
        <ArrowLeft className="mr-2" />
        Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="retro-card"
          >
            <div className="relative aspect-video mb-6 overflow-hidden rounded-md border-2 border-[var(--retro-primary)]">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-[var(--retro-primary)] text-white px-3 py-1 rounded font-vt323">
                {course.level}
              </div>
            </div>

            <h1 className="font-press-start text-2xl mb-4">{course.title}</h1>
            <p className="font-vt323 text-lg mb-6 opacity-80">{course.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2 font-vt323">
                <Clock className="w-5 h-5 text-[var(--retro-primary)]" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 font-vt323">
                <Users className="w-5 h-5 text-[var(--retro-primary)]" />
                <span>{course.enrolled} enrolled</span>
              </div>
              <div className="flex items-center gap-2 font-vt323">
                <Star className="w-5 h-5 text-[var(--retro-accent)]" />
                <span>{course.rating} rating</span>
              </div>
              <div className="flex items-center gap-2 font-vt323">
                <BookOpen className="w-5 h-5 text-[var(--retro-primary)]" />
                <span>{course.syllabus?.length || 0} modules</span>
              </div>
            </div>

            <div className="border-t-2 border-[var(--retro-primary)] pt-6">
              <h2 className="font-press-start text-xl mb-4">Course Syllabus</h2>
              <div className="space-y-4">
                {course.syllabus?.map((module) => (
                  <motion.div
                    key={module.week}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-lg bg-[var(--retro-bg)]/5 hover:bg-[var(--retro-bg)]/10 transition-colors"
                  >
                    <h3 className="font-vt323 text-lg font-bold mb-1">
                      Week {module.week}: {module.title}
                    </h3>
                    <p className="font-vt323 opacity-80">{module.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="retro-card sticky top-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--retro-primary)]">
              <img
                src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${course.instructor}`}
                alt={course.instructor}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-press-start text-sm mb-1">Instructor</h2>
              <p className="font-vt323 text-lg">{course.instructor}</p>
            </div>
          </div>

          <button 
            onClick={handleEnroll}
            disabled={enrollmentLoading}
            className={`retro-button w-full mb-4 ${
              isEnrolled(course.id) ? 'bg-[var(--retro-accent)] text-white' : ''
            } ${enrollmentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {enrollmentLoading ? 'Processing...' : isEnrolled(course.id) ? 'Unenroll' : 'Enroll Now'}
          </button>
          <button 
            onClick={handleWishlist}
            disabled={wishlistLoading || isEnrolled(course.id)}
            className={`retro-button-secondary w-full ${
              isInWishlist(course.id) ? 'bg-[var(--retro-primary)] text-white' : ''
            } ${(wishlistLoading || isEnrolled(course.id)) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {wishlistLoading ? 'Processing...' : isInWishlist(course.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </motion.div>
      </div>
    </div>
  );
} 