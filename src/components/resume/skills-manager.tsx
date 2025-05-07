'use client'

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RetroIcon } from "@/components/ui/retro-icon"
import { Code, Briefcase, Book, Users, Star } from "lucide-react"

interface Skill {
  name: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

interface SkillsManagerProps {
  skills: Skill[]
  onChange: (skills: Skill[]) => void
}

type SkillCategory = 'Technical' | 'Professional' | 'Education' | 'Soft' | 'Other';

const skillIcons: Record<SkillCategory, JSX.Element> = {
  'Technical': <Code className="w-full h-full" />,
  'Professional': <Briefcase className="w-full h-full" />,
  'Education': <Book className="w-full h-full" />,
  'Soft': <Users className="w-full h-full" />,
  'Other': <Star className="w-full h-full" />
};

const skillLevelColors = {
  Beginner: 'rgb(169, 169, 169)',
  Intermediate: 'rgb(69, 183, 175)',
  Advanced: 'rgb(255, 107, 107)',
  Expert: 'rgb(255, 215, 0)'
}

export function SkillsManager({ skills, onChange }: SkillsManagerProps) {
  const [newSkill, setNewSkill] = useState("")
  const [category, setCategory] = useState("Technical")
  const [level, setLevel] = useState<Skill['level']>("Intermediate")

  const categories = ["Technical", "Soft Skills", "Languages", "Tools", "Other"]
  const levels: Skill['level'][] = ["Beginner", "Intermediate", "Advanced", "Expert"]

  const handleAddSkill = () => {
    if (!newSkill.trim()) return

    const skill: Skill = {
      name: newSkill.trim(),
      category,
      level
    }

    onChange([...skills, skill])
    setNewSkill("")
  }

  const handleRemoveSkill = (skillToRemove: Skill) => {
    onChange(skills.filter(skill => 
      skill.name !== skillToRemove.name || 
      skill.category !== skillToRemove.category
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={`${skill.name}-${index}`}
            variant="secondary"
            className="group flex items-center gap-2 px-3 py-2"
          >
            <RetroIcon
              icon={skillIcons[skill.category as SkillCategory] || skillIcons.Other}
              rarity={skill.level === 'Expert' ? 'Legendary' : 
                      skill.level === 'Advanced' ? 'Epic' :
                      skill.level === 'Intermediate' ? 'Rare' : 'Common'}
              size="sm"
              animate={true}
            />
            <span className="mr-1">{skill.name}</span>
            <span 
              className="text-xs"
              style={{ color: skillLevelColors[skill.level] }}
            >
              ({skill.level})
            </span>
            <button
              onClick={() => handleRemoveSkill(skill)}
              className="ml-2 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        ))}
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label>Add New Skill</Label>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter a skill..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <Button onClick={handleAddSkill} type="button">Add</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Proficiency Level</Label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={level}
              onChange={(e) => setLevel(e.target.value as Skill['level'])}
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Skills by Category</h4>
        <div className="space-y-2">
          {categories.map(cat => {
            const categorySkills = skills.filter(s => s.category === cat)
            if (categorySkills.length === 0) return null

            return (
              <div key={cat} className="space-y-1">
                <h5 className="text-sm text-muted-foreground flex items-center gap-2">
                  <RetroIcon
                    icon={skillIcons[cat as SkillCategory]}
                    size="sm"
                    animate={false}
                  />
                  {cat}
                </h5>
                <div className="flex flex-wrap gap-1">
                  {categorySkills.map((skill, index) => (
                    <Badge
                      key={`${skill.name}-${index}`}
                      variant="outline"
                      className="text-xs flex items-center gap-1"
                      style={{ 
                        borderColor: skillLevelColors[skill.level],
                        color: skillLevelColors[skill.level]
                      }}
                    >
                      {skill.name} • {skill.level}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}