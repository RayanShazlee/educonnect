export type Community = {
  id: string
  name: string
  description: string
  memberCount: number
  category: string
  emoji: string
  isPrivate: boolean
  friendsJoined: number
  onlineCount: number
  lastActive?: string
  isAdmin?: boolean
  newPosts?: number
  matchPercentage?: number
  matchReason?: string
}

export const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Machine Learning Hub",
    description: "A community for ML enthusiasts, researchers, and practitioners.",
    memberCount: 1200,
    category: "Machine Learning",
    emoji: "🚀",
    isPrivate: false,
    friendsJoined: 3,
    onlineCount: 42
  },
  {
    id: "2",
    name: "Web Dev Masters",
    description: "Modern web development techniques and best practices.",
    memberCount: 3400,
    category: "Web Development",
    emoji: "💻",
    isPrivate: false,
    friendsJoined: 2,
    onlineCount: 89
  },
  {
    id: "3",
    name: "Data Science Network",
    description: "Data analysis, visualization, and statistical learning.",
    memberCount: 2800,
    category: "Data Science",
    emoji: "📊",
    isPrivate: false,
    friendsJoined: 1,
    onlineCount: 65
  },
  {
    id: "4",
    name: "Algorithms Study Group",
    description: "Master algorithmic problem solving together.",
    memberCount: 450,
    category: "Computer Science",
    emoji: "🎯",
    isPrivate: false,
    friendsJoined: 0,
    onlineCount: 42,
    isAdmin: true,
    lastActive: "2 hours ago",
    newPosts: 5
  },
  {
    id: "5",
    name: "AI Researchers",
    description: "Cutting-edge artificial intelligence research discussions.",
    memberCount: 5600,
    category: "Machine Learning",
    emoji: "🤖",
    isPrivate: false,
    friendsJoined: 0,
    onlineCount: 120,
    matchPercentage: 90,
    matchReason: "Based on your interest in Machine Learning"
  }
]

export const myCommunities = mockCommunities.filter(c => c.isAdmin)
export const suggestedCommunities = mockCommunities.filter(c => c.matchPercentage)

export function filterCommunities(
  communities: Community[],
  searchQuery: string,
  category: string
): Community[] {
  return communities.filter(community => {
    const matchesSearch = searchQuery === "" || 
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = category === "All" || community.category === category
    
    return matchesSearch && matchesCategory
  })
}