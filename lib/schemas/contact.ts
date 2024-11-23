import { z } from "zod";

const socialUrlPattern = {
  github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
  facebook: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/,
  instagram: /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
};

// Función auxiliar para crear un validador de URL social
const createSocialUrlSchema = (pattern: RegExp, name: string) => 
  z.string()
    .trim()
    .refine((val) => val === "" || pattern.test(val), {
      message: `Invalid ${name} URL`,
    });

export const ContactSchema = z.object({
  phone: z.string().trim().optional(),
  phoneCountry: z.string()
    .trim()
    .refine((val) => val === "" || /^\+\d{1,3}$/.test(val), {
      message: "Invalid country code (e.g., +1, +44)",
    })
    .optional(),
  githubUrl: createSocialUrlSchema(socialUrlPattern.github, "GitHub").optional(),
  linkedinUrl: createSocialUrlSchema(socialUrlPattern.linkedin, "LinkedIn").optional(),
  facebookUrl: createSocialUrlSchema(socialUrlPattern.facebook, "Facebook").optional(),
  instagramUrl: createSocialUrlSchema(socialUrlPattern.instagram, "Instagram").optional(),
});
