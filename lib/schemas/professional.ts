import * as z from "zod"

export const EducationSchema = z.object({
  institution: z.string().min(2, "Institution name must be at least 2 characters"),
  degree: z.string().min(2, "Degree must be at least 2 characters"),
  field: z.string().min(2, "Field of study must be at least 2 characters"),
  startDate: z.date(),
  endDate: z.date().nullable(),
  current: z.boolean().default(false),
  description: z.string().optional(),
})

export const ExperienceSchema = z.object({
  company: z.string().min(2, "Company name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  location: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().nullable(),
  current: z.boolean().default(false),
  description: z.string().optional(),
})

export const SkillSchema = z.object({
  name: z.string().min(2, "Skill name must be at least 2 characters"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]),
  yearsOfExperience: z.number().min(0).optional(),
})

export const ProfessionalInfoSchema = z.object({
  title: z.string().min(2, "Professional title must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(500, "Bio must not exceed 500 characters"),
  education: z.array(EducationSchema).optional(),
  experience: z.array(ExperienceSchema).optional(),
  skills: z.array(SkillSchema).optional(),
  languages: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
})
