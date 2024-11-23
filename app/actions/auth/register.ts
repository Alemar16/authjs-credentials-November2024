"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import db from "@/lib/db"
import { RegisterSchema } from "@/lib/schemas/auth"

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: {
      field: "root",
      message: "Invalid fields!"
    }}
  }

  const { username, email, password } = validatedFields.data

  // Check if email exists
  const existingUser = await db.user.findFirst({
    where: {
      OR: [
        { email },
        { username }
      ]
    }
  })

  if (existingUser) {
    if (existingUser.email === email) {
      return { error: {
        field: "email",
        message: "Email already in use!"
      }}
    }
    if (existingUser.username === username) {
      return { error: {
        field: "username",
        message: "Username already taken!"
      }}
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  })

  return { success: true }
}
