"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { AdminActionType } from "@/types/enums"

interface AdminNotificationProps {
  action: AdminActionType
  targetUser?: string
  success?: boolean
  message?: string
}

const actionMessages = {
  USER_CREATE: "User created successfully",
  USER_UPDATE: "User updated successfully",
  USER_DELETE: "User deleted successfully",
  USER_ROLE_UPDATE: "User role updated successfully",
  USER_PROFILE_VIEW: "Viewing user profile",
  USER_EXPORT: "User data exported successfully",
  SYSTEM_BACKUP: "System backup completed",
} as const

export function AdminNotification({
  action,
  targetUser,
  success = true,
  message,
}: AdminNotificationProps) {
  useEffect(() => {
    const defaultMessage = actionMessages[action]
    const finalMessage = message || defaultMessage
    const userInfo = targetUser ? ` - ${targetUser}` : ""

    if (success) {
      toast.success(finalMessage + userInfo, {
        duration: 3000,
        className: "admin-notification-success",
      })
    } else {
      toast.error(finalMessage + userInfo, {
        duration: 5000,
        className: "admin-notification-error",
      })
    }
  }, [action, targetUser, success, message])

  return null
}
