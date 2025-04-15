import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NewHoneypotForm } from "@/components/honeypots/new-honeypot-form"

export function HoneypotsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Honeypots</h1>
        <p className="text-muted-foreground">Deploy and manage your honeypot instances</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Honeypot
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Honeypot</DialogTitle>
            <DialogDescription>Configure and deploy a new honeypot instance</DialogDescription>
          </DialogHeader>
          <NewHoneypotForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
