"use server"

import { auth } from "@/auth"
import { ProfessionalInfoSchema } from "@/lib/schemas/professional"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import * as z from "zod"

export async function getProfessionalInfo() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { error: "Unauthorized" }
    }

    const professionalInfo = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        title: true,
        bio: true,
        education: true,
        experience: true,
        skills: true,
        languages: true,
        certifications: true,
      },
    })

    return professionalInfo
  } catch (error) {
    return { error: "Failed to fetch professional information" }
  }
}

export async function updateProfessionalInfo(
  values: z.infer<typeof ProfessionalInfoSchema>
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { error: "Unauthorized" }
    }

    // Validate the input
    const validatedFields = ProfessionalInfoSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        title: validatedFields.data.title,
        bio: validatedFields.data.bio,
        education: validatedFields.data.education,
        experience: validatedFields.data.experience,
        skills: validatedFields.data.skills,
        languages: validatedFields.data.languages,
        certifications: validatedFields.data.certifications,
      },
    })

    revalidatePath("/dashboard/profile")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update professional information" }
  }
}
