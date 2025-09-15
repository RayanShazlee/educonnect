export interface Skill {
  name: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface WorkExperience {
  id: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description?: string
  skills: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  current: boolean
  gpa?: number
}

export interface Resume {
  id: string
  title: string
  objective?: string
  userId: string
  experience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  title?: string
  bio?: string
  role: 'STUDENT' | 'TEACHER' | 'MENTOR' | 'INSTITUTION'
}

export interface Post {
  id: string
  title?: string
  content: string
  mediaUrls?: string[]
  author: User
  likes: number
  comments: PostComment[]
  shares?: number
  createdAt: Date
  updatedAt: Date
  type: 'text' | 'achievement' | 'course' | 'resource' | 'discussion' | 'announcement'
  metadata?: {
    achievement?: {
      badgeName: string
      badgeDescription: string
      rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
    }
    course?: {
      courseId: string
      courseTitle: string
      duration: string
      level: string
      category: string
    }
    resource?: {
      resourceTitle: string
      resourceType: string
      url?: string
    }
    tags?: string[]
  }
}

export interface PostComment {
  id: string
  content: string
  author: User
  createdAt: Date
  updatedAt: Date
}

export interface Community {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  emoji?: string
  isPrivate: boolean
  recentActivity?: string
}