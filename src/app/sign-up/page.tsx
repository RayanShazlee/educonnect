'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    const name = formData.get('name')
    const role = formData.get('role')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      // TODO: Implement actual registration
      console.log('Signing up with:', { email, password, name, role })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store auth token in localStorage
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email as string)
      localStorage.setItem('userName', name as string)
      
      router.push('/courses')
    } catch (err) {
      setError('Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="retro-card p-8">
          <div className="text-center mb-8">
            <h1 className="retro-title text-3xl mb-2">Join EduConnect</h1>
            <p className="text-[rgb(247,247,247,0.8)]">Create your account and start learning</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="retro-input w-full"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="retro-input w-full"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="retro-input w-full"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="retro-input w-full"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <select
                id="role"
                name="role"
                required
                className="retro-input w-full"
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[rgb(255,107,107)] text-sm"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              className="retro-button w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </motion.button>

            <div className="text-center text-sm text-[rgb(247,247,247,0.8)]">
              Already have an account?{' '}
              <Link
                href="/sign-in"
                className="text-[rgb(255,107,107)] hover:text-[rgb(255,107,107,0.8)] transition-colors"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}