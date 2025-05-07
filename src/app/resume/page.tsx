'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreateResumeDialog } from "@/components/dialogs/create-resume-dialog"

export default function ResumePage() {
  const handleCreateResume = async (data: any) => {
    try {
      // TODO: Implement resume creation logic
      console.log('Creating resume:', data)
    } catch (error) {
      console.error('Failed to create resume:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
            <p className="text-lg text-muted-foreground">
              Create and manage your professional resumes. Showcase your skills, experience, and achievements.
            </p>
          </div>
          <CreateResumeDialog onSubmit={handleCreateResume} />
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="my-resumes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-resumes">My Resumes</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="my-resumes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Resume Cards will be mapped here */}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Template Cards will be mapped here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}