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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { experienceSchema } from "@/lib/validations"
import { type WorkExperience } from "@/lib/types"

type ExperienceFormData = z.infer<typeof experienceSchema>

interface AddExperienceDialogProps {
  onSubmit: (experience: WorkExperience) => void
}

export function AddExperienceDialog({ onSubmit }: AddExperienceDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      skills: []
    }
  })

  const isCurrent = watch("current")

  const onSubmitForm = async (data: ExperienceFormData) => {
    try {
      const experience: WorkExperience = {
        ...data,
        id: crypto.randomUUID()
      }
      onSubmit(experience)
      reset()
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to add experience:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">+ Add Work Experience</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Work Experience</DialogTitle>
          <DialogDescription>
            Add your professional experience to your resume.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="e.g., Software Engineer"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              {...register("company")}
              placeholder="e.g., Tech Corp"
            />
            {errors.company && (
              <p className="text-sm text-destructive">{errors.company.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="e.g., New York, NY"
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="month"
                id="startDate"
                {...register("startDate")}
              />
              {errors.startDate && (
                <p className="text-sm text-destructive">{errors.startDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="month"
                id="endDate"
                {...register("endDate")}
                disabled={isCurrent}
              />
              {errors.endDate && (
                <p className="text-sm text-destructive">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="current"
              {...register("current")}
              className="h-4 w-4 rounded border border-input"
            />
            <Label htmlFor="current">I currently work here</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe your responsibilities and achievements..."
              className="min-h-[100px]"
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              {...register("skills")}
              placeholder="e.g., React, TypeScript, Project Management"
            />
            {errors.skills && (
              <p className="text-sm text-destructive">{errors.skills.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Experience"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}