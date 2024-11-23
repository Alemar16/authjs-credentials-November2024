import { auth } from "@/auth"
import { User } from "@prisma/client";
import  db from "@/lib/db";

export async function getSession() {
  return await auth();
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  // Obtener el usuario completo de la base de datos
  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return user;
}
