'use client'

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreateResumeDialog } from "@/components/dialogs/create-resume-dialog"
import { ResumeCard } from "@/components/resume/resume-card"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, FileText, Download, Edit, Trash2, Eye, Copy, Star } from "lucide-react"
import Link from "next/link"

// Mock data for resumes - Replace with actual data fetching
const mockResumes = [
  {
    id: "1",
    title: "Software Developer Resume",
    objective: "Experienced software developer seeking new opportunities in full-stack development",
    updatedAt: new Date('2024-09-25'),
    isPublic: true,
    templateId: "modern",
    completionRate: 85
  },
  {
    id: "2", 
    title: "Frontend Developer CV",
    objective: "Creative frontend developer with 3+ years of React experience",
    updatedAt: new Date('2024-09-20'),
    isPublic: false,
    templateId: "classic",
    completionRate: 92
  },
  {
    id: "3",
    title: "Full-Stack Engineer Portfolio",
    objective: "Versatile full-stack engineer specializing in modern web technologies",
    updatedAt: new Date('2024-09-15'),
    isPublic: true,
    templateId: "creative",
    completionRate: 78
  }
]

// Resume templates
const resumeTemplates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean, modern design perfect for tech professionals",
    preview: "/templates/modern.png",
    color: "blue",
    features: ["ATS Friendly", "Modern Design", "Skills Highlight"]
  },
  {
    id: "classic",
    name: "Classic Business",
    description: "Traditional format ideal for corporate positions",
    preview: "/templates/classic.png", 
    color: "gray",
    features: ["Conservative Layout", "Professional", "Industry Standard"]
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Eye-catching design for creative professionals",
    preview: "/templates/creative.png",
    color: "purple", 
    features: ["Visual Appeal", "Creative Layout", "Portfolio Ready"]
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Minimalist design focusing on content clarity",
    preview: "/templates/minimal.png",
    color: "green",
    features: ["Clean Layout", "Content Focus", "Easy Reading"]
  },
  {
    id: "executive",
    name: "Executive Premium",
    description: "Premium design for senior-level positions",
    preview: "/templates/executive.png",
    color: "gold",
    features: ["Premium Look", "Executive Level", "Leadership Focus"]
  },
  {
    id: "tech",
    name: "Tech Specialist",
    description: "Technology-focused design with skills emphasis",
    preview: "/templates/tech.png",
    color: "cyan",
    features: ["Tech Focused", "Skills Matrix", "Project Showcase"]
  }
]

