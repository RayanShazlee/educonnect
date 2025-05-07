import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import type { UserRole } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface AuthDialogProps {
  mode?: 'signin' | 'signup';
  trigger?: React.ReactNode;
}

export function AuthDialog({ mode = 'signin', trigger }: AuthDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(mode === 'signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as UserRole
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignIn) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.name, formData.email, formData.password, formData.role);
      }
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Sign In</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[rgb(42,54,59)] border-2 border-[rgb(69,183,175)] text-retro-text">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-retro-text">
            {isSignIn ? 'Sign In' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-retro-text/80">
            {isSignIn 
              ? 'Enter your credentials to access your account'
              : 'Fill in the information below to create your account'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {!isSignIn && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="retro-input"
                required={!isSignIn}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="retro-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="retro-input"
              required
            />
          </div>
          {error && (
            <p className="text-[rgb(255,107,107)] text-sm">{error}</p>
          )}
          <div className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="retro-button w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isSignIn ? 'Sign In' : 'Create Account'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="text-retro-text/80 hover:text-retro-text"
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError('');
                setFormData({ name: '', email: '', password: '', role: 'student' });
              }}
            >
              {isSignIn 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Sign In"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}