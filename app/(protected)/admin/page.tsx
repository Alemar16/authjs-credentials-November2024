import { auth } from "@/auth"
import { AdminSearch } from "@/components/admin-search"
import { AdminTable } from "@/components/admin-table"
import { getUsers, updateUserRole } from "@/actions/user"
import { Role } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"
import React from "react"
import { Suspense } from "react"

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user?.role || session.user.role !== "admin") {
    redirect("/")
  }

  const { users, error } = await getUsers()

  async function handleRoleChange(userId: string, role: Role) {
    "use server"
    await updateUserRole(userId, role)
  }
  return (
    <div className="container py-8">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            Bienvenido, {session.user.name || "Admin"}
          </CardTitle>
          <Avatar className="h-12 w-12">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback>
              {session.user.name?.[0]?.toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Panel de administración para gestionar usuarios
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Suspense fallback={<div>Cargando búsqueda...</div>}>
          <AdminSearch />
        </Suspense>
        <Suspense fallback={<div>Cargando tabla de usuarios...</div>}>
          <AdminTable 
            users={users || []} 
            error={error} 
            onRoleChange={handleRoleChange} 
          />
        </Suspense>
      </div>
    </div>
  )
}