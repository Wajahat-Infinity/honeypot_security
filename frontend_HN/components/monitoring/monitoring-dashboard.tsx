"use client"

import { NetworkActivity } from "@/components/monitoring/network-activity"
import { SystemMetrics } from "@/components/monitoring/system-metrics"
import { ThreatFeed } from "@/components/monitoring/threat-feed"

export function MonitoringDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-4">
        <NetworkActivity />
      </div>
      <div className="col-span-3 space-y-4">
        <SystemMetrics />
        <ThreatFeed />
      </div>
    </div>
  )
}
