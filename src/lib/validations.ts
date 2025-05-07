import * as z from "zod"

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  role: z.enum(["STUDENT", "TEACHER", "MENTOR", "INSTITUTION"], {
    required_error: "Please select a role",
  }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
})

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
})

export const createCommunitySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  category: z.enum(
    ["STEM", "LANGUAGES", "ARTS", "BUSINESS", "TECHNOLOGY", "OTHER"],
    {
      required_error: "Please select a category",
    }
  ),
  isPrivate: z.boolean().default(false),
  rules: z
    .string()
    .max(1000, "Rules must be less than 1000 characters")
    .optional(),
})

export const shareAchievementSchema = z.object({
  message: z
    .string()
    .max(500, "Message must be less than 500 characters")
    .optional(),
  shareToProfile: z.boolean(),
  shareToCommunities: z.boolean(),
})

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  bio: z
    .string()
    .max(300, "Bio must be less than 300 characters")
    .optional(),
  links: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().url("Invalid URL"),
      })
    )
    .optional(),
  skills: z
    .array(z.string())
    .max(10, "You can only add up to 10 skills")
    .optional(),
  isPublic: z.boolean().default(true),
})

export const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  skills: z.array(z.string()).default([])
})

export const educationSchema = z.object({
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  gpa: z.number().min(0).max(4).optional()
})

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"])
})

export const resumeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  objective: z.string().optional(),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(skillSchema).default([])
})

export const createResumeFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  objective: z.string().optional().nullable(),
  importProfile: z.boolean()
}).strict()