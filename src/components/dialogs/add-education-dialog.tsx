'use client'

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { type Education } from "@/lib/types"
import { educationSchema } from "@/lib/validations"
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
import { Label } from "@/components/ui/label"

type EducationFormData = z.infer<typeof educationSchema>

interface AddEducationDialogProps {
  onSubmit: (education: Education) => void
}

export function AddEducationDialog({ onSubmit }: AddEducationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      school: "",
      degree: "",
      field: "",
      startDate: "",
      current: false,
      gpa: undefined
    }
  })

  const isCurrent = watch("current")

  const handleFormSubmit: SubmitHandler<EducationFormData> = async (data) => {
    try {
      const education: Education = {
        ...data,
        id: crypto.randomUUID() // Generate a temporary ID
      }
      onSubmit(education)
      reset()
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to add education:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">+ Add Education</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Education</DialogTitle>
          <DialogDescription>
            Add your educational background to your resume.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="school">School/Institution</Label>
            <Input
              id="school"
              {...register("school")}
              placeholder="e.g., University of Technology"
            />
            {errors.school && (
              <p className="text-sm text-destructive">{errors.school.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              {...register("degree")}
              placeholder="e.g., Bachelor of Science"
            />
            {errors.degree && (
              <p className="text-sm text-destructive">{errors.degree.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="field">Field of Study</Label>
            <Input
              id="field"
              {...register("field")}
              placeholder="e.g., Computer Science"
            />
            {errors.field && (
              <p className="text-sm text-destructive">{errors.field.message}</p>
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
            <Label htmlFor="current">I am currently studying here</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gpa">GPA (Optional)</Label>
            <Input
              id="gpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              {...register("gpa", { valueAsNumber: true })}
              placeholder="e.g., 3.8"
            />
            {errors.gpa && (
              <p className="text-sm text-destructive">{errors.gpa.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Education"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}