import { z } from "zod"
import { Gender } from "@/types/enums"

// Validación de URL para redes sociales
const socialUrlSchema = z.string().url().nullable().optional()

// Validación de número de teléfono
const phoneSchema = z.object({
  countryCode: z.string().regex(/^\+\d{1,3}$/, "Invalid country code"),
  number: z.string().regex(/^\d{6,15}$/, "Invalid phone number")
}).nullable().optional()

// Esquema principal de validación
export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.date()
    .refine(date => {
      const age = new Date().getFullYear() - date.getFullYear()
      return age >= 13 // Mínimo 13 años
    }, "User must be at least 13 years old")
    .nullable()
    .optional(),
  gender: z.nativeEnum(Gender).nullable().optional(),
  city: z.string().min(2).max(100).nullable().optional(),
  country: z.string().min(2).max(100).nullable().optional(),
  phone: phoneSchema,
  githubUrl: socialUrlSchema,
  linkedinUrl: socialUrlSchema,
  facebookUrl: socialUrlSchema,
  instagramUrl: socialUrlSchema,
})

// Validación de edad
export function calculateAge(dateOfBirth: Date): number {
  const today = new Date()
  let age = today.getFullYear() - dateOfBirth.getFullYear()
  const monthDiff = today.getMonth() - dateOfBirth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--
  }
  
  return age
}

// Validación de URLs de redes sociales
export function validateSocialUrl(url: string | null | undefined, platform: string): boolean {
  if (!url) return true // URLs opcionales
  
  const platformPatterns = {
    github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/,
    linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
    facebook: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/,
    instagram: /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
  }
  
  return platformPatterns[platform as keyof typeof platformPatterns]?.test(url) ?? false
}

// Función auxiliar para validar el perfil completo
export async function validateUserProfile(data: unknown) {
  try {
    const validatedData = await userProfileSchema.parseAsync(data)
    
    // Validaciones adicionales para URLs de redes sociales
    if (validatedData.githubUrl && !validateSocialUrl(validatedData.githubUrl, 'github')) {
      throw new Error('Invalid GitHub URL format')
    }
    if (validatedData.linkedinUrl && !validateSocialUrl(validatedData.linkedinUrl, 'linkedin')) {
      throw new Error('Invalid LinkedIn URL format')
    }
    if (validatedData.facebookUrl && !validateSocialUrl(validatedData.facebookUrl, 'facebook')) {
      throw new Error('Invalid Facebook URL format')
    }
    if (validatedData.instagramUrl && !validateSocialUrl(validatedData.instagramUrl, 'instagram')) {
      throw new Error('Invalid Instagram URL format')
    }
    
    return {
      success: true,
      data: validatedData
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      }
    }
    return {
      success: false,
      error: [{ message: (error as Error).message }]
    }
  }
}
