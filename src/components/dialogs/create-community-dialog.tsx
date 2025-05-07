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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createCommunitySchema } from "@/lib/validations"

// Explicitly typing the form data to match the zod schema
type FormData = {
  name: string;
  description: string;
  category: "STEM" | "LANGUAGES" | "ARTS" | "BUSINESS" | "TECHNOLOGY" | "OTHER";
  isPrivate?: boolean;
  rules?: string;
}

export function CreateCommunityDialog() {
  const [isOpen, setIsOpen] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: {
      name: "",
      description: "",
      category: "OTHER",
      isPrivate: false,
      rules: ""
    }
  })

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Implement community creation logic
      console.log(data)
      reset()
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to create community:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Community</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Community</DialogTitle>
          <DialogDescription>
            Create a space for people to learn and grow together.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Community Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., Algorithm Study Group"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="What's your community about?"
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              {...register("category")}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="STEM">STEM</option>
              <option value="LANGUAGES">Languages</option>
              <option value="ARTS">Arts</option>
              <option value="BUSINESS">Business</option>
              <option value="TECHNOLOGY">Technology</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="rules">Community Rules (Optional)</Label>
            <Textarea
              id="rules"
              {...register("rules")}
              placeholder="Guidelines for your community members"
            />
            {errors.rules && (
              <p className="text-sm text-destructive">{errors.rules.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPrivate"
              {...register("isPrivate")}
              className="h-4 w-4 rounded border border-input bg-background shadow-sm"
            />
            <Label htmlFor="isPrivate" className="text-sm text-muted-foreground">
              Make this community private
            </Label>
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
              {isSubmitting ? "Creating..." : "Create Community"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}