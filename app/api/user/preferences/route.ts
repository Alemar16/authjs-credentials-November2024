import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { UserPreferences } from "@/types"

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data: UserPreferences = await request.json()

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        theme: data.theme,
        language: data.language,
        securityAlerts: data.emailNotifications.security,
        updateNotifications: data.emailNotifications.updates,
        marketingEmails: data.emailNotifications.marketing,
        profileVisibility: data.profileVisibility,
      },
    })

    return NextResponse.json({
      message: "Preferences updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Error updating preferences:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        theme: true,
        language: true,
        securityAlerts: true,
        updateNotifications: true,
        marketingEmails: true,
        profileVisibility: true,
      },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const preferences: UserPreferences = {
      theme: user.theme,
      language: user.language,
      emailNotifications: {
        security: user.securityAlerts,
        updates: user.updateNotifications,
        marketing: user.marketingEmails,
      },
      profileVisibility: user.profileVisibility,
    }

    return NextResponse.json(preferences)
  } catch (error) {
    console.error("Error fetching preferences:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
