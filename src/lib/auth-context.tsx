"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type UserRole = 'student' | 'educator' | 'teacher';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  signOut: () => void;
  isEducator: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user database
const USERS_KEY = 'educonnect_users';
const SESSION_KEY = 'educonnect_session';

interface StoredUser extends User {
  password: string;
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUser(user: StoredUser) {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      const sessionUser = JSON.parse(session);
      setUser(sessionUser);
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const users = getStoredUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...sessionUser } = user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      toast.success('Successfully signed in!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const users = getStoredUsers();
      if (users.some(u => u.email === email)) {
        throw new Error('Email already exists');
      }

      const newUser: StoredUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        password,
        role,
        image: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${email}`,
      };

      saveUser(newUser);
      const { password: _, ...sessionUser } = newUser;
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      toast.success('Successfully signed up!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign up');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    toast.success('Successfully signed out!');
  };

  const isEducator = () => user?.role === 'educator';
  const isTeacher = () => user?.role === 'teacher';
  const isStudent = () => user?.role === 'student';

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated,
      signIn, 
      signUp, 
      signOut,
      isEducator,
      isTeacher,
      isStudent,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}