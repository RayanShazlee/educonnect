"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

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
}

interface CourseContextType {
  enrolledCourses: Course[];
  wishlist: Course[];
  enrollInCourse: (course: Course) => void;
  unenrollFromCourse: (courseId: string) => void;
  addToWishlist: (course: Course) => void;
  removeFromWishlist: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  isInWishlist: (courseId: string) => boolean;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [wishlist, setWishlist] = useState<Course[]>([]);

  const enrollInCourse = (course: Course) => {
    setEnrolledCourses(prev => {
      if (!prev.find(c => c.id === course.id)) {
        return [...prev, course];
      }
      return prev;
    });
  };

  const unenrollFromCourse = (courseId: string) => {
    setEnrolledCourses(prev => prev.filter(course => course.id !== courseId));
  };

  const addToWishlist = (course: Course) => {
    setWishlist(prev => {
      if (!prev.find(c => c.id === course.id)) {
        return [...prev, course];
      }
      return prev;
    });
  };

  const removeFromWishlist = (courseId: string) => {
    setWishlist(prev => prev.filter(course => course.id !== courseId));
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  const isInWishlist = (courseId: string) => {
    return wishlist.some(course => course.id === courseId);
  };

  return (
    <CourseContext.Provider value={{
      enrolledCourses,
      wishlist,
      enrollInCourse,
      unenrollFromCourse,
      addToWishlist,
      removeFromWishlist,
      isEnrolled,
      isInWishlist,
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
} 