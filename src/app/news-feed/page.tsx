'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Filter,
  RefreshCw,
  TrendingUp,
  Clock,
  ThumbsUp
} from 'lucide-react';
import { 
  mockPosts, 
  searchPosts,
  formatTimeAgo 
} from '@/lib/news-feed-data';
import { Post } from '@/lib/types';
import PostCard from '@/components/news-feed/post-card';
import CreatePost from '@/components/news-feed/create-post';
import NewsFeedSidebar from '@/components/news-feed/news-feed-sidebar';
import { useDebounce } from '@/hooks/use-debounce';
import { useAuth } from '@/lib/auth-context';

export default function NewsFeedPage() {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Debounce search query to avoid excessive filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // Memoize search results
  const searchResults = useMemo(() => {
    return debouncedSearchQuery.trim() ? searchPosts(debouncedSearchQuery) : posts;
  }, [debouncedSearchQuery, posts]);

  const filters = [
    { value: 'all', label: 'All Posts', count: posts.length },
    { value: 'text', label: 'Discussions', count: posts.filter(p => p.type === 'text').length },
    { value: 'achievement', label: 'Achievements', count: posts.filter(p => p.type === 'achievement').length },
    { value: 'course', label: 'Courses', count: posts.filter(p => p.type === 'course').length },
    { value: 'resource', label: 'Resources', count: posts.filter(p => p.type === 'resource').length },
    { value: 'announcement', label: 'Announcements', count: posts.filter(p => p.type === 'announcement').length }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent', icon: <Clock className="w-4 h-4" /> },
    { value: 'popular', label: 'Most Popular', icon: <ThumbsUp className="w-4 h-4" /> },
    { value: 'trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  const getFilteredPosts = useCallback(() => {
    let filteredPosts = searchResults;

    // Apply type filter
    if (filter !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.type === filter);
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        filteredPosts = [...filteredPosts].sort((a, b) => b.likes - a.likes);
        break;
      case 'trending':
        // Sort by engagement rate (likes + comments + shares)
        filteredPosts = [...filteredPosts].sort((a, b) => {
          const aEngagement = a.likes + a.comments.length + (a.shares || 0);
          const bEngagement = b.likes + b.comments.length + (b.shares || 0);
          return bEngagement - aEngagement;
        });
        break;
      case 'recent':
      default:
        filteredPosts = [...filteredPosts].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return filteredPosts;
  }, [searchResults, filter, sortBy]);

  const handleCreatePost = useCallback((postData: any) => {
    // Ensure user is authenticated
    if (!isAuthenticated || !user) {
      console.error('User must be authenticated to create posts');
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title: postData.title,
      content: postData.content,
      author: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.image || '👤',
        title: user.role === 'teacher' ? 'Teacher' : user.role === 'educator' ? 'Educator' : 'Student',
        role: user.role.toUpperCase() as 'STUDENT' | 'TEACHER' | 'MENTOR'
      },
      likes: 0,
      comments: [],
      shares: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: postData.type,
      metadata: postData.tags ? { tags: postData.tags } : undefined
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, [isAuthenticated, user]);

  const handleLike = useCallback((postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const filteredPosts = getFilteredPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="retro-title">News Feed</h1>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="retro-button-secondary"
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            <p className="text-lg text-retro-text/80 mb-6">
              Stay connected with your learning community
            </p>

            {/* Search and Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-retro-text/50 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search posts, users, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 retro-input"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="retro-input text-sm min-w-[140px]"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                <Button
                  variant="outline"
                  className="retro-button-secondary flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filterOption) => (
                <Button
                  key={filterOption.value}
                  onClick={() => setFilter(filterOption.value)}
                  variant={filter === filterOption.value ? "default" : "outline"}
                  size="sm"
                  className={`${
                    filter === filterOption.value 
                      ? 'retro-button' 
                      : 'retro-button-secondary'
                  } font-vt323`}
                >
                  {filterOption.label}
                  <Badge 
                    variant="secondary" 
                    className="ml-2 text-xs"
                  >
                    {filterOption.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Create Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <CreatePost onCreatePost={handleCreatePost} />
          </motion.div>

          {/* Posts Feed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🤔</div>
                <h3 className="font-press-start text-lg mb-2">No posts found</h3>
                <p className="font-vt323 text-retro-text/60">
                  {searchQuery 
                    ? `No posts match "${searchQuery}". Try a different search term.`
                    : 'No posts in this category yet. Be the first to share something!'
                  }
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PostCard
                      post={post}
                      onLike={handleLike}
                      onComment={(postId) => console.log('Comment on', postId)}
                      onShare={(postId) => console.log('Share', postId)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Load More Button */}
            {filteredPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center pt-6"
              >
                <Button 
                  variant="outline" 
                  className="retro-button-secondary font-vt323"
                >
                  Load More Posts
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <NewsFeedSidebar />
          </motion.div>
        </div>
      </div>
    </div>
  );
} 