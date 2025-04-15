import type { Metadata } from "next"

import { AlertsHeader } from "@/components/alerts/alerts-header"
import { AlertsList } from "@/components/alerts/alerts-list"

export const metadata: Metadata = {
  title: "Alerts - Cybersecurity Dashboard",
  description: "Security alerts and notifications",
}

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-4">
      <AlertsHeader />
      <AlertsList />
    </div>
  )
}
