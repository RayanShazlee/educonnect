'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Bell, Mail, Lock, User, Globe } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      courseUpdates: true,
      newMessages: true
    },
    privacy: {
      profileVisibility: 'public',
      showProgress: true,
      showEnrollments: true
    },
    preferences: {
      language: 'English',
      timezone: 'UTC',
      emailFrequency: 'daily'
    }
  });

  const handleNotificationToggle = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handlePrivacyToggle = (key: keyof typeof settings.privacy) => {
    if (key === 'profileVisibility') {
      setSettings(prev => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          profileVisibility: prev.privacy.profileVisibility === 'public' ? 'private' : 'public'
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          [key]: !prev.privacy[key as keyof typeof prev.privacy]
        }
      }));
    }
  };

  const handlePreferenceChange = (key: keyof typeof settings.preferences, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Settings saved successfully!');
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-press-start mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Notification Settings */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="retro-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-[var(--retro-primary)]" />
              <h2 className="text-xl font-press-start">Notifications</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="font-vt323 text-lg capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <Button
                    onClick={() => handleNotificationToggle(key as keyof typeof settings.notifications)}
                    className={`retro-button-secondary ${value ? 'bg-[var(--retro-primary)] text-white' : ''}`}
                  >
                    {value ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Privacy Settings */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="retro-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-[var(--retro-primary)]" />
              <h2 className="text-xl font-press-start">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-vt323 text-lg">Profile Visibility</span>
                <Button
                  onClick={() => handlePrivacyToggle('profileVisibility')}
                  className={`retro-button-secondary ${
                    settings.privacy.profileVisibility === 'public' ? 'bg-[var(--retro-primary)] text-white' : ''
                  }`}
                >
                  {settings.privacy.profileVisibility === 'public' ? 'Public' : 'Private'}
                </Button>
              </div>
              {Object.entries(settings.privacy)
                .filter(([key]) => key !== 'profileVisibility')
                .map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="font-vt323 text-lg capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Button
                      onClick={() => handlePrivacyToggle(key as keyof typeof settings.privacy)}
                      className={`retro-button-secondary ${value ? 'bg-[var(--retro-primary)] text-white' : ''}`}
                    >
                      {value ? 'Visible' : 'Hidden'}
                    </Button>
                  </div>
                ))}
            </div>
          </motion.section>

          {/* Preferences */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="retro-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-[var(--retro-primary)]" />
              <h2 className="text-xl font-press-start">Preferences</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-vt323 text-lg">Language</label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="retro-input w-full"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-vt323 text-lg">Timezone</label>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="retro-input w-full"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-vt323 text-lg">Email Frequency</label>
                <select
                  value={settings.preferences.emailFrequency}
                  onChange={(e) => handlePreferenceChange('emailFrequency', e.target.value)}
                  className="retro-input w-full"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end"
          >
            <Button
              onClick={handleSaveSettings}
              disabled={isSubmitting}
              className="retro-button w-full md:w-auto"
            >
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 