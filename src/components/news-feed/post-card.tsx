import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Post } from '@/lib/types'
import { formatTimeAgo } from '@/lib/news-feed-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RetroIcon } from '@/components/ui/retro-icon'
import { 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Trophy, 
  BookOpen, 
  Link, 
  Megaphone,
  Hash,
  ExternalLink,
  Heart,
  MoreHorizontal
} from 'lucide-react'

interface PostCardProps {
  post: Post
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  onShare?: (postId: string) => void
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onLike, 
  onComment, 
  onShare 
}) => {
  const router = useRouter()

  const handleViewCourse = () => {
    if (post.metadata?.course?.courseId) {
      router.push(`/courses/${post.metadata.course.courseId}`)
    }
  }

  const handleViewResource = () => {
    if (post.metadata?.resource?.url) {
      window.open(post.metadata.resource.url, '_blank', 'noopener,noreferrer')
    }
  }
  const getPostIcon = () => {
    switch (post.type) {
      case 'achievement':
        return <Trophy className="w-full h-full" />
      case 'course':
        return <BookOpen className="w-full h-full" />
      case 'resource':
        return <Link className="w-full h-full" />
      case 'announcement':
        return <Megaphone className="w-full h-full" />
      default:
        return <Hash className="w-full h-full" />
    }
  }

  const getRarity = () => {
    if (post.metadata?.achievement?.rarity) {
      return post.metadata.achievement.rarity
    }
    return 'Common' as const
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="retro-card group hover:shadow-lg transition-all duration-300"
    >
      {/* Post Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl flex-shrink-0">{post.author.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-press-start text-sm truncate">{post.author.name}</h3>
            <RetroIcon
              icon={getPostIcon()}
              rarity={getRarity()}
              size="sm"
            />
            <span className="text-xs text-retro-text/40">•</span>
            <span className="text-xs text-retro-text/60">
              {formatTimeAgo(post.createdAt)}
            </span>
            <Button variant="ghost" size="sm" className="ml-auto p-1 h-6 w-6">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-xs text-retro-text/60 mb-2">{post.author.title}</p>
        </div>
      </div>

      {/* Post Title */}
      {post.title && (
        <h2 className="font-press-start text-base mb-3 text-retro-accent">
          {post.title}
        </h2>
      )}

      {/* Post Content */}
      <p className="font-vt323 text-lg mb-4 leading-relaxed">
        {post.content}
      </p>

      {/* Post Metadata */}
      {post.metadata && (
        <div className="mb-4">
          {/* Achievement Card */}
          {post.type === 'achievement' && post.metadata.achievement && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-r from-retro-accent/10 to-retro-primary/10 rounded-lg p-4 border border-retro-accent/20"
            >
              <div className="flex items-center gap-3">
                <RetroIcon
                  icon={<Trophy className="w-full h-full" />}
                  rarity={post.metadata.achievement.rarity}
                  size="md"
                />
                <div className="flex-1">
                  <h4 className="font-press-start text-sm text-retro-accent mb-1">
                    {post.metadata.achievement.badgeName}
                  </h4>
                  <p className="text-sm text-retro-text/80">
                    {post.metadata.achievement.badgeDescription}
                  </p>
                  <Badge 
                    variant="secondary" 
                    className={`mt-2 font-vt323 ${
                      post.metadata.achievement.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                      post.metadata.achievement.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-300' :
                      post.metadata.achievement.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {post.metadata.achievement.rarity}
                  </Badge>
                </div>
              </div>
            </motion.div>
          )}

          {/* Course Card */}
          {post.type === 'course' && post.metadata.course && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-r from-retro-primary/10 to-retro-accent/10 rounded-lg p-4 border border-retro-primary/20"
            >
              <div className="flex items-start gap-3">
                <RetroIcon
                  icon={<BookOpen className="w-full h-full" />}
                  rarity="Rare"
                  size="md"
                />
                <div className="flex-1">
                  <h4 className="font-press-start text-sm text-retro-primary mb-1">
                    {post.metadata.course.courseTitle}
                  </h4>
                  <div className="flex flex-wrap gap-2 text-sm text-retro-text/80 mb-2">
                    <span>{post.metadata.course.duration}</span>
                    <span>•</span>
                    <span>{post.metadata.course.level}</span>
                    <span>•</span>
                    <span>{post.metadata.course.category}</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="retro-button text-xs"
                    onClick={handleViewCourse}
                  >
                    View Course
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Resource Card */}
          {post.type === 'resource' && post.metadata.resource && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-500/20"
            >
              <div className="flex items-center gap-3">
                <RetroIcon
                  icon={<Link className="w-full h-full" />}
                  rarity="Rare"
                  size="md"
                />
                <div className="flex-1">
                  <h4 className="font-press-start text-sm text-green-400 mb-1">
                    {post.metadata.resource.resourceTitle}
                  </h4>
                  <p className="text-sm text-retro-text/80 mb-2">
                    {post.metadata.resource.resourceType}
                  </p>
                  {post.metadata.resource.url && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="retro-button-secondary text-xs"
                      onClick={handleViewResource}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Resource
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Tags */}
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.metadata.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="font-vt323 text-xs hover:bg-retro-primary/20 hover:border-retro-primary/50 transition-colors cursor-pointer"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-retro-text/10">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike?.(post.id)}
            className="flex items-center gap-2 hover:text-retro-accent transition-colors group"
          >
            <Heart className="w-4 h-4 group-hover:fill-current" />
            <span className="text-sm font-vt323">{post.likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComment?.(post.id)}
            className="flex items-center gap-2 hover:text-retro-primary transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-vt323">{post.comments.length}</span>
          </Button>
          
          {post.shares !== undefined && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare?.(post.id)}
              className="flex items-center gap-2 hover:text-retro-accent transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-vt323">{post.shares}</span>
            </Button>
          )}
        </div>

        {post.type && (
          <Badge variant="secondary" className="font-vt323 text-xs">
            {post.type}
          </Badge>
        )}
      </div>

      {/* Comments Preview */}
      {post.comments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-retro-text/10"
        >
          <h5 className="font-press-start text-xs mb-3 text-retro-text/80">
            Recent Comments
          </h5>
          <div className="space-y-3">
            {post.comments.slice(0, 2).map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="text-lg flex-shrink-0">{comment.author.avatar}</div>
                <div className="flex-1 bg-retro-bg/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-vt323 text-sm font-bold">
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-retro-text/40">
                      {formatTimeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="font-vt323 text-sm text-retro-text/90">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {post.comments.length > 2 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-3 font-vt323 text-xs hover:text-retro-primary"
            >
              View all {post.comments.length} comments
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default PostCard