export default function ResumePage() {
  const [resumes, setResumes] = useState(mockResumes)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateResume = async (data: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newResume = {
        id: Date.now().toString(),
        title: data.title,
        objective: data.objective || "",
        updatedAt: new Date(),
        isPublic: false,
        templateId: selectedTemplate || "modern",
        completionRate: 15
      }
      
      setResumes(prev => [newResume, ...prev])
      console.log('Creating resume:', data)
    } catch (error) {
      console.error('Failed to create resume:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteResume = async (id: string) => {
    try {
      setResumes(prev => prev.filter(resume => resume.id !== id))
    } catch (error) {
      console.error('Failed to delete resume:', error)
    }
  }

  const handleDuplicateResume = async (id: string) => {
    try {
      const original = resumes.find(r => r.id === id)
      if (original) {
        const duplicate = {
          ...original,
          id: Date.now().toString(),
          title: `${original.title} (Copy)`,
          updatedAt: new Date()
        }
        setResumes(prev => [duplicate, ...prev])
      }
    } catch (error) {
      console.error('Failed to duplicate resume:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Enhanced Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="font-press-start text-3xl md:text-4xl mb-4 text-retro-primary">
              📄 Resume Builder
            </h1>
            <p className="font-vt323 text-lg text-retro-text/80 max-w-2xl">
              Create professional resumes with our powerful builder. Choose from multiple templates, 
              customize your content, and export in various formats.
            </p>
            <div className="flex gap-4 mt-4">
              <Badge variant="secondary" className="font-vt323">
                {resumes.length} Resumes Created
              </Badge>
              <Badge variant="secondary" className="font-vt323">
                {resumeTemplates.length} Templates Available
              </Badge>
              <Badge variant="secondary" className="font-vt323">
                PDF Export Ready
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <CreateResumeDialog 
              onSubmit={handleCreateResume}
              templates={resumeTemplates}
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
            />
            <Button variant="outline" className="retro-button-secondary">
              <Download className="w-4 h-4 mr-2" />
              Import Resume
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Main Content */}
      <Tabs defaultValue="my-resumes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-retro-bg/50">
          <TabsTrigger value="my-resumes" className="font-vt323">My Resumes ({resumes.length})</TabsTrigger>
          <TabsTrigger value="templates" className="font-vt323">Templates ({resumeTemplates.length})</TabsTrigger>
          <TabsTrigger value="analytics" className="font-vt323">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="my-resumes">
          <AnimatePresence>
            {resumes.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-retro-primary/20 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-retro-primary" />
                </div>
                <h3 className="font-press-start text-xl mb-4 text-retro-text">No Resumes Yet</h3>
                <p className="font-vt323 text-lg text-retro-text/70 mb-6 max-w-md mx-auto">
                  Start building your professional resume with our easy-to-use builder and customizable templates.
                </p>
                <CreateResumeDialog 
                  onSubmit={handleCreateResume}
                  templates={resumeTemplates}
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={setSelectedTemplate}
                />
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume, index) => (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="retro-card hover:border-retro-accent transition-all duration-300 h-full">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors line-clamp-2">
                              {resume.title}
                            </CardTitle>
                            <CardDescription className="font-vt323 text-sm mt-2">
                              Updated {resume.updatedAt.toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge 
                            variant={resume.isPublic ? "default" : "secondary"} 
                            className="font-vt323 text-xs"
                          >
                            {resume.isPublic ? "Public" : "Private"}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {resume.objective && (
                          <p className="font-vt323 text-sm text-retro-text/70 line-clamp-2">
                            {resume.objective}
                          </p>
                        )}
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-vt323">
                            <span>Completion</span>
                            <span>{resume.completionRate}%</span>
                          </div>
                          <div className="w-full bg-retro-bg rounded-full h-2">
                            <div 
                              className="bg-retro-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${resume.completionRate}%` }}
                            />
                          </div>
                        </div>

                        {/* Template Badge */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-vt323 text-retro-text/60">Template:</span>
                          <Badge variant="outline" className="font-vt323 text-xs">
                            {resumeTemplates.find(t => t.id === resume.templateId)?.name || "Unknown"}
                          </Badge>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <Link href={`/resume/${resume.id}/edit`}>
                            <Button size="sm" className="retro-button w-full">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          <Link href={`/resume/${resume.id}`}>
                            <Button variant="outline" size="sm" className="retro-button-secondary w-full">
                              <Eye className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                          </Link>
                        </div>

                        {/* Secondary Actions */}
                        <div className="flex gap-1 pt-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex-1 font-vt323 text-xs"
                            onClick={() => handleDuplicateResume(resume.id)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex-1 font-vt323 text-xs"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Export
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex-1 font-vt323 text-xs text-red-400 hover:text-red-300"
                            onClick={() => handleDeleteResume(resume.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="templates">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-press-start text-xl mb-2 text-retro-primary">Choose Your Template</h3>
              <p className="font-vt323 text-lg text-retro-text/70 max-w-2xl mx-auto">
                Select from our professionally designed templates. Each template is optimized for different industries and career levels.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumeTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card 
                    className={`retro-card hover:border-retro-accent transition-all duration-300 cursor-pointer ${
                      selectedTemplate === template.id ? 'border-retro-primary ring-2 ring-retro-primary/20' : ''
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="font-press-start text-sm text-retro-text group-hover:text-retro-primary transition-colors">
                            {template.name}
                          </CardTitle>
                          <CardDescription className="font-vt323 text-sm mt-1">
                            {template.description}
                          </CardDescription>
                        </div>
                        {selectedTemplate === template.id && (
                          <Star className="w-5 h-5 text-retro-primary fill-current" />
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Template Preview Placeholder */}
                      <div className={`h-32 rounded-lg bg-gradient-to-br from-${template.color}-500/20 to-${template.color}-600/20 border border-${template.color}-500/30 flex items-center justify-center`}>
                        <div className="text-center">
                          <FileText className={`w-8 h-8 text-${template.color}-400 mx-auto mb-2`} />
                          <span className="font-vt323 text-xs text-retro-text/60">Preview</span>
                        </div>
                      </div>

                      {/* Template Features */}
                      <div className="space-y-2">
                        <span className="text-xs font-vt323 text-retro-text/60">Features:</span>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="font-vt323 text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="retro-button w-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedTemplate(template.id)
                            // Trigger create resume dialog
                          }}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Use Template
                        </Button>
                        <Button variant="outline" size="sm" className="retro-button-secondary w-full">
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-press-start text-xl mb-2 text-retro-primary">Resume Analytics</h3>
              <p className="font-vt323 text-lg text-retro-text/70 max-w-2xl mx-auto">
                Track your resume performance and optimization suggestions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Resumes", value: resumes.length, icon: FileText, color: "blue" },
                { label: "Avg. Completion", value: `${Math.round(resumes.reduce((acc, r) => acc + r.completionRate, 0) / resumes.length || 0)}%`, icon: Star, color: "green" },
                { label: "Public Resumes", value: resumes.filter(r => r.isPublic).length, icon: Eye, color: "purple" },
                { label: "Downloads", value: "42", icon: Download, color: "orange" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="retro-card text-center">
                    <CardContent className="p-6">
                      <stat.icon className={`w-8 h-8 mx-auto mb-3 text-${stat.color}-400`} />
                      <div className="font-press-start text-2xl mb-2 text-retro-primary">{stat.value}</div>
                      <div className="font-vt323 text-sm text-retro-text/70">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}