import { formatRelativeTime } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ResumeCardProps {
  resume: {
    id: string
    title: string
    objective?: string
    updatedAt: Date
  }
}

export function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <Card className="group relative">
      <CardHeader>
        <CardTitle>{resume.title}</CardTitle>
        <CardDescription>
          Last updated {formatRelativeTime(resume.updatedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {resume.objective && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {resume.objective}
          </p>
        )}
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/resume/${resume.id}/edit`}>Edit</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/resume/${resume.id}`}>Preview</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}