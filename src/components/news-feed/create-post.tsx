import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { RetroIcon } from '@/components/ui/retro-icon'
import { 
  PlusCircle, 
  Image, 
  Link, 
  Hash, 
  X,
  MessageSquare,
  Trophy,
  BookOpen,
  Megaphone,
  Upload,
  ExternalLink
} from 'lucide-react'

export interface PostData {
  type: 'text' | 'achievement' | 'course' | 'resource' | 'announcement'
  title?: string
  content: string
  tags?: string[]
  mediaUrls?: string[]
  attachments?: File[]
  timestamp: Date
}

interface CreatePostProps {
  onCreatePost?: (postData: PostData) => void
  className?: string
}

const CreatePost: React.FC<CreatePostProps> = ({ onCreatePost, className }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [postType, setPostType] = useState<'text' | 'achievement' | 'course' | 'resource' | 'announcement'>('text')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [currentUrl, setCurrentUrl] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const postTypes = [
    { type: 'text', label: 'Discussion', icon: <MessageSquare className="w-4 h-4" />, color: 'text-retro-text' },
    { type: 'achievement', label: 'Achievement', icon: <Trophy className="w-4 h-4" />, color: 'text-yellow-400' },
    { type: 'course', label: 'Course', icon: <BookOpen className="w-4 h-4" />, color: 'text-retro-primary' },
    { type: 'resource', label: 'Resource', icon: <Link className="w-4 h-4" />, color: 'text-green-400' },
    { type: 'announcement', label: 'Announcement', icon: <Megaphone className="w-4 h-4" />, color: 'text-retro-accent' }
  ]

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      // In a real app, you'd upload these files and get URLs back
      const mockUrls = files.map(file => `https://placeholder.com/${file.name}`)
      setMediaUrls([...mediaUrls, ...mockUrls])
      setShowFileUpload(false)
    }
  }

  const addUrlLink = () => {
    if (currentUrl.trim()) {
      setMediaUrls([...mediaUrls, currentUrl.trim()])
      setCurrentUrl('')
      setShowUrlInput(false)
    }
  }

  const removeMediaUrl = (index: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!content.trim()) return

    const postData: PostData = {
      type: postType,
      title: title.trim() || undefined,
      content: content.trim(),
      tags: tags.length > 0 ? tags : undefined,
      mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
      timestamp: new Date()
    }

    onCreatePost?.(postData)
    
    // Reset form
    setTitle('')
    setContent('')
    setTags([])
    setNewTag('')
    setMediaUrls([])
    setCurrentUrl('')
    setShowUrlInput(false)
    setShowFileUpload(false)
    setIsExpanded(false)
    setPostType('text')
  }

  return (
    <Card className={`retro-card ${className}`}>
      <CardContent className="p-4">
        {!isExpanded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <div className="text-3xl">👤</div>
            <div className="flex-1 bg-retro-bg/20 rounded-lg px-4 py-3 border border-retro-text/20 hover:border-retro-primary/50 transition-colors">
              <p className="font-vt323 text-retro-text/60">Share your thoughts, achievements, or resources...</p>
            </div>
            <Button size="sm" className="retro-button">
              <PlusCircle className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Post Type Selection */}
            <div className="flex flex-wrap gap-2">
              {postTypes.map(({ type, label, icon, color }) => (
                <Button
                  key={type}
                  variant={postType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPostType(type as any)}
                  className={`flex items-center gap-2 font-vt323 ${
                    postType === type ? 'retro-button' : 'retro-button-secondary'
                  }`}
                >
                  <span className={color}>{icon}</span>
                  {label}
                </Button>
              ))}
            </div>

            {/* Title Input (for certain post types) */}
            {(postType === 'course' || postType === 'resource' || postType === 'announcement') && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Input
                  placeholder={`${postTypes.find(pt => pt.type === postType)?.label} title...`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="retro-input font-vt323"
                />
              </motion.div>
            )}

            {/* Content Textarea */}
            <Textarea
              placeholder="What's on your mind? Share your thoughts, ask questions, or tell us about your latest learning adventure..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="retro-input font-vt323 min-h-[120px] resize-none"
              autoFocus
            />

            {/* Tags Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-retro-primary" />
                <Input
                  placeholder="Add tags (press Enter)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                  className="retro-input font-vt323 text-sm"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={addTag}
                  variant="outline"
                  className="retro-button-secondary px-3"
                >
                  Add
                </Button>
              </div>
              
              {tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap gap-2"
                >
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="font-vt323 text-xs flex items-center gap-1 group hover:bg-retro-accent/20"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tags.indexOf(tag))}
                        className="ml-1 hover:text-retro-accent transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Media Upload Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-retro-bg/10 rounded-lg border border-retro-text/10">
                <span className="font-vt323 text-sm text-retro-text/80">Add to your post:</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFileUpload}
                    className="p-2 hover:bg-retro-primary/20 hover:text-retro-primary transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="p-2 hover:bg-retro-primary/20 hover:text-retro-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* URL Input */}
              <AnimatePresence>
                {showUrlInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-2"
                  >
                    <Input
                      placeholder="Enter URL to attach..."
                      value={currentUrl}
                      onChange={(e) => setCurrentUrl(e.target.value)}
                      className="flex-1 font-vt323"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addUrlLink()
                        }
                      }}
                    />
                    <Button onClick={addUrlLink} size="sm" className="retro-button">
                      Add
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Media Preview */}
              {mediaUrls.length > 0 && (
                <div className="space-y-2">
                  <p className="font-vt323 text-sm text-retro-text/80">Attached:</p>
                  <div className="flex flex-wrap gap-2">
                    {mediaUrls.map((url, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="font-vt323 flex items-center gap-1"
                      >
                        <span className="truncate max-w-32">{url}</span>
                        <button
                          onClick={() => removeMediaUrl(index)}
                          className="ml-1 hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-retro-text/10">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsExpanded(false)
                  setTitle('')
                  setContent('')
                  setTags([])
                  setNewTag('')
                  setPostType('text')
                }}
                className="font-vt323 hover:text-retro-text/60"
              >
                Cancel
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="retro-button-secondary font-vt323"
                >
                  Save Draft
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                  className="retro-button font-vt323"
                >
                  Post
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default CreatePost
