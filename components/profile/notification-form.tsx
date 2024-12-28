"use client"

import { useState } from "react"
import { Bell, Calendar, Medal, MessageSquare, TrendingUp } from 'lucide-react'

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function NotificationForm() {
  const [settings, setSettings] = useState({
    workoutReminders: true,
    achievementAlerts: true,
    weeklyReports: true,
    platformUpdates: false,
    socialInteractions: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Notification Preferences</h2>
        <p className="text-muted-foreground">
          Manage how and when you want to be notified
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="workout-reminders" className="text-base">Workout Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about your scheduled workouts
                </p>
              </div>
            </div>
            <Switch
              id="workout-reminders"
              checked={settings.workoutReminders}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, workoutReminders: checked })
              }
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Medal className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="achievement-alerts" className="text-base">Achievement Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications when you reach fitness milestones
                </p>
              </div>
            </div>
            <Switch
              id="achievement-alerts"
              checked={settings.achievementAlerts}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, achievementAlerts: checked })
              }
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="weekly-reports" className="text-base">Weekly Progress Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly summaries of your fitness journey
                </p>
              </div>
            </div>
            <Switch
              id="weekly-reports"
              checked={settings.weeklyReports}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, weeklyReports: checked })
              }
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="platform-updates" className="text-base">Platform Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Stay informed about new features and improvements
                </p>
              </div>
            </div>
            <Switch
              id="platform-updates"
              checked={settings.platformUpdates}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, platformUpdates: checked })
              }
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="social-interactions" className="text-base">Social Interactions</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about mentions and comments
                </p>
              </div>
            </div>
            <Switch
              id="social-interactions"
              checked={settings.socialInteractions}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, socialInteractions: checked })
              }
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? 'Saving...' : 'Save Preferences'}
        </Button>
      </form>
    </div>
  )
}

