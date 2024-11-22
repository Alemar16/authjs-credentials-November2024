"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { PersonalInfoSchema } from "@/lib/schemas/profile";
import { Gender } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type PersonalInfoFormValues = z.infer<typeof PersonalInfoSchema>;

export async function getPersonalInfo() {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      gender: true,
      city: true,
      country: true,
    },
  });

  return user;
}

export async function updatePersonalInfo(values: PersonalInfoFormValues) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const validatedData = PersonalInfoSchema.parse(values);

    await db.user.update({
      where: { id: session.user.id },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        dateOfBirth: validatedData.dateOfBirth,
        gender: validatedData.gender as Gender,
        city: validatedData.city,
        country: validatedData.country,
      },
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Something went wrong" };
  }
}
