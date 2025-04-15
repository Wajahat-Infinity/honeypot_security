import type { Metadata } from "next"

import { MonitoringHeader } from "@/components/monitoring/monitoring-header"
import { MonitoringDashboard } from "@/components/monitoring/monitoring-dashboard"

export const metadata: Metadata = {
  title: "Monitoring - Cybersecurity Dashboard",
  description: "Real-time monitoring of network activity and threats",
}

export default function MonitoringPage() {
  return (
    <div className="flex flex-col gap-4">
      <MonitoringHeader />
      <MonitoringDashboard />
    </div>
  )
}
