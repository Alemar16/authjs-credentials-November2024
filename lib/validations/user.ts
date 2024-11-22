import { z } from "zod";

export const PersonalInfoSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not be longer than 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not be longer than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not be longer than 50 characters"),
  bio: z.string().max(500, "Bio must not be longer than 500 characters").optional(),
  city: z.string().max(100, "City must not be longer than 100 characters").optional(),
  country: z.string().max(100, "Country must not be longer than 100 characters").optional(),
  image: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]).optional(),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
