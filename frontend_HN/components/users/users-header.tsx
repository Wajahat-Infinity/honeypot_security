import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NewUserForm } from "@/components/users/new-user-form"

export function UsersHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight neon-text">User Management</h1>
        <p className="text-muted-foreground">Manage system users and their permissions</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="cyber-card">
          <DialogHeader>
            <DialogTitle className="neon-text">Create New User</DialogTitle>
            <DialogDescription>Add a new user to the system and assign their permissions</DialogDescription>
          </DialogHeader>
          <NewUserForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
