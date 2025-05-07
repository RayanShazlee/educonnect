import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EduConnect - Learn, Connect, Grow',
  description: 'A modern platform for educational collaboration and achievement tracking',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  themeColor: '#2A363B',
  manifest: '/manifest.json',
  openGraph: {
    title: 'EduConnect',
    description: 'Learn, Connect, Grow - A modern educational platform',
    images: ['/og-image.png'],
  },
} 