import { Post, User } from './types'

// Mock users - comprehensive educational community
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    avatar: '👨‍💻',
    title: 'Full Stack Developer Student',
    bio: 'Passionate about modern web technologies and machine learning. Currently building my portfolio.',
    role: 'STUDENT'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    avatar: '👩‍🏫',
    title: 'Computer Science Professor',
    bio: 'Teaching and researching AI/ML for over 10 years. Helping students transition into tech careers.',
    role: 'TEACHER'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    avatar: '👩‍🎓',
    title: 'Data Science Graduate Student',
    bio: 'MS in Data Science | Python enthusiast | Building ML models for social good',
    role: 'STUDENT'
  },
  {
    id: '4',
    name: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    avatar: '🧑‍💼',
    title: 'UX Designer & Career Mentor',
    bio: 'Senior UX Designer at TechCorp. Mentoring students in design thinking and career development.',
    role: 'MENTOR'
  },
  {
    id: '5',
    name: 'Emily Davis',
    email: 'emily.davis@educonnect.com',
    avatar: '👩‍💻',
    title: 'EduConnect Community Manager',
    bio: 'Building bridges between students, educators, and industry professionals.',
    role: 'MENTOR'
  },
  {
    id: '6',
    name: 'David Park',
    email: 'david.park@email.com',
    avatar: '👨‍🎓',
    title: 'CS Freshman',
    bio: 'Just started my computer science journey! Eager to learn and connect with peers.',
    role: 'STUDENT'
  },
  {
    id: '7',
    name: 'Prof. Jennifer Liu',
    email: 'j.liu@university.edu',
    avatar: '👩‍🔬',
    title: 'Mathematics Professor',
    bio: 'PhD in Applied Mathematics. Specializing in algorithms and computational complexity.',
    role: 'TEACHER'
  },
  {
    id: '8',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    avatar: '👨‍💼',
    title: 'Software Engineering Manager',
    bio: 'Leading engineering teams at StartupXYZ. Former bootcamp graduate turned tech leader.',
    role: 'MENTOR'
  },
  {
    id: '9',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    avatar: '👩‍💻',
    title: 'Cybersecurity Student',
    bio: 'BS in Cybersecurity | Ethical hacker | Women in tech advocate',
    role: 'STUDENT'
  },
  {
    id: '10',
    name: 'Dr. Robert Zhang',
    email: 'r.zhang@institute.edu',
    avatar: '👨‍🔬',
    title: 'AI Research Director',
    bio: 'Leading AI research at TechInstitute. Published 50+ papers on machine learning.',
    role: 'TEACHER'
  }
]

