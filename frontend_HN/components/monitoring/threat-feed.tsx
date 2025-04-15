import { AlertTriangle, ArrowRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const threats = [
  {
    id: 1,
    type: "Brute Force Attack",
    source: "192.168.1.100",
    timestamp: "2 minutes ago",
    severity: "high",
  },
  {
    id: 2,
    type: "SQL Injection Attempt",
    source: "10.0.0.50",
    timestamp: "5 minutes ago",
    severity: "critical",
  },
  {
    id: 3,
    type: "Port Scanning",
    source: "172.16.0.25",
    timestamp: "10 minutes ago",
    severity: "medium",
  },
]

export function ThreatFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Threat Feed</CardTitle>
        <CardDescription>Recent security threats and alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {threats.map((threat) => (
            <div key={threat.id} className="flex items-center">
              <div
                className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  threat.severity === "critical"
                    ? "bg-red-100 text-red-600 dark:bg-red-900"
                    : threat.severity === "high"
                      ? "bg-orange-100 text-orange-600 dark:bg-orange-900"
                      : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900"
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium">{threat.type}</p>
                <p className="text-sm text-muted-foreground">
                  From {threat.source} • {threat.timestamp}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto" aria-label="View details">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
