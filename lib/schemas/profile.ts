import { z } from "zod";
import { Gender } from "@prisma/client";

export const PersonalInfoSchema = z.object({
  firstName: z.string()
    .min(1, "First name is required")
    .max(32, "First name must be less than 32 characters"),
  lastName: z.string()
    .min(1, "Last name is required")
    .max(32, "Last name must be less than 32 characters"),
  dateOfBirth: z.date().optional().nullable(),
  gender: z.nativeEnum(Gender).optional().nullable(),
  city: z.string().max(100, "City must be less than 100 characters").optional().nullable(),
  country: z.string().max(100, "Country must be less than 100 characters").optional().nullable(),
});
