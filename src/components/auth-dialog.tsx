'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from 'sonner'

type UserRole = 'student' | 'educator' | 'teacher'

interface AuthDialogProps {
  mode: 'signin' | 'signup'
  trigger: React.ReactNode
}

export function AuthDialog({ mode: initialMode, trigger }: AuthDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState(initialMode)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, signUp } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as UserRole
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (mode === 'signup') {
        await signUp(formData.name, formData.email, formData.password, formData.role)
      } else {
        await signIn(formData.email, formData.password)
      }
      setIsOpen(false)
      setFormData({ name: '', email: '', password: '', role: 'student' })
    } catch (error) {
      console.error('Auth error:', error)
      toast.error('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setFormData({ name: '', email: '', password: '', role: 'student' })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[var(--retro-bg)] border-[var(--retro-primary)]">
        <DialogHeader>
          <DialogTitle className="font-press-start text-xl text-center">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
          className="space-y-4 mt-4"
        >
          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="font-vt323 text-lg" htmlFor="name">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required={mode === 'signup'}
                  className="retro-input"
                  placeholder="Enter your name"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="font-vt323 text-lg" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="retro-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <label className="font-vt323 text-lg" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="retro-input"
              placeholder="Enter your password"
            />
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="font-vt323 text-lg" htmlFor="role">
                Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={formData.role === 'student' ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`font-vt323 ${
                    formData.role === 'student'
                      ? 'bg-[var(--retro-primary)] text-[var(--retro-text)]'
                      : 'hover:bg-[var(--retro-primary)]/10'
                  }`}
                >
                  Student
                </Button>
                <Button
                  type="button"
                  variant={formData.role === 'educator' ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, role: 'educator' })}
                  className={`font-vt323 ${
                    formData.role === 'educator'
                      ? 'bg-[var(--retro-primary)] text-[var(--retro-text)]'
                      : 'hover:bg-[var(--retro-primary)]/10'
                  }`}
                >
                  Educator
                </Button>
                <Button
                  type="button"
                  variant={formData.role === 'teacher' ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, role: 'teacher' })}
                  className={`font-vt323 ${
                    formData.role === 'teacher'
                      ? 'bg-[var(--retro-primary)] text-[var(--retro-text)]'
                      : 'hover:bg-[var(--retro-primary)]/10'
                  }`}
                >
                  Teacher
                </Button>
              </div>
            </div>
          )}

          <div className="pt-4 space-y-4">
            <Button
              type="submit"
              className="retro-button w-full"
              disabled={isLoading}
            >
              {isLoading
                ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-t-transparent border-[var(--retro-text)] rounded-full"
                  />
                )
                : mode === 'signin'
                ? 'Sign In'
                : 'Sign Up'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="font-vt323 text-[var(--retro-primary)] hover:text-[var(--retro-accent)] transition-colors"
              >
                {mode === 'signin'
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
} 