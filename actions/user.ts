"use server"

import  db  from "@/lib/db"
import { Role } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function getUsers(search?: string) {
  try {
    const users = await db.user.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },
    })
    return { users }
  } catch (error) {
    return { error: "Error al obtener usuarios" }
  }
}

export async function updateUserRole(userId: string, role: Role) {
  try {
    await db.user.update({
      where: { id: userId },
      data: { role },
    })
    revalidatePath("/admin")
    return { success: "Rol actualizado correctamente" }
  } catch (error) {
    return { error: "Error al actualizar el rol" }
  }
}
