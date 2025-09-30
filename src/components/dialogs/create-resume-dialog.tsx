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
import { Plus, FileText } from "lucide-react"
import { createResumeFormSchema } from "@/lib/validations"

type FormData = z.infer<typeof createResumeFormSchema>

interface ResumeTemplate {
  id: string
  name: string
  description: string
  preview: string
  color: string
  features: string[]
}

interface CreateResumeDialogProps {
  onSubmit: (data: FormData) => Promise<void>
  templates?: ResumeTemplate[]
  selectedTemplate?: string | null
  onTemplateSelect?: (templateId: string) => void
}

export function CreateResumeDialog({ 
  onSubmit, 
  templates = [], 
  selectedTemplate = null, 
  onTemplateSelect 
}: CreateResumeDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState(selectedTemplate)
  
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
      const submitData = {
        ...data,
        templateId: currentTemplate || 'modern'
      }
      await onSubmit(submitData as any)
      form.reset()
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to create resume:", error)
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    setCurrentTemplate(templateId)
    if (onTemplateSelect) {
      onTemplateSelect(templateId)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="retro-button">
          <Plus className="w-4 h-4 mr-2" />
          Create New Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-press-start text-retro-primary">Create New Resume</DialogTitle>
          <DialogDescription className="font-vt323">
            Create a professional resume with our enhanced builder and customizable templates.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6">
          {/* Template Selection */}
          {templates.length > 0 && (
            <div className="space-y-3">
              <Label className="font-press-start text-sm">Choose Template</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                      currentTemplate === template.id 
                        ? 'border-retro-primary bg-retro-primary/10' 
                        : 'border-gray-200 hover:border-retro-primary/50'
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className={`h-16 rounded bg-gradient-to-br from-${template.color}-500/20 to-${template.color}-600/20 border border-${template.color}-500/30 flex items-center justify-center mb-2`}>
                      <FileText className={`w-6 h-6 text-${template.color}-400`} />
                    </div>
                    <h4 className="font-vt323 text-xs font-semibold text-center">{template.name}</h4>
                  </div>
                ))}
              </div>
              {currentTemplate && (
                <div className="p-3 bg-retro-bg/20 rounded-lg">
                  <h4 className="font-vt323 font-semibold mb-1">
                    {templates.find(t => t.id === currentTemplate)?.name}
                  </h4>
                  <p className="font-vt323 text-xs text-retro-text/70 mb-2">
                    {templates.find(t => t.id === currentTemplate)?.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {templates.find(t => t.id === currentTemplate)?.features.map((feature) => (
                      <span key={feature} className="bg-retro-primary/20 text-retro-primary px-2 py-1 rounded text-xs font-vt323">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Resume Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-vt323">Resume Title</Label>
              <Input
                id="title"
                {...form.register("title")}
                placeholder="e.g., Software Developer Resume"
                className="font-vt323"
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-400 font-vt323">{form.formState.errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="objective" className="font-vt323">Professional Summary</Label>
              <Textarea
                id="objective"
                {...form.register("objective")}
                placeholder="Brief overview of your professional background and career objectives..."
                className="font-vt323 min-h-[80px]"
              />
              {form.formState.errors.objective && (
                <p className="text-sm text-red-400 font-vt323">{form.formState.errors.objective.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="importProfile"
                {...form.register("importProfile")}
                className="h-4 w-4 rounded border border-input"
              />
              <Label htmlFor="importProfile" className="font-vt323">
                Import data from my profile (education, skills, achievements)
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="retro-button-secondary"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting}
              className="retro-button"
            >
              {form.formState.isSubmitting ? "Creating..." : "Create Resume"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}