// Comprehensive mock posts for news feed
export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Just earned the "Algorithm Master" achievement! 🏆 After weeks of practicing on LeetCode and studying different sorting algorithms, I finally completed all the advanced algorithm challenges. The journey was tough but incredibly rewarding! Special thanks to Prof. Liu\'s algorithms course for the solid foundation.',
    author: mockUsers[0],
    likes: 47,
    shares: 12,
    comments: [
      {
        id: 'c1',
        content: 'Congratulations Alex! That\'s a tough achievement to unlock. Any tips for dynamic programming problems?',
        author: mockUsers[5],
        createdAt: new Date('2024-09-15T10:30:00Z'),
        updatedAt: new Date('2024-09-15T10:30:00Z')
      },
      {
        id: 'c2',
        content: 'Amazing work! I\'m still struggling with graph algorithms. Keep it up! 💪',
        author: mockUsers[2],
        createdAt: new Date('2024-09-15T11:15:00Z'),
        updatedAt: new Date('2024-09-15T11:15:00Z')
      }
    ],
    createdAt: new Date('2024-09-15T08:00:00Z'),
    updatedAt: new Date('2024-09-15T08:00:00Z'),
    type: 'achievement',
    metadata: {
      achievement: {
        badgeName: 'Algorithm Master',
        badgeDescription: 'Completed all advanced algorithm challenges',
        rarity: 'Legendary'
      },
      tags: ['Algorithms', 'LeetCode', 'Programming', 'Achievement']
    }
  },
  {
    id: '2',
    title: 'New Course: Advanced React Patterns',
    content: 'Excited to announce my new course on Advanced React Patterns! 🚀 We\'ll cover render props, compound components, higher-order components, and custom hooks. Perfect for developers looking to level up their React skills. Early bird discount available for the first 50 students!',
    author: mockUsers[1],
    likes: 89,
    shares: 34,
    comments: [
      {
        id: 'c3',
        content: 'Dr. Johnson, your courses are always amazing! Will this cover React 18 features and Suspense?',
        author: mockUsers[0],
        createdAt: new Date('2024-09-15T09:45:00Z'),
        updatedAt: new Date('2024-09-15T09:45:00Z')
      },
      {
        id: 'c4',
        content: 'Just enrolled! Can\'t wait to learn about server components.',
        author: mockUsers[3],
        createdAt: new Date('2024-09-15T10:20:00Z'),
        updatedAt: new Date('2024-09-15T10:20:00Z')
      }
    ],
    createdAt: new Date('2024-09-15T07:30:00Z'),
    updatedAt: new Date('2024-09-15T07:30:00Z'),
    type: 'course',
    metadata: {
      course: {
        courseId: 'react-advanced-patterns',
        courseTitle: 'Advanced React Patterns',
        duration: '12 hours',
        level: 'Advanced',
        category: 'Web Development'
      },
      tags: ['React', 'JavaScript', 'Frontend', 'Web Development']
    }
  },
  {
    id: '3',
    content: 'Just completed my first machine learning project! 📊 Built a movie recommendation system using collaborative filtering with scikit-learn. The accuracy hit 85% on the test set! The hardest part was feature engineering and handling the cold start problem. Next step: implementing deep learning approaches with TensorFlow.',
    author: mockUsers[2],
    likes: 63,
    shares: 18,
    comments: [
      {
        id: 'c5',
        content: 'That\'s awesome Maria! Did you use matrix factorization or neighborhood-based methods?',
        author: mockUsers[9],
        createdAt: new Date('2024-09-15T12:20:00Z'),
        updatedAt: new Date('2024-09-15T12:20:00Z')
      },
      {
        id: 'c6',
        content: 'Great work! Recommendation systems are fascinating. Have you considered using neural collaborative filtering?',
        author: mockUsers[1],
        createdAt: new Date('2024-09-15T13:10:00Z'),
        updatedAt: new Date('2024-09-15T13:10:00Z')
      }
    ],
    createdAt: new Date('2024-09-15T06:45:00Z'),
    updatedAt: new Date('2024-09-15T06:45:00Z'),
    type: 'discussion',
    metadata: {
      tags: ['Machine Learning', 'Recommendation Systems', 'Data Science', 'Python', 'scikit-learn']
    }
  },
  {
    id: '4',
    content: 'Sharing an incredible resource I discovered: "The Art of Readable Code" by Dustin Boswell 📚 This book completely changed how I approach coding. It\'s not just about making code work, but making it understandable, maintainable, and elegant. Every developer should read this!',
    author: mockUsers[3],
    likes: 72,
    shares: 41,
    comments: [
      {
        id: 'c7',
        content: 'This book is a classic! Clean code principles should be taught in every CS program.',
        author: mockUsers[7],
        createdAt: new Date('2024-09-15T14:30:00Z'),
        updatedAt: new Date('2024-09-15T14:30:00Z')
      }
    ],
    createdAt: new Date('2024-09-15T05:15:00Z'),
    updatedAt: new Date('2024-09-15T05:15:00Z'),
    type: 'resource',
    metadata: {
      resource: {
        resourceTitle: 'The Art of Readable Code',
        resourceType: 'Book',
        url: 'https://www.oreilly.com/library/view/the-art-of/9781449318482/'
      },
      tags: ['Clean Code', 'Programming', 'Best Practices', 'Software Engineering']
    }
  },
  {
    id: '5',
    title: '📢 EduConnect Career Fair - October 15th',
    content: 'Exciting news! EduConnect is hosting a virtual career fair next month featuring 50+ tech companies including Google, Microsoft, Netflix, and many promising startups. Students can attend workshops, network with recruiters, and participate in mock interviews. Registration opens tomorrow!',
    author: mockUsers[4],
    likes: 156,
    shares: 89,
    comments: [
      {
        id: 'c8',
        content: 'This is amazing! Will there be opportunities for international students?',
        author: mockUsers[5],
        createdAt: new Date('2024-09-15T15:45:00Z'),
        updatedAt: new Date('2024-09-15T15:45:00Z')
      },
      {
        id: 'c9',
        content: 'Perfect timing! I\'m graduating this December. Can\'t wait to register.',
        author: mockUsers[8],
        createdAt: new Date('2024-09-15T16:20:00Z'),
        updatedAt: new Date('2024-09-15T16:20:00Z')
      }
    ],
    createdAt: new Date('2024-09-15T04:00:00Z'),
    updatedAt: new Date('2024-09-15T04:00:00Z'),
    type: 'announcement',
    metadata: {
      tags: ['Career Fair', 'Jobs', 'Networking', 'Tech Companies', 'Virtual Event']
    }
  },
  {
    id: '6',
    content: 'Hello EduConnect community! 👋 I\'m David, a CS freshman just starting my programming journey. Currently learning Python in my intro course and absolutely loving it! The problem-solving aspect is addictive. Any advice for a beginner? What resources helped you the most when starting out?',
    author: mockUsers[5],
    likes: 34,
    shares: 8,
    comments: [
      {
        id: 'c10',
        content: 'Welcome David! Automate the Boring Stuff with Python is a great resource for beginners.',
        author: mockUsers[0],
        createdAt: new Date('2024-09-15T17:30:00Z'),
        updatedAt: new Date('2024-09-15T17:30:00Z')
      },
      {
        id: 'c11',
        content: 'Don\'t rush! Focus on understanding fundamentals. Practice coding every day, even if it\'s just 30 minutes.',
        author: mockUsers[7],
        createdAt: new Date('2024-09-15T18:00:00Z'),
        updatedAt: new Date('2024-09-15T18:00:00Z')
      }
    ],
    createdAt: new Date('2024-09-15T03:30:00Z'),
    updatedAt: new Date('2024-09-15T03:30:00Z'),
    type: 'discussion',
    metadata: {
      tags: ['Beginner', 'Python', 'Learning', 'Computer Science', 'Advice']
    }
  },
  {
    id: '7',
    title: 'Mathematics for Computer Science - Fall 2024',
    content: 'Registration is now open for my Mathematics for CS course! 🧮 This semester we\'ll cover discrete mathematics, probability theory, linear algebra, and their applications in algorithms and machine learning. Prerequisites: Calculus I & II. Limited to 30 students for personalized attention.',
    author: mockUsers[6],
    likes: 67,
    shares: 23,
    comments: [
      {
        id: 'c12',
        content: 'Prof. Liu, will this course help with understanding machine learning algorithms better?',
        author: mockUsers[2],
        createdAt: new Date('2024-09-15T19:15:00Z'),
        updatedAt: new Date('2024-09-15T19:15:00Z')
      }
    ],
    createdAt: new Date('2024-09-15T02:45:00Z'),
    updatedAt: new Date('2024-09-15T02:45:00Z'),
    type: 'course',
    metadata: {
      course: {
        courseId: 'math-cs-fall-2024',
        courseTitle: 'Mathematics for Computer Science',
        duration: '16 weeks',
        level: 'Intermediate',
        category: 'Mathematics'
      },
      tags: ['Mathematics', 'Discrete Math', 'Linear Algebra', 'Probability', 'Theory']
    }
  },
  {
    id: '8',
    content: 'Successfully completed my transition from bootcamp graduate to Engineering Manager! 🚀 3 years ago I had zero coding experience, now I\'m leading a team of 8 engineers at a growing startup. The key was continuous learning, mentorship, and never giving up. Happy to mentor anyone making a similar journey!',
    author: mockUsers[7],
    likes: 198,
    shares: 76,
    comments: [
      {
        id: 'c13',
        content: 'This is so inspiring Carlos! What skills were most important for transitioning to management?',
        author: mockUsers[0],
        createdAt: new Date('2024-09-15T20:30:00Z'),
        updatedAt: new Date('2024-09-15T20:30:00Z')
      },
      {
        id: 'c14',
        content: 'Amazing journey! I\'m a bootcamp student now. Any advice for landing that first job?',
        author: mockUsers[5],
        createdAt: new Date('2024-09-15T21:00:00Z'),
        updatedAt: new Date('2024-09-15T21:00:00Z')
      }
    ],
    createdAt: new Date('2024-09-15T01:30:00Z'),
    updatedAt: new Date('2024-09-15T01:30:00Z'),
    type: 'discussion',
    metadata: {
      tags: ['Career Growth', 'Bootcamp', 'Engineering Management', 'Mentorship', 'Success Story']
    }
  },
  {
    id: '9',
    content: 'Just earned my Certified Ethical Hacker (CEH) certification! 🔒 The journey was intense - spent 6 months studying penetration testing, network security, and vulnerability assessment. Now I feel ready to contribute to making the digital world safer. Cybersecurity is such a crucial field!',
    author: mockUsers[8],
    likes: 85,
    shares: 31,
    comments: [
      {
        id: 'c15',
        content: 'Congratulations Priya! How did you prepare for the practical labs?',
        author: mockUsers[5],
        createdAt: new Date('2024-09-15T22:15:00Z'),
        updatedAt: new Date('2024-09-15T22:15:00Z')
      }
    ],
    createdAt: new Date('2024-09-14T23:45:00Z'),
    updatedAt: new Date('2024-09-14T23:45:00Z'),
    type: 'achievement',
    metadata: {
      achievement: {
        badgeName: 'Certified Ethical Hacker',
        badgeDescription: 'Earned CEH certification in cybersecurity',
        rarity: 'Epic'
      },
      tags: ['Cybersecurity', 'Certification', 'Ethical Hacking', 'Network Security']
    }
  },
  {
    id: '10',
    title: 'AI Research Lab - Open Positions',
    content: 'Exciting opportunity! 🧠 Our AI Research Lab has openings for graduate research assistants. We\'re working on cutting-edge projects in natural language processing, computer vision, and reinforcement learning. Looking for motivated students with strong math backgrounds and programming skills in Python/PyTorch.',
    author: mockUsers[9],
    likes: 124,
    shares: 67,
    comments: [
      {
        id: 'c16',
        content: 'Dr. Zhang, what\'s the minimum GPA requirement for these positions?',
        author: mockUsers[2],
        createdAt: new Date('2024-09-14T20:30:00Z'),
        updatedAt: new Date('2024-09-14T20:30:00Z')
      },
      {
        id: 'c17',
        content: 'This sounds perfect for my research interests! How do I apply?',
        author: mockUsers[0],
        createdAt: new Date('2024-09-14T21:15:00Z'),
        updatedAt: new Date('2024-09-14T21:15:00Z')
      }
    ],
    createdAt: new Date('2024-09-14T18:00:00Z'),
    updatedAt: new Date('2024-09-14T18:00:00Z'),
    type: 'announcement',
    metadata: {
      tags: ['Research', 'AI', 'Graduate Students', 'NLP', 'Computer Vision', 'Jobs']
    }
  },
  {
    id: '11',
    content: 'Amazing resource alert! 📖 Just discovered "Introduction to Statistical Learning" by James, Witten, Hastie & Tibshirani. It\'s freely available online and perfect for anyone wanting to understand machine learning from a statistical perspective. The R examples are incredibly helpful too!',
    author: mockUsers[2],
    likes: 91,
    shares: 45,
    comments: [
      {
        id: 'c18',
        content: 'This book helped me so much in my ML course! The Python version (ISLP) is also available now.',
        author: mockUsers[0],
        createdAt: new Date('2024-09-14T16:45:00Z'),
        updatedAt: new Date('2024-09-14T16:45:00Z')
      }
    ],
    createdAt: new Date('2024-09-14T15:30:00Z'),
    updatedAt: new Date('2024-09-14T15:30:00Z'),
    type: 'resource',
    metadata: {
      resource: {
        resourceTitle: 'Introduction to Statistical Learning',
        resourceType: 'Textbook (Free PDF)',
        url: 'https://www.statlearning.com/'
      },
      tags: ['Machine Learning', 'Statistics', 'Free Resource', 'Textbook', 'R Programming']
    }
  },
  {
    id: '12',
    content: 'Had an amazing mentoring session today with 5 students working on their portfolio projects! 💼 Saw everything from a React expense tracker to a Python web scraper. The creativity and determination of our students never cease to amaze me. Remember: your projects don\'t need to be perfect, they need to show your growth and passion!',
    author: mockUsers[3],
    likes: 76,
    shares: 22,
    comments: [
      {
        id: 'c19',
        content: 'Mike, thank you for the feedback on my portfolio site! The design suggestions were spot on.',
        author: mockUsers[5],
        createdAt: new Date('2024-09-14T14:20:00Z'),
        updatedAt: new Date('2024-09-14T14:20:00Z')
      }
    ],
    createdAt: new Date('2024-09-14T12:00:00Z'),
    updatedAt: new Date('2024-09-14T12:00:00Z'),
    type: 'discussion',
    metadata: {
      tags: ['Mentorship', 'Portfolio', 'Projects', 'Career Advice', 'Web Development']
    }
  }
]

