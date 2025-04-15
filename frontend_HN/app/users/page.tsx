import type { Metadata } from "next"

import { UsersHeader } from "@/components/users/users-header"
import { UsersList } from "@/components/users/users-list"

export const metadata: Metadata = {
  title: "Users - Cybersecurity Dashboard",
  description: "Manage system users and permissions",
}

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4">
      <UsersHeader />
      <UsersList />
    </div>
  )
}
