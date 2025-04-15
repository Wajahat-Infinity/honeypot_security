"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NewUserForm } from "@/components/users/new-user-form"

const recentUsers = [
  {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Admin",
    avatar: "/avatars/01.png",
  },
  {
    id: "user-2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Security Analyst",
    avatar: "/avatars/02.png",
  },
  {
    id: "user-3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Network Engineer",
    avatar: "/avatars/03.png",
  },
]

export function UserManagement() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Recent Users</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-black">
              <UserPlus className="h-4 w-4 mr-2" />
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
      <div className="space-y-3">
        {recentUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-2 border rounded-md">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="w-full">
        View All Users
      </Button>
    </div>
  )
}
