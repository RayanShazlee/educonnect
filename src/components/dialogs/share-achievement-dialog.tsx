'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { shareAchievementSchema } from "@/lib/validations"

interface ShareAchievementDialogProps {
  achievement: {
    name: string
    description: string
    category: string
    iconEmoji: string
  }
}

type FormData = {
  message?: string
  shareToProfile: boolean
  shareToCommunities: boolean
}

export function ShareAchievementDialog({ achievement }: ShareAchievementDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    defaultValues: {
      shareToProfile: true,
      shareToCommunities: false,
      message: ""
    }
  })

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Implement achievement sharing logic
      console.log({ achievement, ...data })
      reset()
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to share achievement:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Share Achievement</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Achievement</DialogTitle>
          <DialogDescription>
            Share your achievement with your network and inspire others!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                {achievement.iconEmoji}
              </div>
              <div>
                <h4 className="font-semibold">{achievement.name}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
            <div className="mt-3">
              <Badge variant="achievement">{achievement.category}</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add a message
            </label>
            <textarea
              id="message"
              {...register("message")}
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Say something about your achievement..."
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Share to</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="shareToProfile"
                  {...register("shareToProfile")}
                  className="h-4 w-4 rounded border border-input bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                <label htmlFor="shareToProfile" className="text-sm">My Profile</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="shareToCommunities"
                  {...register("shareToCommunities")}
                  className="h-4 w-4 rounded border border-input bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                <label htmlFor="shareToCommunities" className="text-sm">My Communities</label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                reset()
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sharing..." : "Share"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}