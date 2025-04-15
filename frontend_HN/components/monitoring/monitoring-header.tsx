import { Download, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

export function MonitoringHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Network Monitoring</h1>
        <p className="text-muted-foreground">Real-time monitoring of network activity and threats</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>
  )
}
