'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      // TODO: Implement actual authentication
      console.log('Signing in with:', { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store auth token in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email as string);
      
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="retro-card p-8">
          <div className="text-center mb-8">
            <h1 className="retro-title text-3xl mb-2">Welcome Back</h1>
            <p className="text-[rgb(247,247,247,0.8)]">Sign in to your EduConnect account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="w-4 h-4 rounded border-2 border-[rgb(69,183,175)] bg-[rgb(42,54,59)] 
                text-[rgb(69,183,175)] focus:ring-[rgb(69,183,175)] focus:ring-2"
              />
              <Label htmlFor="rememberMe" className="text-sm text-[rgb(247,247,247,0.8)]">
                Remember me
              </Label>
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
              {isLoading ? 'Signing In...' : 'Sign In'}
            </motion.button>

            <div className="text-center text-sm text-[rgb(247,247,247,0.8)]">
              Don't have an account?{' '}
              <Link
                href="/sign-up"
                className="text-[rgb(255,107,107)] hover:text-[rgb(255,107,107,0.8)] transition-colors"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}