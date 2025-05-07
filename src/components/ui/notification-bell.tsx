'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "Course Update",
    message: "New content available in Web Development course",
    time: "2h ago",
    read: false,
  },
  {
    id: "2",
    title: "Achievement Unlocked",
    message: "You've earned the 'Quick Learner' badge!",
    time: "5h ago",
    read: false,
  },
  {
    id: "3",
    title: "Community Activity",
    message: "Someone replied to your discussion post",
    time: "1d ago",
    read: true,
  },
]

export function NotificationBell() {
  const [notifications, setNotifications] = useState(sampleNotifications)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative retro-link">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[var(--retro-accent)] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-[var(--retro-bg)] border-2 border-[var(--retro-primary)]">
        <div className="flex justify-between items-center p-4 border-b border-[var(--retro-primary)]">
          <span className="font-press-start text-sm">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              className="text-xs font-vt323 text-[var(--retro-primary)] hover:text-[var(--retro-accent)]"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            className={`flex flex-col items-start p-4 space-y-1 cursor-pointer hover:bg-[var(--retro-primary)]/10 ${
              notification.read ? 'opacity-60' : ''
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="font-press-start text-sm">{notification.title}</div>
            <div className="font-vt323 text-[var(--retro-text)]/80">{notification.message}</div>
            <div className="text-xs text-[var(--retro-text)]/60">{notification.time}</div>
          </DropdownMenuItem>
        ))}
        {notifications.length === 0 && (
          <div className="p-4 text-center font-vt323 text-[var(--retro-text)]/60">
            No new notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 