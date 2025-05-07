import { Badge } from "@/components/ui/badge"
import { Skill } from "@/lib/types"

interface ResumePreviewProps {
  resume: {
    title: string
    objective?: string
    experience: Array<{
      title: string
      company: string
      location?: string
      startDate: string
      endDate?: string
      current: boolean
      description?: string
      skills: string[]
    }>
    education: Array<{
      school: string
      degree: string
      field: string
      startDate: string
      endDate?: string
      current: boolean
      gpa?: number
    }>
    skills: Skill[]
  }
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="space-y-8 p-6 max-h-[800px] overflow-y-auto">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{resume.title}</h2>
        {resume.objective && (
          <p className="text-sm text-muted-foreground">{resume.objective}</p>
        )}
      </div>

      {/* Experience Section */}
      {resume.experience.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-4">Experience</h3>
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{exp.title}</h4>
                    <div className="text-sm text-muted-foreground">
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm">{exp.description}</p>
                )}
                {exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {exp.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {resume.education.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-4">Education</h3>
          <div className="space-y-6">
            {resume.education.map((edu, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{edu.school}</h4>
                    <div className="text-sm text-muted-foreground">
                      {edu.degree} in {edu.field}
                      {edu.gpa && ` • GPA: ${edu.gpa.toFixed(2)}`}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {resume.skills.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="space-y-4">
            {/* Group skills by category */}
            {Array.from(new Set(resume.skills.map(s => s.category))).map(category => {
              const categorySkills = resume.skills.filter(s => s.category === category)
              return (
                <div key={category}>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, index) => (
                      <Badge
                        key={`${skill.name}-${index}`}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill.name}
                        <span className="ml-1 opacity-70">• {skill.level}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}