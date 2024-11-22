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
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default async function AdminPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/")
  }

  // If user is not admin, show restricted access page
  if (session.user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <Image
              src="https://cdn.pixabay.com/photo/2015/11/03/09/03/key-1020000_1280.jpg"
              alt="Admin Access Only"
              fill
              sizes="(max-width: 128px) 100vw, 128px"
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Admin Access Only
          </h2>
          <p className="text-gray-600 mt-2">
            This section is restricted to administrators only. You don't have sufficient permissions to access this area.
          </p>
          <div className="mt-6">
            <Link href="/" className="inline-block">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Go Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
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
            Welcome, {session.user.name || "Admin"}
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
            Administration panel for user management
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Suspense fallback={<div>Loading search...</div>}>
          <AdminSearch />
        </Suspense>
        <Suspense fallback={<div>Loading user table...</div>}>
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