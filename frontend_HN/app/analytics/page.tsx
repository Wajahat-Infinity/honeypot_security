import type { Metadata } from "next"

import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export const metadata: Metadata = {
  title: "Analytics - Cybersecurity Dashboard",
  description: "Security analytics and threat intelligence",
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <AnalyticsHeader />
      <AnalyticsDashboard />
    </div>
  )
}
