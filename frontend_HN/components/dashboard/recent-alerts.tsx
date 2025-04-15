"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export function RecentAlerts() {
  return (
    <Card className="col-span-7">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>Latest security alerts and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <div className="flex-1">
                <p className="font-medium">Suspicious Activity Detected</p>
                <p className="text-sm text-muted-foreground">
                  Multiple failed login attempts from IP: 192.168.1.100
                </p>
              </div>
              <div className="text-sm text-muted-foreground">2 hours ago</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 