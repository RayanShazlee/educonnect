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