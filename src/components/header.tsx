'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Search, Menu, X, User, Settings, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { NotificationBell } from '@/components/ui/notification-bell'
import { motion, AnimatePresence } from 'framer-motion'

// Mock notifications for demo
const NOTIFICATIONS = [
  {
    id: 1,
    title: "New Achievement Unlocked",
    message: "You've earned the 'Quick Learner' badge!",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Course Update",
    message: "New content available in 'Web Development Basics'",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Community Activity",
    message: "Someone replied to your post in JavaScript Community",
    time: "2 hours ago",
    read: true,
  },
]

const MENU_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/communities', label: 'Communities' },
  { href: '/achievements', label: 'Achievements' },
]

export function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Check authentication status on mount and after any changes
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated') === 'true'
      const email = localStorage.getItem('userEmail') || ''
      setIsAuthenticated(auth)
      setUserEmail(email)
    }

    checkAuth()
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    setIsAuthenticated(false)
    setUserEmail('')
    router.push('/sign-in')
  }

  return (
    <header className="border-b-2 border-[rgb(69,183,175)] bg-[rgb(42,54,59,0.95)] backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="retro-title text-2xl hover:text-[rgb(255,230,109)] transition-colors">
            EduConnect
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link hover:scale-105 transition-transform"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                {/* Search */}
                <div className="relative">
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="retro-button !p-2"
                  >
                    <Search className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {isSearchOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute right-0 mt-2 w-72"
                      >
                        <div className="retro-card p-2">
                          <input
                            type="search"
                            placeholder="Search..."
                            className="retro-input w-full"
                            autoFocus
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Notifications */}
                <NotificationBell />

                {/* Profile Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="retro-button !p-2">
                      <User className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-2 rounded-lg border-2 border-[rgb(69,183,175)] bg-[rgb(42,54,59,0.95)] backdrop-blur-sm">
                    <DropdownMenuLabel className="text-[rgb(247,247,247)]">
                      <div className="truncate">{userEmail}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="border-[rgb(69,183,175)]" />
                    <DropdownMenuItem className="text-[rgb(247,247,247)] hover:bg-[rgb(255,107,107,0.1)] cursor-pointer">
                      <Link href="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[rgb(247,247,247)] hover:bg-[rgb(255,107,107,0.1)] cursor-pointer">
                      <Link href="/settings" className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-[rgb(69,183,175)]" />
                    <DropdownMenuItem 
                      className="text-[rgb(247,247,247)] hover:bg-[rgb(255,107,107,0.1)] cursor-pointer"
                      onClick={handleLogout}
                    >
                      <div className="flex items-center w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/sign-in">
                  <motion.button
                    className="retro-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link href="/sign-up">
                  <motion.button
                    className="retro-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="retro-button !p-2 md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-link block hover:translate-x-2 transition-transform"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
} 