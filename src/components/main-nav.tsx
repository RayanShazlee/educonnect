"use client"

import { AuthDialog } from "@/components/auth-dialog"
import { UserProfileMenu } from "@/components/user-profile-menu"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Heart } from "lucide-react"
import { useCourseContext } from "@/lib/course-context"
import { NotificationBell } from "@/components/ui/notification-bell"

export function MainNav() {
  const pathname = usePathname()
  const { user, isAuthenticated, isEducator, isTeacher } = useAuth()
  const { wishlist } = useCourseContext()

  const isInstructor = isEducator() || isTeacher();

  return (
    <header className="retro-nav sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="retro-button font-press-start text-2xl border-2 border-[var(--retro-primary)] shadow-[4px_4px_0px_0px_var(--retro-primary)] hover:shadow-[2px_2px_0px_0px_var(--retro-primary)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
          >
            EduConnect
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/courses"
              className={`retro-button font-vt323 text-xl border-2 border-[var(--retro-primary)] shadow-[4px_4px_0px_0px_var(--retro-primary)] hover:shadow-[2px_2px_0px_0px_var(--retro-primary)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 ${
                pathname === '/courses' ? 'bg-[var(--retro-accent)]' : ''
              }`}
            >
              Courses
            </Link>
            <Link
              href="/communities"
              className={`retro-button font-vt323 text-xl border-2 border-[var(--retro-primary)] shadow-[4px_4px_0px_0px_var(--retro-primary)] hover:shadow-[2px_2px_0px_0px_var(--retro-primary)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 ${
                pathname === '/communities' ? 'bg-[var(--retro-accent)]' : ''
              }`}
            >
              Communities
            </Link>
            <Link
              href="/achievements"
              className={`retro-button font-vt323 text-xl border-2 border-[var(--retro-primary)] shadow-[4px_4px_0px_0px_var(--retro-primary)] hover:shadow-[2px_2px_0px_0px_var(--retro-primary)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 ${
                pathname === '/achievements' ? 'bg-[var(--retro-accent)]' : ''
              }`}
            >
              Achievements
            </Link>
            {isInstructor && (
              <Link
                href="/dashboard"
                className={`retro-button font-vt323 text-xl border-2 border-[var(--retro-primary)] shadow-[4px_4px_0px_0px_var(--retro-primary)] hover:shadow-[2px_2px_0px_0px_var(--retro-primary)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 ${
                  pathname === '/dashboard' ? 'bg-[var(--retro-accent)]' : ''
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AuthDialog 
                  mode="signin" 
                  trigger={
                    <Button variant="ghost" className="retro-button font-vt323 text-xl border-2 border-[var(--retro-primary)] shadow-[4px_4px_0px_0px_var(--retro-primary)] hover:shadow-[2px_2px_0px_0px_var(--retro-primary)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                      Sign In
                    </Button>
                  } 
                />
                <AuthDialog 
                  mode="signup" 
                  trigger={
                    <Button className="retro-button font-vt323 text-xl border-2 border-[var(--retro-primary)] shadow-[4px_4px_0px_0px_var(--retro-primary)] hover:shadow-[2px_2px_0px_0px_var(--retro-primary)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                      Sign Up
                    </Button>
                  } 
                />
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  href="/wishlist"
                  className="relative retro-link flex items-center"
                >
                  <Heart className="w-5 h-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[var(--retro-accent)] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <NotificationBell />
                <UserProfileMenu />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}