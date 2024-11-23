import { Gender, Role, AdminActionType, TechRole, ProgrammingLanguage } from "./enums"
import type { DefaultSession } from "next-auth"

// Extender NextAuth
declare module "next-auth" {
  interface User {
    id?: string | undefined
    email?: string | null | undefined
    role: Role
    username?: string | null
    image?: string | null
  }

  interface Session {
    user: {
      id: string
      email: string
      role: Role
      name: string
      username?: string | null
      image?: string | null
    } & DefaultSession["user"]
  }

  interface JWT {
    id: string
    email: string
    role: Role
    name: string
    username?: string | null
    image?: string | null
  }
}

// Re-exportar los tipos de NextAuth para uso en la aplicación
export type { Session } from "next-auth"
export type { JWT } from "next-auth/jwt"

export interface UserProfile {
  id: string
  // Información básica
  username?: string | null
  firstName: string | null
  lastName: string | null
  email: string
  image: string | null
  role: Role

  // Información personal
  dateOfBirth: Date | null
  gender: Gender | null
  city: string | null
  country: string | null

  // Tecnologías
  primaryRole: TechRole[]
  programmingLanguages: ProgrammingLanguage[]
  yearsOfExperience: number | null
  portfolioUrl: string | null

  // Contacto
  contact?: ContactInfo

  // Metadatos
  isActive: boolean
  lastLoginAt: Date | null
  createdAt: Date
  updatedAt: Date

  // Preferencias
  preferences?: UserPreferences
}

export interface AdminLogEntry {
  id: string
  actionType: AdminActionType
  details: string | null
  metadata: any | null
  createdAt: Date
  admin: {
    name: string | null
    email: string
  }
  targetUser?: {
    name: string | null
    email: string
  }
}

export interface UserBackupData {
  id: string
  userId: string
  data: Omit<UserProfile, 'password'>
  reason: string | null
  createdAt: Date
}

export interface PhoneNumber {
  countryCode: string
  number: string
}

export interface ContactInfo {
  phone?: string;
  phoneCountry?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'es' | 'fr' | 'de' | 'pt';
  emailNotifications: {
    security: boolean;
    updates: boolean;
    marketing: boolean;
  };
  profileVisibility: 'public' | 'private' | 'contacts';
}

// Tipos para validación
export interface UserProfileValidation {
  firstName: string
  lastName: string
  email: string
  dateOfBirth?: Date
  gender?: Gender
  city?: string
  country?: string
  phone?: PhoneNumber
  backupEmail?: string
  githubUrl?: string
  linkedinUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  primaryRole?: TechRole[]
  programmingLanguages?: ProgrammingLanguage[]
  yearsOfExperience?: number
  portfolioUrl?: string
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Tipos para acciones administrativas
export interface AdminAction {
  type: AdminActionType
  targetUserId?: string
  details?: string
  metadata?: any
}

// Tipos para filtros de búsqueda
export interface UserSearchFilters {
  role?: Role
  gender?: Gender
  country?: string
  isActive?: boolean
  createdAfter?: Date
  createdBefore?: Date
  ageRange?: {
    min?: number
    max?: number
  }
}

// Re-exportar los enums para facilitar su uso
export { Gender, Role, AdminActionType, TechRole, ProgrammingLanguage }
