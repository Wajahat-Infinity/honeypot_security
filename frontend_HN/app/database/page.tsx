import type { Metadata } from "next"

import { DatabaseHeader } from "@/components/database/database-header"
import { DatabaseTabs } from "@/components/database/database-tabs"

export const metadata: Metadata = {
  title: "Database - Cybersecurity Dashboard",
  description: "Manage and query security database",
}

export default function DatabasePage() {
  return (
    <div className="flex flex-col gap-4">
      <DatabaseHeader />
      <DatabaseTabs />
    </div>
  )
}
