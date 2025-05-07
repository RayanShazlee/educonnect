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
import { createResumeFormSchema } from "@/lib/validations"

type FormData = z.infer<typeof createResumeFormSchema>

interface CreateResumeDialogProps {
  onSubmit: (data: FormData) => Promise<void>
}

export function CreateResumeDialog({ onSubmit }: CreateResumeDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const form = useForm<FormData>({
    resolver: zodResolver(createResumeFormSchema),
    defaultValues: {
      title: "",
      objective: null,
      importProfile: false
    }
  })

  async function onSubmitForm(data: FormData) {
    try {
      await onSubmit(data)
      form.reset()
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to create resume:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create New Resume</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
          <DialogDescription>
            Create a new resume from scratch or import data from your profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Resume Title</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="e.g., Software Developer Resume"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="objective">Professional Summary</Label>
            <Textarea
              id="objective"
              {...form.register("objective")}
              placeholder="Brief overview of your professional background and career objectives..."
            />
            {form.formState.errors.objective && (
              <p className="text-sm text-destructive">{form.formState.errors.objective.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="importProfile"
              {...form.register("importProfile")}
              className="h-4 w-4 rounded border border-input"
            />
            <Label htmlFor="importProfile">
              Import data from my profile (education, skills, achievements)
            </Label>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Creating..." : "Create Resume"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}