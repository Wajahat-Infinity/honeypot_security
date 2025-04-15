"use client"

import { AttackDistribution } from "@/components/analytics/attack-distribution"
import { AttackTrends } from "@/components/analytics/attack-trends"
import { TopAttackers } from "@/components/analytics/top-attackers"
import { VulnerabilityMap } from "@/components/analytics/vulnerability-map"

export function AnalyticsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <AttackTrends className="col-span-4" />
      <AttackDistribution className="col-span-3" />
      <TopAttackers className="md:col-span-2 lg:col-span-3" />
      <VulnerabilityMap className="md:col-span-2 lg:col-span-4" />
    </div>
  )
}
