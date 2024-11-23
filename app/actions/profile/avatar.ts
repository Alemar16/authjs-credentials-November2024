"use server"

import { auth } from "@/auth"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function updateAvatar(imageUrl: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    })

    revalidatePath("/dashboard/profile")
    return { success: true }
  } catch (error) {
    console.error("Error updating avatar:", error)
    return { error: "Failed to update avatar" }
  }
}