// Helper functions
export const formatTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

export const searchPosts = (posts: Post[], query: string): Post[] => {
  if (!query.trim()) return posts
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
  
  return posts.filter(post => {
    const searchableText = [
      post.content,
      post.title || '',
      post.author.name,
      post.author.title || '',
      ...(post.metadata?.tags || []),
      post.metadata?.course?.courseTitle || '',
      post.metadata?.resource?.resourceTitle || '',
      post.metadata?.achievement?.badgeName || ''
    ].join(' ').toLowerCase()
    
    return searchTerms.some(term => searchableText.includes(term))
  })
}

export const filterByType = (posts: Post[], type?: string): Post[] => {
  if (!type || type === 'all') return posts
  return posts.filter(post => post.type === type)
}

export const sortPosts = (posts: Post[], sortBy: 'recent' | 'popular' | 'comments'): Post[] => {
  const sorted = [...posts]
  
  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => b.likes - a.likes)
    case 'comments':
      return sorted.sort((a, b) => b.comments.length - a.comments.length)
    case 'recent':
    default:
      return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }
}

// Trending topics for sidebar
export const trendingTopics = [
  { tag: 'React', count: 234 },
  { tag: 'Machine Learning', count: 189 },
  { tag: 'JavaScript', count: 156 },
  { tag: 'Python', count: 143 },
  { tag: 'Career Advice', count: 89 },
  { tag: 'Algorithms', count: 76 },
  { tag: 'Web Development', count: 67 },
  { tag: 'Data Science', count: 54 }
]

