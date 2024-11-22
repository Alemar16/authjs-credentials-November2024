"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { PersonalInfoSchema } from "@/lib/validations/user";
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
      username: true,
      firstName: true,
      lastName: true,
      bio: true,
      city: true,
      country: true,
      image: true,
      gender: true,
    },
  });

  return user;
}

export async function updatePersonalInfo(values: PersonalInfoFormValues) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const validatedFields = PersonalInfoSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { username, firstName, lastName, bio, city, country, image, gender } = validatedFields.data;

    const existingUser = await db.user.findUnique({
      where: {
        username,
        NOT: {
          id: session.user.id,
        },
      },
    });

    if (existingUser) {
      return { error: "Username already taken" };
    }

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username,
        firstName,
        lastName,
        bio,
        city,
        country,
        image,
        gender,
      },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
