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
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function AdminPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/")
  }

  // If user is not admin, show restricted access page
  if (session.user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <Card className="border-muted-foreground/20">
            <CardContent className="pt-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full animate-pulse" />
                <Image
                  src="https://cdn.pixabay.com/photo/2015/11/03/09/03/key-1020000_1280.jpg"
                  alt="Admin Access Only"
                  fill
                  sizes="(max-width: 128px) 100vw, 128px"
                  className="object-contain rounded-full p-2"
                  priority
                />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Admin Access Only
              </h2>
              <p className="text-muted-foreground text-sm">
                This section is restricted to administrators only. You don't have sufficient permissions to access this area.
              </p>
              <div className="mt-6">
                <Link href="/" className="inline-block">
                  <Button
                    variant="default"
                    className="font-semibold"
                    size="lg"
                  >
                    Go Back
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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
    // Contenedor principal con margen superior para el navbar
    <main className="container mx-auto mt-[72px] p-4 space-y-8 mb-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here's a list of all users and their management options.
          </p>
        </div>
        <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-fit">
          <CardContent className="flex items-center gap-4 p-4">
            <Avatar className="h-12 w-12 border-2 border-muted">
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback className="bg-primary/10">
                {session.user.name?.[0]?.toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{session.user.name}</p>
              <p className="text-xs text-muted-foreground">
                Administrator
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      
      {/* Main content */}
      <Card className="border-muted-foreground/20">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Suspense 
              fallback={
                <div className="flex items-center justify-center h-12 rounded-md border border-input bg-muted/50">
                  <p className="text-sm text-muted-foreground">Loading search...</p>
                </div>
              }
            >
              <AdminSearch />
            </Suspense>
            
            <ScrollArea className="h-[500px] border rounded-md">
              <Suspense 
                fallback={
                  <div className="flex items-center justify-center h-32">
                    <p className="text-sm text-muted-foreground">Loading user table...</p>
                  </div>
                }
              >
                <AdminTable 
                  users={users || []} 
                  error={error} 
                  onRoleChange={handleRoleChange} 
                />
              </Suspense>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}