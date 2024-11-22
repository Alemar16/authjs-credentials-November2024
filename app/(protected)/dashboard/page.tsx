import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  UserCircle,
  Settings,
  Shield,
  Mail,
  Palette
} from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const user = session.user

  return (
    <div className="container mx-auto py-10">
      {/* Header con información del usuario */}
      <div className="flex items-center space-x-8 mb-10 p-6 bg-card rounded-lg shadow">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user?.name || "Welcome!"}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
          <p className="text-sm mt-1 capitalize">Role: {user?.role || "user"}</p>
        </div>
      </div>

      {/* Grid de accesos rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/profile">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center space-x-4">
              <UserCircle size={24} />
              <div>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Update your profile details, professional information, and contact preferences
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/profile?tab=security">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Shield size={24} />
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Change your password, enable two-factor authentication, and review security settings
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/profile?tab=contact">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Mail size={24} />
              <div>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Manage your contact details</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Update your contact information and social media profiles
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/profile?tab=preferences">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Palette size={24} />
              <div>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Set your preferred theme, language, and notification preferences
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
