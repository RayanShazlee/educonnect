"use client"

import { Suspense, useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AddExperienceDialog } from "@/components/dialogs/add-experience-dialog"
import { AddEducationDialog } from "@/components/dialogs/add-education-dialog"
import { SkillsManager } from "@/components/resume/skills-manager"
import { ResumePreview } from "@/components/resume/resume-preview"
import { ResumeExport } from "@/components/resume/resume-export"
import { type Resume, type Skill, type WorkExperience, type Education } from "@/lib/types"

// Mock data for development - Replace with actual data fetching
const MOCK_RESUME: Resume = {
  id: "1",
  title: "Software Developer Resume",
  objective: "Experienced software developer seeking new opportunities...",
  userId: "user1",
  experience: [
    {
      id: "exp1",
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "New York, NY",
      startDate: "2020-01",
      current: true,
      description: "Leading development of cloud-based solutions...",
      skills: ["React", "Node.js", "AWS"]
    }
  ],
  education: [
    {
      id: "edu1",
      school: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
      current: false,
      gpa: 3.8
    }
  ],
  skills: [
    {
      name: "React",
      category: "Technical",
      level: "Expert"
    },
    {
      name: "Node.js",
      category: "Technical",
      level: "Advanced"
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
}

export default function ResumeEditorPage({ params }: { params: { id: string } }) {
  const [resume, setResume] = useState<Resume>(MOCK_RESUME)

  const handleBasicInfoChange = (field: keyof Pick<Resume, 'title' | 'objective'>) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResume(prev => ({
      ...prev,
      [field]: e.target.value,
      updatedAt: new Date()
    }))
  }

  const handleExperienceAdd = (experience: Omit<WorkExperience, 'id'>) => {
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id: crypto.randomUUID() }],
      updatedAt: new Date()
    }))
  }

  const handleEducationAdd = (education: Omit<Education, 'id'>) => {
    setResume(prev => ({
      ...prev,
      education: [...prev.education, { ...education, id: crypto.randomUUID() }],
      updatedAt: new Date()
    }))
  }

  const handleSkillsChange = (skills: Skill[]) => {
    setResume(prev => ({
      ...prev,
      skills,
      updatedAt: new Date()
    }))
  }

  const handleSave = async () => {
    try {
      // TODO: Implement save functionality
      console.log('Saving resume:', resume)
    } catch (error) {
      console.error('Failed to save resume:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Edit Resume</h1>
        <div className="flex gap-2">
          <ResumeExport resume={resume} />
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full bg-background">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card className="bg-card hover:bg-secondary/50 transition-colors">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Resume Title</Label>
                    <Input
                      id="title"
                      value={resume.title}
                      onChange={handleBasicInfoChange('title')}
                      placeholder="e.g., Software Developer Resume"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="objective">Professional Summary</Label>
                    <Textarea
                      id="objective"
                      value={resume.objective}
                      onChange={handleBasicInfoChange('objective')}
                      placeholder="Brief overview of your professional background and career objectives..."
                      className="min-h-[150px] bg-background"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resume.experience.map((exp) => (
                    <Card key={exp.id} className="hover:bg-secondary/50 transition-colors">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{exp.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {exp.company} • {exp.location}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2">{exp.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {exp.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <AddExperienceDialog onSubmit={handleExperienceAdd} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resume.education.map((edu) => (
                    <Card key={edu.id} className="hover:bg-secondary/50 transition-colors">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{edu.school}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {edu.degree} in {edu.field}
                              {edu.gpa && ` • GPA: ${edu.gpa.toFixed(2)}`}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                  <AddEducationDialog onSubmit={handleEducationAdd} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card className="bg-card hover:bg-secondary/50 transition-colors">
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Loading skills...</div>}>
                    <SkillsManager
                      skills={resume.skills}
                      onChange={handleSkillsChange}
                    />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-12 lg:col-span-4 h-full">
          <Card className="lg:sticky lg:top-4 bg-card hover:bg-secondary/50 transition-colors">
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100vh-16rem)] overflow-auto">
              <Suspense fallback={<div>Loading preview...</div>}>
                <ResumePreview resume={resume} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}