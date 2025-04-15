import type { Metadata } from "next"

import { ReportsHeader } from "@/components/reports/reports-header"
import { ReportsList } from "@/components/reports/reports-list"

export const metadata: Metadata = {
  title: "Reports - Cybersecurity Dashboard",
  description: "Generate and view security reports",
}

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <ReportsHeader />
      <ReportsList />
    </div>
  )
}
