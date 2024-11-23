import * as z from "zod"
import { TechRole, ProgrammingLanguage } from "@/types/enums"

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
  education: z.array(EducationSchema).default([]),
  experience: z.array(ExperienceSchema).default([]),
  skills: z.array(SkillSchema).default([]),
  languages: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  primaryRoles: z.array(z.nativeEnum(TechRole)).default([]),
  programmingLanguages: z.array(z.nativeEnum(ProgrammingLanguage)).default([]),
  yearsOfExperience: z.number().min(0).default(0),
  portfolioUrl: z.string().url().optional().or(z.literal("")).default(""),
})
