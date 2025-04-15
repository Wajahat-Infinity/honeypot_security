import { Activity, Cpu, HardDrive, Network } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SystemMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Metrics</CardTitle>
        <CardDescription>Real-time system performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center">
            <Cpu className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">CPU Usage</span>
            <span className="ml-auto text-sm text-muted-foreground">45%</span>
          </div>
          <Progress value={45} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <HardDrive className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Memory Usage</span>
            <span className="ml-auto text-sm text-muted-foreground">60%</span>
          </div>
          <Progress value={60} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Network className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Network Load</span>
            <span className="ml-auto text-sm text-muted-foreground">75%</span>
          </div>
          <Progress value={75} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Disk I/O</span>
            <span className="ml-auto text-sm text-muted-foreground">30%</span>
          </div>
          <Progress value={30} />
        </div>
      </CardContent>
    </Card>
  )
}
