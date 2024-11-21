"use client"

import { UserTable } from "@/components/user-table"
import { Role, User } from "@prisma/client"
import { useTransition } from "react"

interface AdminTableProps {
  users: User[]
  error?: string
  onRoleChange: (userId: string, role: Role) => Promise<void>
}

export function AdminTable({ users, error, onRoleChange }: AdminTableProps) {
  const [isPending, startTransition] = useTransition()

  const handleRoleChange = (userId: string, role: string) => {
    startTransition(async () => {
      await onRoleChange(userId, role as Role)
    })
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return <UserTable users={users} onRoleChange={handleRoleChange} />
}
