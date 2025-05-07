"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Heart, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Discussion {
  id: string;
  title: string;
  author: string;
  content: string;
  replies: number;
  likes: number;
  timeAgo: string;
}

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  topics: string[];
  image: string;
  isJoined: boolean;
  recentDiscussions: Discussion[];
  rules: string[];
  moderators: {
    name: string;
    role: string;
    image: string;
  }[];
}

const communityData: Record<string, Community> = {
  '1': {
    id: '1',
    name: 'Web Development Hub',
    description: 'A community for web developers to share knowledge and help each other. Join us to discuss the latest trends, best practices, and challenges in web development.',
    members: 1250,
    topics: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Web Design'],
    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=webdev',
    isJoined: true,
    recentDiscussions: [
      {
        id: 'd1',
        title: 'Best practices for React hooks',
        author: 'Sarah Chen',
        content: "I've been working with React hooks for a while now and wanted to share some best practices I've learned...",
        replies: 23,
        likes: 45,
        timeAgo: '2h ago'
      },
      {
        id: 'd2',
        title: 'CSS Grid vs Flexbox',
        author: 'Mike Ross',
        content: "Let's discuss when to use CSS Grid vs Flexbox. Here's my take on the different use cases...",
        replies: 15,
        likes: 32,
        timeAgo: '4h ago'
      }
    ],
    rules: [
      'Be respectful and helpful to other members',
      'No spam or self-promotion',
      'Use appropriate tags for your posts',
      'Search before asking questions'
    ],
    moderators: [
      {
        name: 'Sarah Chen',
        role: 'Admin',
        image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=sarah'
      },
      {
        name: 'Mike Ross',
        role: 'Moderator',
        image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=mike'
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Python Programmers',
    description: 'Learn, share, and explore Python programming together. From beginners to experts, everyone is welcome to join and contribute.',
    members: 980,
    topics: ['Python', 'Django', 'Flask', 'Data Science', 'Machine Learning'],
    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=python',
    isJoined: false,
    recentDiscussions: [
      {
        id: 'd3',
        title: 'Getting started with Django',
        author: 'John Smith',
        content: "Here's a comprehensive guide to getting started with Django framework...",
        replies: 18,
        likes: 29,
        timeAgo: '1d ago'
      }
    ],
    rules: [
      'Share code using proper formatting',
      'Be patient with beginners',
      'Keep discussions on topic',
      'No homework help without effort shown'
    ],
    moderators: [
      {
        name: 'John Smith',
        role: 'Admin',
        image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=john'
      }
    ]
  }
};

export default function CommunityDetailPage() {
  const params = useParams();
  const communityId = typeof params.id === 'string' ? params.id : '';
  const community = communityData[communityId];
  const [isJoined, setIsJoined] = useState(community?.isJoined || false);

  if (!community) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-press-start">Community not found</h1>
        <Link href="/communities" className="retro-link mt-4 inline-block">
          <ArrowLeft className="inline-block mr-2" />
          Back to Communities
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/communities" className="retro-link inline-flex items-center mb-6">
        <ArrowLeft className="mr-2" />
        Back to Communities
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="retro-card mb-8"
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-[var(--retro-primary)]">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="font-press-start text-2xl mb-2">{community.name}</h1>
                <p className="font-vt323 text-lg mb-4 opacity-80">{community.description}</p>
                <div className="flex flex-wrap gap-2">
                  {community.topics.map(topic => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-[var(--retro-primary)]/10 text-[var(--retro-primary)] rounded text-sm font-vt323"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t-2 border-[var(--retro-primary)] pt-4">
              <div className="flex items-center gap-4 font-vt323">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[var(--retro-primary)]" />
                  <span>{community.members} members</span>
                </div>
              </div>
              <button
                onClick={() => setIsJoined(!isJoined)}
                className={`retro-button ${
                  isJoined ? 'bg-[var(--retro-accent)] text-white' : ''
                }`}
              >
                {isJoined ? 'Leave Community' : 'Join Community'}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="retro-card"
          >
            <h2 className="font-press-start text-xl mb-6">Recent Discussions</h2>
            <div className="space-y-6">
              {community.recentDiscussions.map(discussion => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-lg bg-[var(--retro-bg)]/5 hover:bg-[var(--retro-bg)]/10 transition-colors cursor-pointer"
                >
                  <h3 className="font-vt323 text-lg font-bold mb-2">{discussion.title}</h3>
                  <p className="font-vt323 opacity-80 mb-4">{discussion.content}</p>
                  <div className="flex items-center justify-between text-sm font-vt323">
                    <div className="flex items-center gap-4">
                      <span className="opacity-70">{discussion.author}</span>
                      <span className="opacity-50">{discussion.timeAgo}</span>
                    </div>
                    <div className="flex items-center gap-4">
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="retro-card mb-8"
          >
            <h2 className="font-press-start text-xl mb-4">Community Rules</h2>
            <ul className="space-y-3">
              {community.rules.map((rule, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 font-vt323"
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--retro-primary)]" />
                  {rule}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="retro-card"
          >
            <h2 className="font-press-start text-xl mb-4">Moderators</h2>
            <div className="space-y-4">
              {community.moderators.map((mod) => (
                <div key={mod.name} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--retro-primary)]">
                    <img
                      src={mod.image}
                      alt={mod.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-vt323 text-lg">{mod.name}</h3>
                    <span className="font-vt323 text-sm text-[var(--retro-primary)]">
                      {mod.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 