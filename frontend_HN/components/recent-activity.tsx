import { Activity, AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "attack",
      severity: "high",
      source: "192.168.1.100",
      timestamp: "2 minutes ago",
      description: "Brute force attack detected",
    },
    {
      id: 2,
      type: "alert",
      severity: "medium",
      source: "10.0.0.50",
      timestamp: "15 minutes ago",
      description: "Suspicious port scanning activity",
    },
    {
      id: 3,
      type: "attack",
      severity: "critical",
      source: "172.16.0.25",
      timestamp: "1 hour ago",
      description: "SQL injection attempt",
    },
  ]

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <div
            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              activity.severity === "critical"
                ? "bg-red-100 text-red-600 dark:bg-red-900"
                : activity.severity === "high"
                  ? "bg-orange-100 text-orange-600 dark:bg-orange-900"
                  : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900"
            }`}
          >
            {activity.type === "attack" ? <AlertTriangle className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium">{activity.description}</p>
            <p className="text-sm text-muted-foreground">
              From {activity.source} • {activity.timestamp}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto" aria-label="View details">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
