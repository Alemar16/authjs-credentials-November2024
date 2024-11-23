import { prisma } from "@/lib/prisma"
import { AdminActionType, User } from "@prisma/client"

export class AdminLogService {
  static async logAction({
    actionType,
    adminId,
    targetUserId,
    details,
    metadata
  }: {
    actionType: AdminActionType
    adminId: string
    targetUserId?: string
    details?: string
    metadata?: any
  }) {
    try {
      const log = await prisma.adminLog.create({
        data: {
          actionType,
          adminId,
          targetUserId,
          details,
          metadata: metadata ? JSON.stringify(metadata) : null
        }
      })
      return log
    } catch (error) {
      console.error('Error creating admin log:', error)
      // No lanzamos el error para evitar interrumpir el flujo principal
      return null
    }
  }

  static async createBackup(user: User, reason?: string) {
    try {
      const { password, ...userData } = user
      const backup = await prisma.userBackup.create({
        data: {
          userId: user.id,
          data: userData,
          reason
        }
      })
      return backup
    } catch (error) {
      console.error('Error creating user backup:', error)
      return null
    }
  }

  static async getUserLogs(userId: string) {
    return prisma.adminLog.findMany({
      where: {
        targetUserId: userId
      },
      include: {
        admin: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async getAdminLogs(adminId: string) {
    return prisma.adminLog.findMany({
      where: {
        adminId
      },
      include: {
        targetUser: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
