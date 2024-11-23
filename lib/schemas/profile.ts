import { z } from "zod";
import { Gender } from "@prisma/client";

export const PersonalInfoSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores")
    .transform(val => val.toLowerCase()),
  firstName: z.string()
    .min(1, "First name is required")
    .max(32, "First name must be less than 32 characters"),
  lastName: z.string()
    .min(1, "Last name is required")
    .max(32, "Last name must be less than 32 characters"),
  birthDate: z.date().optional().nullable(),
  gender: z.nativeEnum(Gender).optional().nullable(),
  city: z.string().max(100, "City must be less than 100 characters").optional().nullable(),
  country: z.string().max(100, "Country must be less than 100 characters").optional().nullable(),
});

export const AvatarSchema = z.object({
  image: z.custom<File>()
    .refine((file) => file !== null, "Image is required")
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png and .webp formats are supported"
    ),
});
