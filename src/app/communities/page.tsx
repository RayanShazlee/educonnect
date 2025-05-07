"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Users, MessageSquare, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'

interface Community {
  id: string
  name: string
  description: string
  members: number
  topics: string[]
  image: string
  isJoined: boolean
  recentDiscussions: {
    id: string
    title: string
    author: string
    replies: number
    likes: number
    timeAgo: string
  }[]
}

const communities: Community[] = [
  {
    id: '1',
    name: 'Web Development Hub',
    description: 'A community for web developers to share knowledge and help each other.',
    members: 1250,
    topics: ['HTML', 'CSS', 'JavaScript', 'React'],
    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=webdev',
    isJoined: true,
    recentDiscussions: [
      {
        id: 'd1',
        title: 'Best practices for React hooks',
        author: 'Sarah Chen',
        replies: 23,
        likes: 45,
        timeAgo: '2h ago'
      },
      {
        id: 'd2',
        title: 'CSS Grid vs Flexbox',
        author: 'Mike Ross',
        replies: 15,
        likes: 32,
        timeAgo: '4h ago'
      }
    ]
  },
  {
    id: '2',
    name: 'Python Programmers',
    description: 'Learn, share, and explore Python programming together.',
    members: 980,
    topics: ['Python', 'Django', 'Flask', 'Data Science'],
    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=python',
    isJoined: false,
    recentDiscussions: [
      {
        id: 'd3',
        title: 'Getting started with Django',
        author: 'John Smith',
        replies: 18,
        likes: 29,
        timeAgo: '1d ago'
      }
    ]
  },
  {
    id: '3',
    name: 'Machine Learning Enthusiasts',
    description: 'Discuss ML concepts, share projects, and learn together.',
    members: 750,
    topics: ['ML', 'AI', 'Neural Networks', 'Data Science'],
    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=ml',
    isJoined: false,
    recentDiscussions: [
      {
        id: 'd4',
        title: 'Introduction to Neural Networks',
        author: 'Emily Wang',
        replies: 31,
        likes: 56,
        timeAgo: '3h ago'
      },
      {
        id: 'd5',
        title: 'Best ML frameworks for beginners',
        author: 'David Kumar',
        replies: 27,
        likes: 41,
        timeAgo: '6h ago'
      }
    ]
  }
]

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<string>('all')
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>(
    communities.filter(c => c.isJoined).map(c => c.id)
  )

  const allTopics = Array.from(
    new Set(communities.flatMap(community => community.topics))
  )

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTopic = selectedTopic === 'all' || community.topics.includes(selectedTopic)
    return matchesSearch && matchesTopic
  })

  const handleJoinCommunity = (communityId: string) => {
    setJoinedCommunities(prev => 
      prev.includes(communityId) 
        ? prev.filter(id => id !== communityId)
        : [...prev, communityId]
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-press-start mb-4">Communities</h1>
        <p className="font-vt323 text-xl opacity-80">Connect, learn, and grow together</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="retro-input w-full pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--retro-primary)] opacity-50" />
        </div>
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="retro-input md:w-48"
        >
          <option value="all">All Topics</option>
          {allTopics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCommunities.map((community) => (
          <Link href={`/communities/${community.id}`} key={community.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="retro-card h-full"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-[var(--retro-primary)]">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-press-start text-lg mb-2">{community.name}</h3>
                  <p className="font-vt323 text-base opacity-80 mb-2">{community.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {community.topics.map(topic => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-[var(--retro-primary)]/10 text-[var(--retro-primary)] rounded text-sm font-vt323"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 font-vt323">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--retro-primary)]" />
                  <span>{community.members} members</span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleJoinCommunity(community.id);
                  }}
                  className={`retro-button ${
                    joinedCommunities.includes(community.id)
                      ? 'bg-[var(--retro-accent)] text-white'
                      : ''
                  }`}
                >
                  {joinedCommunities.includes(community.id) ? 'Leave' : 'Join'}
                </button>
              </div>

              {community.recentDiscussions.length > 0 && (
                <div>
                  <h4 className="font-press-start text-sm mb-3">Recent Discussions</h4>
                  <div className="space-y-3">
                    {community.recentDiscussions.map(discussion => (
                      <div
                        key={discussion.id}
                        className="p-3 rounded-lg bg-[var(--retro-bg)]/5 hover:bg-[var(--retro-bg)]/10 transition-colors cursor-pointer"
                      >
                        <h5 className="font-vt323 text-base mb-2">{discussion.title}</h5>
                        <div className="flex items-center justify-between text-sm font-vt323">
                        <div className="flex items-center gap-4">
                            <span className="opacity-70">{discussion.author}</span>
                            <span className="opacity-50">{discussion.timeAgo}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{discussion.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{discussion.likes}</span>
                            </div>
                            <Share2 className="w-4 h-4 cursor-pointer hover:text-[var(--retro-accent)]" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                        </div>
                )}
            </motion.div>
          </Link>
                ))}
      </div>
    </div>
  )
}