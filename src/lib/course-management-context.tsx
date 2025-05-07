"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

export interface Course {
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
  createdAt: string;
  updatedAt: string;
  instructorId: string;
}

interface CourseManagementContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'rating' | 'enrolled' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCourse: (courseId: string, updates: Partial<Course>) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  getCoursesByInstructor: (instructorId: string) => Course[];
  getAllCourses: () => Course[];
}

const CourseManagementContext = createContext<CourseManagementContextType | undefined>(undefined);

// This would typically be in a database
let courseIdCounter = 4; // Starting after our sample courses
const generateCourseId = () => (courseIdCounter++).toString();

export function CourseManagementProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming with this comprehensive course.',
      instructor: 'John Doe',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.5,
      enrolled: 1200,
      image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course1',
      instructorId: 'instructor1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
    {
      id: '2',
      title: 'Web Development Fundamentals',
      description: 'Master HTML, CSS, and JavaScript fundamentals. Build responsive websites from scratch.',
      instructor: 'Jane Smith',
      level: 'Beginner',
      duration: '10 weeks',
      rating: 4.8,
      enrolled: 2500,
      image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course2',
      instructorId: 'instructor2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syllabus: [
        {
          week: 1,
          title: 'HTML Essentials',
          description: 'Understanding HTML structure and semantic elements.'
        },
        {
          week: 2,
          title: 'CSS Styling',
          description: 'Mastering CSS layouts and responsive design.'
        },
        {
          week: 3,
          title: 'JavaScript Basics',
          description: 'Introduction to JavaScript and DOM manipulation.'
        }
      ]
    },
    {
      id: '3',
      title: 'Data Science Fundamentals',
      description: 'Learn the basics of data analysis, visualization, and statistical methods.',
      instructor: 'Dr. Sarah Chen',
      level: 'Intermediate',
      duration: '12 weeks',
      rating: 4.6,
      enrolled: 1800,
      image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course3',
      instructorId: 'instructor3',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syllabus: [
        {
          week: 1,
          title: 'Introduction to Data Science',
          description: 'Overview of data science concepts and tools.'
        },
        {
          week: 2,
          title: 'Data Analysis with Python',
          description: 'Using Python for data manipulation and analysis.'
        },
        {
          week: 3,
          title: 'Data Visualization',
          description: 'Creating effective visualizations with popular libraries.'
        }
      ]
    },
    {
      id: '4',
      title: 'Advanced React Development',
      description: 'Master advanced React concepts, patterns, and best practices.',
      instructor: 'Mike Johnson',
      level: 'Advanced',
      duration: '8 weeks',
      rating: 4.9,
      enrolled: 950,
      image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course4',
      instructorId: 'instructor4',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syllabus: [
        {
          week: 1,
          title: 'Advanced Hooks',
          description: 'Deep dive into React hooks and custom hooks.'
        },
        {
          week: 2,
          title: 'State Management',
          description: 'Advanced state management patterns and solutions.'
        },
        {
          week: 3,
          title: 'Performance Optimization',
          description: 'Techniques for optimizing React applications.'
        }
      ]
    },
    {
      id: '5',
      title: 'Machine Learning Essentials',
      description: 'Introduction to machine learning concepts and practical applications.',
      instructor: 'Dr. Michael Brown',
      level: 'Intermediate',
      duration: '14 weeks',
      rating: 4.7,
      enrolled: 1500,
      image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course5',
      instructorId: 'instructor5',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syllabus: [
        {
          week: 1,
          title: 'ML Foundations',
          description: 'Basic concepts and types of machine learning.'
        },
        {
          week: 2,
          title: 'Supervised Learning',
          description: 'Understanding classification and regression.'
        },
        {
          week: 3,
          title: 'Neural Networks',
          description: 'Introduction to neural networks and deep learning.'
        }
      ]
    },
    {
      id: '6',
      title: 'UI/UX Design Principles',
      description: 'Learn fundamental principles of user interface and experience design.',
      instructor: 'Lisa Chen',
      level: 'Beginner',
      duration: '6 weeks',
      rating: 4.8,
      enrolled: 2100,
      image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course6',
      instructorId: 'instructor6',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syllabus: [
        {
          week: 1,
          title: 'Design Fundamentals',
          description: 'Core principles of visual design and typography.'
        },
        {
          week: 2,
          title: 'User Research',
          description: 'Methods for understanding user needs and behaviors.'
        },
        {
          week: 3,
          title: 'Prototyping',
          description: 'Creating interactive prototypes and wireframes.'
        }
      ]
    },
    {
      id: '7',
      title: 'Cloud Computing with AWS',
      description: 'Master cloud computing concepts and AWS services.',
      instructor: 'Robert Wilson',
      level: 'Advanced',
      duration: '10 weeks',
      rating: 4.6,
      enrolled: 890,
      image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course7',
      instructorId: 'instructor7',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syllabus: [
        {
          week: 1,
          title: 'AWS Basics',
          description: 'Introduction to AWS services and architecture.'
        },
        {
          week: 2,
          title: 'Cloud Infrastructure',
          description: 'Setting up and managing cloud infrastructure.'
        },
        {
          week: 3,
          title: 'Serverless Computing',
          description: 'Building serverless applications with AWS Lambda.'
        }
      ]
    },
    {
      id: '8',
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile apps using React Native.',
      instructor: 'Amanda Lee',
      level: 'Intermediate',
      duration: '12 weeks',
      rating: 4.7,
      enrolled: 1350,
      image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course8',
      instructorId: 'instructor8',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syllabus: [
        {
          week: 1,
          title: 'React Native Basics',
          description: 'Understanding mobile development with React Native.'
        },
        {
          week: 2,
          title: 'Native Components',
          description: 'Working with platform-specific components.'
        },
        {
          week: 3,
          title: 'App Publishing',
          description: 'Preparing and publishing apps to stores.'
        }
      ]
    },
    {
      id: '9',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn essential cybersecurity concepts and practices.',
      instructor: 'David Martinez',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.5,
      enrolled: 980,
      image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course9',
      instructorId: 'instructor9',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syllabus: [
        {
          week: 1,
          title: 'Security Basics',
          description: 'Introduction to cybersecurity principles.'
        },
        {
          week: 2,
          title: 'Threat Analysis',
          description: 'Identifying and analyzing security threats.'
        },
        {
          week: 3,
          title: 'Security Tools',
          description: 'Using common security tools and techniques.'
        }
      ]
    },
    {
      id: '10',
      title: 'Blockchain Development',
      description: 'Explore blockchain technology and smart contract development.',
      instructor: 'Alex Thompson',
      level: 'Advanced',
      duration: '10 weeks',
      rating: 4.8,
      enrolled: 750,
      image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=course10',
      instructorId: 'instructor10',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syllabus: [
        {
          week: 1,
          title: 'Blockchain Basics',
          description: 'Understanding blockchain technology fundamentals.'
        },
        {
          week: 2,
          title: 'Smart Contracts',
          description: 'Developing and deploying smart contracts.'
        },
        {
          week: 3,
          title: 'DApp Development',
          description: 'Building decentralized applications.'
        }
      ]
    }
  ]);

  const addCourse = async (courseData: Omit<Course, 'id' | 'rating' | 'enrolled' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newCourse: Course = {
        ...courseData,
        id: generateCourseId(),
        rating: 0,
        enrolled: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setCourses(prev => [...prev, newCourse]);
      toast.success('Course added successfully!');
    } catch (error) {
      toast.error('Failed to add course');
      throw error;
    }
  };

  const updateCourse = async (courseId: string, updates: Partial<Course>) => {
    try {
      setCourses(prev => prev.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            ...updates,
            updatedAt: new Date().toISOString()
          };
        }
        return course;
      }));
      toast.success('Course updated successfully!');
    } catch (error) {
      toast.error('Failed to update course');
      throw error;
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      setCourses(prev => prev.filter(course => course.id !== courseId));
      toast.success('Course deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete course');
      throw error;
    }
  };

  const getCoursesByInstructor = (instructorId: string) => {
    return courses.filter(course => course.instructorId === instructorId);
  };

  const getAllCourses = () => courses;

  return (
    <CourseManagementContext.Provider value={{
      courses,
      addCourse,
      updateCourse,
      deleteCourse,
      getCoursesByInstructor,
      getAllCourses,
    }}>
      {children}
    </CourseManagementContext.Provider>
  );
}

export function useCourseManagement() {
  const context = useContext(CourseManagementContext);
  if (context === undefined) {
    throw new Error('useCourseManagement must be used within a CourseManagementProvider');
  }
  return context;
}