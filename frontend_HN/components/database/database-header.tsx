import { Database, Download, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DatabaseHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight neon-text">Database Management</h1>
        <p className="text-muted-foreground">Manage and query the security database</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
          <Database className="mr-2 h-4 w-4" />
          Backup Now
        </Button>
      </div>
    </div>
  )
}
