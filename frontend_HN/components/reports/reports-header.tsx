import { FileText, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NewReportForm } from "@/components/reports/new-report-form"

export function ReportsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-cyan-500" />
          <h1 className="text-2xl font-bold tracking-tight neon-text">Security Reports</h1>
        </div>
        <p className="text-muted-foreground">Generate, view, and export security reports</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </DialogTrigger>
        <DialogContent className="cyber-card">
          <DialogHeader>
            <DialogTitle className="neon-text">Generate New Report</DialogTitle>
            <DialogDescription>Configure and generate a new security report</DialogDescription>
          </DialogHeader>
          <NewReportForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
