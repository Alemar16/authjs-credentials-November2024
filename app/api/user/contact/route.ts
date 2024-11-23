import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { ContactInfo } from "@/types"

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data: ContactInfo = await request.json()

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        phone: data.phone,
        phoneCountry: data.phoneCountry,
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        facebookUrl: data.facebookUrl,
        instagramUrl: data.instagramUrl,
      },
    })

    return NextResponse.json({
      message: "Contact information updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Error updating contact info:", error)
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
        phone: true,
        phoneCountry: true,
        githubUrl: true,
        linkedinUrl: true,
        facebookUrl: true,
        instagramUrl: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching contact info:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