// Featured achievements for sidebar
export const featuredAchievements = [
  {
    id: 'achievement-1',
    name: 'Algorithm Master',
    description: 'Complete all advanced algorithm challenges',
    rarity: 'Legendary' as const,
    unlockedBy: 12
  },
  {
    id: 'achievement-2', 
    name: 'Code Mentor',
    description: 'Help 50 students with their coding questions',
    rarity: 'Epic' as const,
    unlockedBy: 34
  },
  {
    id: 'achievement-3',
    name: 'Project Builder',
    description: 'Complete 10 portfolio projects',
    rarity: 'Rare' as const,
    unlockedBy: 67
  }
]

// Popular courses for sidebar  
export const popularCourses = [
  {
    id: 'react-advanced-patterns',
    title: 'Advanced React Patterns',
    instructor: 'Dr. Sarah Johnson',
    students: 1234,
    rating: 4.9
  },
  {
    id: 'ml-fundamentals',
    title: 'Machine Learning Fundamentals', 
    instructor: 'Dr. Robert Zhang',
    students: 987,
    rating: 4.8
  },
  {
    id: 'fullstack-development',
    title: 'Full Stack Development Bootcamp',
    instructor: 'Carlos Mendoza',
    students: 756,
    rating: 4.7
  }
]

// Recent achievements for sidebar
export const recentAchievements = [
  {
    user: mockUsers[0],
    achievement: {
      name: 'Algorithm Master',
      rarity: 'Legendary' as const,
      description: 'Completed all advanced algorithm challenges'
    },
    timestamp: '2 hours ago'
  },
  {
    user: mockUsers[8],
    achievement: {
      name: 'Certified Ethical Hacker',
      rarity: 'Epic' as const,
      description: 'Earned CEH certification'
    },
    timestamp: '1 day ago'
  }
]

// Latest courses for sidebar
export const latestCourses = [
  {
    title: 'Advanced React Patterns',
    instructor: mockUsers[1],
    level: 'Advanced',
    duration: '12 hours',
    category: 'Web Development',
    students: 234,
    rating: 4.8
  },
  {
    title: 'Mathematics for Computer Science',
    instructor: mockUsers[6],
    level: 'Intermediate',
    duration: '16 weeks',
    category: 'Mathematics',
    students: 156,
    rating: 4.9
  }
]
