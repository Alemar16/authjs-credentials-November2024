"use client"

import { useRouter } from "next/navigation"
import { UserSearch } from "@/components/user-search"

export function AdminSearch() {
  const router = useRouter()

  const handleSearch = (query: string) => {
    const searchParams = new URLSearchParams()
    if (query) {
      searchParams.set("search", query)
    }
    router.push(`/admin?${searchParams.toString()}`)
  }

  return <UserSearch onSearch={handleSearch} />
}
